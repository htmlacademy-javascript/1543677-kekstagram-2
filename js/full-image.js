
const bigPicture = document.querySelector('.big-picture');
const closeBigPictureElement = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('img');
const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialCommentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');
const socialCaption = bigPicture.querySelector('.social__caption');
const bodyPage = document.querySelector('body');

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

function makePictureBig(pictureObj) {
  bigPictureImg.src = pictureObj.url;
  bigPictureLikesCount.textContent = pictureObj.likes;
  socialCommentTotalCount.textContent = pictureObj.comments.length;
  socialCaption.textContent = pictureObj.description;

  socialComments.innerHTML = '';

  for (let i = 0; i < pictureObj.comments.length; i++) {
    const socialCommentClone = socialComment.cloneNode(true);
    const socialCommentImage = socialCommentClone.querySelector('img');
    const socialCommentText = socialCommentClone.querySelector('p');
    socialCommentShownCount.textContent = pictureObj.comments.length;

    socialCommentImage.src = pictureObj.comments[i].avatar;
    socialCommentText.textContent = pictureObj.comments[i].message;
    socialComments.appendChild(socialCommentClone);
  }

  if (pictureObj.comments.length <= 5) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  bodyPage.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  // Добавляем обработчик нажатия клавиши
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  bodyPage.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

// Закрытие модального окна
closeBigPictureElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeBigPicture();
});

// Связь с конкретным изображением
function setupPictureHandler(pictureElement, pictureObj) {
  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    makePictureBig(pictureObj);
  });
}

export {setupPictureHandler};
