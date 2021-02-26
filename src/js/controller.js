import 'regenerator-runtime/runtime';

import * as model from './model.js';
import RecipeView from './views/RecipeView.js';

const recipeView = new RecipeView();

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async () => {
  const recipeId = window.location.hash.slice(1);

  if (!recipeId) return;

  await model.loadRecipe(recipeId);

  recipeView._renderRecipe(model.state.recipe);
};

const init = () => {
  recipeView._addHandlerRender(controlRecipes);
};

init();
