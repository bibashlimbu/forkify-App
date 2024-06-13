import * as model from './model.js';
import SearchView from './view/searchView.js';
import recipeView from './view/RecipeView.js';
import resultView from './view/resultView.js';
import PaginationView from './view/paginationView.js';
import bookmarksView from './view/bookmarkView.js';
import addRecipeView from './view/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
// console.log(icon);

if (module.hot) {
  module.hot.accept();
}

//

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    //render spiner
    recipeView.renderSpiner();

    //active mark on  search results
    resultView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    //loading the recipe
    await model.loadRecipe(id);

    //render recipe to UI
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderErrorMessage();
  }
};

const controlSearchResult = async function () {
  try {
    //getting search query
    const query = SearchView.getQuery();
    if (!query) return;

    // renderSpiner
    resultView.renderSpiner();

    //load search result
    await model.loadSearchRecipe(query);
    // resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultsPage());

    //render pagination
    PaginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (goTOPage) {
  //render new result
  resultView.render(model.getSearchResultsPage(goTOPage));

  //render pagination buttons
  PaginationView.render(model.state.search);
};

const controlServing = function (newServings) {
  //upadte the recipe view
  model.updateServings(newServings);

  //update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  //update recipeview
  recipeView.update(model.state.recipe);

  //render bookmark
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmark = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //show Spinner
    addRecipeView.renderSpiner();

    //upload new recipe
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //render recipe
    recipeView.render(model.state.recipe);

    //sucess message
    addRecipeView.renderMessage();

    //render bookmark view
    bookmarksView.render(model.state.bookmarks);

    //change id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //close model
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    addRecipeView.renderErrorMessage(error);
  }
};

const welcomeMessage = function () {
  console.log('welcome to forkify');
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmark);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServing);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  SearchView.addHandlerSearch(controlSearchResult);
  PaginationView.addHandlerClick(controlPagination);
  addRecipeView._addHandlerUpload(controlAddRecipe);
  welcomeMessage();
};
init();

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
