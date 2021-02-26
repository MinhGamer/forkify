class Recipe {
  constructor(
    _id,
    _title,
    _publisher,
    _sourceURL,
    _image,
    _servings,
    _cookingTimes,
    _ingredients
  ) {
    this.id = _id;
    this.title = _title;
    this.publisher = _publisher;
    this.sourceURL = _sourceURL;
    this.image = _image;
    this.servings = _servings;
    this.cookingTimes = _cookingTimes;
    this.ingredients = _ingredients;
  }
}

export default Recipe;
