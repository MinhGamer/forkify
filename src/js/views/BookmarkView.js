class BookmarkView {
  constructor() {
    this._parentElement = document.querySelector('.bookmarks__list');
  }

  _renderBookmarks(bookmarks) {
    console.log(bookmarks);
    let bookmarksEle = '';
    bookmarks.forEach(bookmark => {
      bookmarksEle += `
    <li class="preview">
        <a class="preview__link" href="#${bookmark.id}">
          <figure class="preview__fig">
            <img src="${bookmark.imageURL}" alt="${bookmark.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__name">
              ${bookmark.title}
            </h4>
            <p class="preview__publisher">${bookmark.publisher}</p>
          </div>
        </a>
      </li>
        
        `;
    });

    this._parentElement.innerHTML = bookmarksEle;
  }
}

export default new BookmarkView();
