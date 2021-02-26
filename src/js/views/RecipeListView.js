import icons from '../../img/icons.svg';
const resultsContainer = document.querySelector('.results');

class RecipeListView {
  async _renderRecipeList(recipeList) {
    // console.log(recipeList);
    this._renderSpinner();
    let recipeListHTML = '';
    recipeList.forEach(recipe => {
      recipeListHTML += `
        <li id="${recipe.id}" class="preview">
            <a class="preview__link preview__link" href="#23456">
              <figure class="preview__fig">
                <img src="${recipe.image_url}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${recipe.title}</h4>
                <p class="preview__publisher">${recipe.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
        
        `;
    });

    resultsContainer.innerHTML = recipeListHTML;

    recipeList.forEach(recipe => {
      document
        .getElementById(recipe.id)
        .addEventListener('click', () => this._getRecipe(recipe.id));
    });
  }

  _getRecipe(id) {
    console.log(id);
  }

  _renderSpinner() {
    const spinnerHTML = `
            <div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
            </div>
        `;
    resultsContainer.innerHTML = spinnerHTML;
  }

  _addHandlerRender(handler) {
    window.addEventListener('hashchange', handler);
  }
}

export default new RecipeListView();
