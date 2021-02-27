import Fractional from 'fractional';
import icons from '../../img/icons.svg';
const containerRecipe = document.querySelector('.recipe');

class RecipeView {
  constructor() {
    this._parentElement = containerRecipe;
  }

  _generateMarkup(recipe) {
    const markup = `
    <figure class="recipe__fig">
      <img src="${recipe.imageURL}" alt="" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${recipe.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          recipe.cookingTime
        }</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          recipe.servings
        }</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button data-update-servings-to="${
            +recipe.servings - 1
          }" data-servings="decrease" class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button data-update-servings-to="${
            +recipe.servings + 1
          }"  class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round btn--bookmark">
        <svg class="">
          <use href="${icons}#icon-bookmark${
      recipe.bookmarked ? '-fill' : ''
    }"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">   
  ${recipe.ingredients
    .map(
      ingredient => `
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
        <use href="${icons}#icon-check"use>
         </svg>
        <div class="recipe__quantity">${new Fractional.Fraction(
          ingredient.quantity
        ).toString()}</div>
         <div class="recipe__description">
        <span class="recipe__unit">${ingredient.unit}</span>
          ${ingredient.description}
      </div>
      </li>
      `
    )
    .join('')}     
      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">The Pioneer Woman</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${recipe.sourceURL}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
    
`;

    return markup;
  }

  async _renderRecipe(recipe) {
    this._renderSpinner();
    if (!recipe) return;

    const recipeHTML = this._generateMarkup(recipe);

    this._parentElement.innerHTML = recipeHTML;
  }

  _renderError() {
    const message = 'No recipes found for your query. Please try again!';

    const errMessageHTML = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this._parentElement.innerHTML = errMessageHTML;
  }

  _addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(event =>
      window.addEventListener(event, handler)
    );
  }

  _renderSpinner() {
    const spinnerHTML = `
        <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
        </div>
    `;
    this._parentElement.innerHTML = spinnerHTML;
  }

  _addHandlerServings(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--increase-servings');
      if (!btn) return;
      handler(+btn.dataset.updateServingsTo);
    });
  }

  //only render which part is updated
  _renderUpdated(recipe) {
    const newMarkup = this._generateMarkup(recipe);

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = newDOM.querySelectorAll('*');
    const curElements = this._parentElement.querySelectorAll('*');

    newElements.forEach((newEl, index) => {
      const curEl = curElements[index];

      //update changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      //update changed attribute
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _addHandlerBookmar(handler) {
    this._parentElement.addEventListener('click', e => {
      const btnBookmarked = e.target.closest('.btn--bookmark');
      if (!btnBookmarked) return;
      // btnBookmarked.addEventListener('click', handler());
      handler();
    });
  }
}

export default new RecipeView();
