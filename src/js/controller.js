import 'regenerator-runtime/runtime';
import icons from '../img/icons.svg';

import * as model from './model.js';
import RecipeView from './views/RecipeView.js';

const recipeView = new RecipeView();
const KEY = '187d40ad-f567-4e70-9112-76db87fefd15';
const recipeContainer = document.querySelector('.recipe');

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
  const recipeId = window.location.hash.slice(1);

  if (!recipeId) return;

  renderSpinner(recipeContainer);

  await model.loadRecipe(recipeId);

  recipeView._render(model.state.recipe);
};

const renderSpinner = parentEle => {
  const spinnerHTML = `
      <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
      </div>
  `;
  parentEle.innerHTML = spinnerHTML;
  // parentEle.insertAdjacentHTML('beforeend', spinnerHTML);
};

window.addEventListener('hashchange', fetchRecipe);

window.addEventListener('load', fetchRecipe);
