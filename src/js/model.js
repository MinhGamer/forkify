import 'regenerator-runtime/runtime';

import { API_URL, KEY } from './config.js';

export const state = {
  recipe: {},
  recipeList: [],
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

    if (!res.ok) throw new Error(`$${data.message} (${res.status})`);
  } catch (err) {
    throw err;
  }
};

export const loadRecipeList = async searchTerm => {
  try {
    const res = await fetch(`${API_URL}/?search=${searchTerm}&key=${KEY}`);

    const data = await res.json();
    // console.log(data.data.recipes);
    return data.data.recipes;
  } catch (err) {
    console.log(err);
  }
};
