const searchField = document.querySelector('.search__field');
const search = document.querySelector('.search');
// const searchBtn = document.querySelector('.search__btn');

class SearchView {
  _addHandlerSearch(handler) {
    search.addEventListener('submit', e => {
      e.preventDefault();
      handler(searchField.value);
    });
  }
}

export default new SearchView();
