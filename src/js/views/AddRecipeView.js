class AddRecipeView {
  _parentElement = document.querySelector('.upload');
  _addRecipeWindow = document.querySelector('.add-recipe-window');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _overlay = document.querySelector('.overlay');
  constructor() {
    this._addHandlerModal();
  }

  _openModal() {
    this._addRecipeWindow.classList.remove('hidden');
    this._overlay.classList.remove('hidden');
  }

  _hideModal() {
    this._addRecipeWindow.classList.add('hidden');
    this._overlay.classList.add('hidden');
  }

  _addHandlerModal() {
    this._btnOpen.addEventListener('click', this._openModal.bind(this));

    this._overlay.addEventListener('click', this._hideModal.bind(this));

    this._btnClose.addEventListener('click', this._hideModal.bind(this));
  }

  _addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();

      const dataArr = [...new FormData(e.target)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new AddRecipeView();
