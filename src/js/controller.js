import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/RecipeView.js';
import recipeListView from './views/RecipeListView.js';

import searchView from './views/SearchView.js';

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async () => {
  const recipeId = window.location.hash.slice(1);

  if (!recipeId) return;

  try {
    await model.loadRecipe(recipeId);
    recipeView._renderRecipe(model.state.recipe);
  } catch (err) {
    recipeView._renderError();
  }
};

const controlSearchResults = async searchTerm => {
  try {
    model.state.recipeList = await model.loadRecipeList(searchTerm);

    console.log(model.state.recipeList);

    recipeListView._renderRecipeList(model.state.recipeList);
  } catch (err) {
    console.log(err);
  }
};

const controlRecipeList = async () => {};

const init = () => {
  recipeView._addHandlerRender(controlRecipe);
  searchView._addHandlerSearch(controlSearchResults);
  // recipeListView._addHandlerRender(controlRecipeList);
};

init();
