
import { dataArrayObjectElement } from './thumbnails.js';
import { getRandomInteger } from './utils';

const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const closeBigPictureElement = bigPicture.querySelector('.big-picture__cancel');
const bodyPage = document.querySelector('body');

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

function makePictureBig (evt) {
  const picture = evt.target.closest('.picture');

  if (picture) {
    const pictureImg = picture.querySelector('.picture__img');
    const bigPictureImg = bigPicture.querySelector('img');
    const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
    const socialCommentCount = bigPicture.querySelector('.social__comment-count');
    const commentsLoader = bigPicture.querySelector('.comments-loader')
    const socialCommentTotalCount = bigPicture.querySelector('.social__comment-total-count');
    const socialCommentShownCount = bigPicture.querySelector('.social__comment-shown-count');
    const socialComments = bigPicture.querySelector('.social__comments');
    const socialComment = socialComments.querySelector('.social__comment');
    const socialCaption = bigPicture.querySelector('.social__caption');


    const pictureImgUrl = pictureImg.src;
    const pictureNumber = Number(pictureImgUrl.slice(29, pictureImgUrl.length - 4));
    const pictureObj = dataArrayObjectElement(pictureNumber - 1);
    const numberCommentStart = getRandomInteger(0, pictureObj.comments.length - 2);

    bigPictureImg.src = pictureObj.url;
    bigPictureLikesCount.textContent = pictureObj.likes;
    socialCommentShownCount.textContent = numberCommentStart + 1;
    socialCommentTotalCount.textContent = pictureObj.comments.length;
    socialCaption.textContent = pictureObj.description;

    socialComments.innerHTML = '';

    for (let i = numberCommentStart; i < numberCommentStart + 2; i++) {
      const socialCommentClone = socialComment.cloneNode(true);
      //const socialCommentImage = socialCommentClone.querySelector('img');
      const socialCommentText = socialCommentClone.querySelector('p');

      //socialCommentImage.src = pictureObj.comments[i].url;
      socialCommentText.textContent = pictureObj.comments[i].message;

      socialComments.appendChild(socialCommentClone);
    }

    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    bodyPage.classList.add('modal-open');

    bigPicture.classList.remove('hidden');


    document.addEventListener('keydown', onDocumentKeydown);

  }
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  bodyPage.classList.remove('modal-open');

  document.removeEventListener('keydown',onDocumentKeydown);
}

pictures.addEventListener('click', (evt) => {
  makePictureBig(evt);
});

closeBigPictureElement.addEventListener('click', () => {
  closeBigPicture();
});
