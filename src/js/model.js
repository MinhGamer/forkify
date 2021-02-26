import 'regenerator-runtime/runtime';

import { API_URL } from './config.js';

export const state = {
  recipe: {},
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
    alert(err);
  }
};
