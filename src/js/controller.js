import 'regenerator-runtime/runtime';
import icons from '../img/icons.svg';
import Recipe from '../model/Recipe.js';

console.log(icons);

const KEY = '187d40ad-f567-4e70-9112-76db87fefd15';

const recipeContainer = document.querySelector('.recipe');

let recipe = null;

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const fetchRecipe = async () => {
  try {
    const res = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    );

    const data = await res.json();

    const {
      cooking_time,
      id,
      image_url,
      ingredients,
      publisher,
      servings,
      source_url,
      title,
    } = data.data.recipe;

    recipe = new Recipe(
      id,
      title,
      publisher,
      source_url,
      image_url,
      servings,
      cooking_time,
      ingredients
    );

    renderRecipe();

    //handle error
    if (!res.ok) throw new Error(`$${data.message} (${res.status})`);
  } catch (err) {
    alert(err);
  }
};

const searchRecipe = async searchTerm => {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchTerm}&key=${KEY}`
    );

    const data = await res.json();

    console.log(data);
  } catch (err) {
    alert(err);
  }
};

// fetchRecipe();
// searchRecipe('onion');

const renderRecipe = async () => {
  if (!recipe) return;

  console.log(recipe);

  const recipeHTML = `
        <figure class="recipe__fig">
          <img src="${recipe.image_url}" alt="" class="recipe__img" />
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
              recipe.cookingTimes
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
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
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
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
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
            <div class="recipe__quantity">${ingredient.quantity}</div>
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

  // recipeContainer.insertAdjacentHTML('afterbegin', recipeHTML);
  recipeContainer.innerHTML = recipeHTML;
};

fetchRecipe();
