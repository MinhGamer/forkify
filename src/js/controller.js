import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/RecipeView.js';
import recipeListView from './views/RecipeListView.js';
import searchView from './views/SearchView.js';
import paginationView from './views/PaginationView.js';
import bookmarkView from './views/BookmarkView';

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
    //check to see if the recipe is in the bookmarks
    //and render bookmark
    const bookmarkIndex = model.state.bookmarks.findIndex(
      bookmark => bookmark.id === recipeId
    );
    if (bookmarkIndex !== -1) {
      recipeView._renderRecipe(model.state.bookmarks[bookmarkIndex]);
      return;
    }

    //if not, render as normal
    await model.loadRecipe(recipeId);
    recipeView._renderRecipe(model.state.recipe);
  } catch (err) {
    recipeView._renderError();
  }
};

const controlSearchResults = async searchTerm => {
  try {
    //1) send search and get recipe list
    model.state.search.results = await model.loadRecipeList(searchTerm);

    //2) render recipes in the view
    recipeListView._renderRecipeList(model.getSearchResultsPage());

    //3) render buttons
    paginationView._render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = gotoPage => {
  recipeListView._renderRecipeList(model.getSearchResultsPage(+gotoPage));

  paginationView._render(model.state.search);
};

const controlServings = updateServingsTo => {
  //1) update servings
  model.updateServings(updateServingsTo);

  //2) render recipe
  recipeView._renderUpdated(model.state.recipe);
};

const constrolBookmark = () => {
  //add or remove bookmark
  model.toggleBookmark();

  // render update recipe
  recipeView._renderRecipe(model.state.recipe);

  //render bookmarks
  bookmarkView._renderBookmarks(model.state.bookmarks);
};

const init = () => {
  recipeView._addHandlerRender(controlRecipe);
  recipeView._addHandlerServings(controlServings);
  recipeView._addHandlerBookmar(constrolBookmark);
  searchView._addHandlerSearch(controlSearchResults);
  paginationView._addHandlerClick(controlPagination);
};

init();
