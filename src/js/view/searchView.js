class SearchView {
  _parElement = document.querySelector('.search');

  getQuery() {
    const query = this._parElement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    return (this._parElement.querySelector('.search__field').value = '');
  }

  addHandlerSearch(handler) {
    this._parElement.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
