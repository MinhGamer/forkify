import 'regenerator-runtime/runtime';

import { API_URL, KEY, RESULTS_PER_PAGE } from './config.js';

export const state = {
  recipe: {},
  // recipeList: [],
  search: {
    query: '',
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    page: 1,
  },
};

export const loadRecipe = async recipeId => {
  try {
    if (!recipeId) return;

    const res = await fetch(`${API_URL}/${recipeId}`);

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

    state.recipe = {
      id: id,
      title: title,
      publisher: publisher,
      sourceURL: source_url,
      imageURL: image_url,
      servings: servings,
      cookingTime: cooking_time,
      ingredients: ingredients,
    };

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
  } catch (err) {
    throw err;
  }
};

export const loadRecipeList = async searchTerm => {
  try {
    const res = await fetch(`${API_URL}/?search=${searchTerm}&key=${KEY}`);

    const data = await res.json();

    return data.data.recipes;
  } catch (err) {
    console.log(err);
  }
};

export const getSearchResultsPage = (page = state.search.page) => {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};
