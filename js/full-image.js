import { isEscapeKey } from './utils.js';

const COMMENTS_STEP = 5;

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

let count = COMMENTS_STEP;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

let commentsLoaderHandler = null;

function makePictureBig(pictureObj) {
  bigPictureImg.src = pictureObj.url;
  bigPictureLikesCount.textContent = pictureObj.likes;
  socialCommentTotalCount.textContent = pictureObj.comments.length;
  socialCaption.textContent = pictureObj.description;

  socialComments.innerHTML = '';

  const endOfArray = Math.min(pictureObj.comments.length, COMMENTS_STEP);
  if (endOfArray !== 0) {
    makeListOfComment(0, endOfArray, pictureObj);
  } else {
    socialCommentShownCount.textContent = endOfArray;
  }

  commentsLoaderHandler = () => {
    const [start, end] = generateStartAndEndArray();

    const endArray = Math.min(pictureObj.comments.length, end);
    makeListOfComment(start, endArray, pictureObj);

    if (pictureObj.comments.length <= endArray) {
      commentsLoader.classList.add('hidden');
      if (commentsLoaderHandler) {
        commentsLoader.removeEventListener('click', commentsLoaderHandler);
        commentsLoaderHandler = null;
      }
    } else {
      commentsLoader.classList.remove('hidden');
    }
  };

  if (pictureObj.comments.length <= endOfArray) {
    commentsLoader.classList.add('hidden');
    if (commentsLoaderHandler) {
      commentsLoader.removeEventListener('click', commentsLoaderHandler);
      commentsLoaderHandler = null;
    }
  } else {
    commentsLoader.classList.remove('hidden');
  }

  bodyPage.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeydown);

  commentsLoader.addEventListener('click', commentsLoaderHandler);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  bodyPage.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  if (commentsLoaderHandler) {
    commentsLoader.removeEventListener('click', commentsLoaderHandler);
    commentsLoaderHandler = null;
  }
  count = COMMENTS_STEP;
}

closeBigPictureElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeBigPicture();
});

function generateStartAndEndArray() {
  const start = count;
  count += COMMENTS_STEP;
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
    socialCommentImage.alt = pictureObj.comments[i].name;
    socialCommentText.textContent = pictureObj.comments[i].message;
    socialComments.appendChild(socialCommentClone);
  }
}

export { makePictureBig };
