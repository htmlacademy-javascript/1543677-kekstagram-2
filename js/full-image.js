
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

let count = 5;

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

// Ссылка на текущий обработчик
let commentsLoaderHandler = null;

function makePictureBig(pictureObj) {
  bigPictureImg.src = pictureObj.url;
  bigPictureLikesCount.textContent = pictureObj.likes;
  socialCommentTotalCount.textContent = pictureObj.comments.length;
  socialCaption.textContent = pictureObj.description;

  socialComments.innerHTML = '';

  const endOfArray = Math.min(pictureObj.comments.length, 5);
  if (endOfArray !== 0) {
    makeListOfComment(0, endOfArray, pictureObj);
  } else {
    socialCommentShownCount.textContent = endOfArray;
  }

  // Создаём и добавляем обработчик для commentsLoader
  commentsLoaderHandler = () => {
    const [start, end] = genarateStartAndEndArray();

    const endArray = Math.min(pictureObj.comments.length, end);
    makeListOfComment(start, endArray, pictureObj);

    if (pictureObj.comments.length <= endArray) {
      commentsLoader.classList.add('hidden');
      if (commentsLoaderHandler) {
        commentsLoader.removeEventListener('click', commentsLoaderHandler);
        commentsLoaderHandler = null; // Очищаем ссылку, чтобы предотвратить утечки памяти
      }
    } else {
      commentsLoader.classList.remove('hidden');
    }

  };

  if (pictureObj.comments.length <= endOfArray) {
    commentsLoader.classList.add('hidden');
    if (commentsLoaderHandler) {
      commentsLoader.removeEventListener('click', commentsLoaderHandler);
      commentsLoaderHandler = null; // Очищаем ссылку, чтобы предотвратить утечки памяти
    }
  } else {
    commentsLoader.classList.remove('hidden');
  }

  bodyPage.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  // Добавляем обработчик нажатия клавиши
  document.addEventListener('keydown', onDocumentKeydown);

  commentsLoader.addEventListener('click', commentsLoaderHandler);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  bodyPage.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);

  // Удаляем обработчик с commentsLoader
  if (commentsLoaderHandler) {
    commentsLoader.removeEventListener('click', commentsLoaderHandler);
    commentsLoaderHandler = null; // Очищаем ссылку, чтобы предотвратить утечки памяти
  }

  count = 5;
}

// Закрытие модального окна
closeBigPictureElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeBigPicture();
});


function genarateStartAndEndArray() {
  const start = count;
  count += 5;
  const end = count;
  return [start, end];
}

function makeListOfComment(start, endOfArray, pictureObj) {
  for (let i = start; i < endOfArray; i++) {
    const socialCommentClone = socialComment.cloneNode(true);
    const socialCommentImage = socialCommentClone.querySelector('img');
    const socialCommentText = socialCommentClone.querySelector('p');
    socialCommentShownCount.textContent = endOfArray;
    socialCommentImage.src = pictureObj.comments[i].avatar;
    socialCommentText.textContent = pictureObj.comments[i].message;
    socialComments.appendChild(socialCommentClone);
  }
}

export { makePictureBig };
