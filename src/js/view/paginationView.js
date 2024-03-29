import icons from 'url:../../img/icons.svg'; //percel 2
import View from './view';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goTOPage = +btn.dataset.goto;
      handler(goTOPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );
    //page 1 and other pages
    if (currPage === 1 && numPages > 1) {
      return this._generateMarkupButtonNext();
    }

    //last page
    if (currPage === numPages && numPages > 1) {
      return this._generateMarkupButtonPrev();
    }

    //other page
    if (currPage < numPages) {
      return (
        this._generateMarkupButtonPrev() + this._generateMarkupButtonNext()
      );
    }

    //page 1 and there isn't any pages
    return ``;
  }

  _generateMarkupButtonNext() {
    const currPage = this._data.page;
    return `
          <button data-goto="${
            currPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
    `;
  }

  _generateMarkupButtonPrev() {
    const currPage = this._data.page;
    return `
         <button data-goto="${
           currPage - 1
         }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
          </button>
    `;
  }
}

export default new PaginationView();
