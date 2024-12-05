import { objectsPhotoArray } from './data.js';
import { makePictureBig } from './full-image.js';

const dataArrayObject = objectsPhotoArray();

const picturesContainer = document.querySelector('.pictures');

const template = document.querySelector('#picture').content;
const pictureTemplate = template.querySelector('.picture');

const pictureListFragment = document.createDocumentFragment();

dataArrayObject.forEach((data)=> {
  const pictureClone = pictureTemplate.cloneNode(true);
  const pictureImage = pictureClone.querySelector('.picture__img');
  const pictureComments = pictureClone.querySelector('.picture__comments');
  const pictureLikes = pictureClone.querySelector('.picture__likes');
  pictureImage.src = data.url;
  pictureImage.alt = data.description;
  pictureComments.texContent = data.comments.length;
  pictureLikes.texContent = data.likes;
  pictureClone.addEventListener('click', (evt) => {
    evt.preventDefault();
    makePictureBig(data);
  })
  pictureListFragment.appendChild(pictureClone);
});

picturesContainer.appendChild(pictureListFragment);

export const dataArrayObjectElement = (n) => dataArrayObject[n];

