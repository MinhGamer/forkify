const paginationContainer = document.querySelector('.pagination');
import icons from '../../img/icons.svg';

const RESULTS_PER_PAGE = 10;

class PaginationView {
  _render(data) {
    const currentPage = data.page;
    const numPages = Math.ceil(data.results.length / RESULTS_PER_PAGE);

    let pageNumerHTML = '';

    //Page 1 and others page
    if (currentPage === 1 && numPages > 1) {
      pageNumerHTML = `
          <button data-goto="${
            currentPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> 
    `;
    } else if (currentPage === numPages && numPages > 1) {
      //Last Page
      pageNumerHTML = `
      <button data-goto="${
        currentPage - 1
      }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
          </svg>
      <span>Page ${currentPage - 1}</span>
      </button>
      `;
    } else if (currentPage < numPages) {
      //Other Page
      pageNumerHTML = `
          <button data-goto="${
            currentPage + 1
          }" class="btn--inline pagination__btn--next">
              <span>Page ${currentPage + 1}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </button> 
          <button data-goto="${
            currentPage - 1
          }"  class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
                  </svg>
              <span>Page ${currentPage - 1}</span>
          </button>
          `;
    }

    //Page 1 and NO others page
    paginationContainer.innerHTML = pageNumerHTML;
  }

  _addHandlerClick(handler) {
    paginationContainer.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      //   console.log(btn.dataset.goto);
      handler(btn.dataset.goto);
    });
  }
}

export default new PaginationView();
