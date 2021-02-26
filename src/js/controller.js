import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/RecipeView.js';
import recipeListView from './views/RecipeListView.js';
import searchView from './views/SearchView.js';
import paginationView from './views/PaginationView.js';

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
    //get recipe list
    model.state.search.results = await model.loadRecipeList(searchTerm);

    //render recipes in the view
    recipeListView._renderRecipeList(model.getSearchResultsPage());

    //render  button
    paginationView._render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = gotoPage => {
  recipeListView._renderRecipeList(model.getSearchResultsPage(+gotoPage));

  paginationView._render(model.state.search);
};

const controlServings = () => {};

const init = () => {
  recipeView._addHandlerRender(controlRecipe);
  recipeView._addHandlerServings(controlServings);
  searchView._addHandlerSearch(controlSearchResults);
  paginationView._addHandlerClick(controlPagination);
};

init();
