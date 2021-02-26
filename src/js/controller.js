import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// fetch(
//   'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
// )
//   .then(res => res.json())
//   .then(res => console.log(res.data.recipe))
//   .catch(err => console.log(err));

const fetchRecipe = async () => {
  try {
    const res = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    );

    const data = await res.json();
    console.log(res, data);

    //handle error
    if (!res.ok) throw new Error(`$${data.message} (${res.status})`);
  } catch (err) {
    alert(err);
  }
};

fetchRecipe();
