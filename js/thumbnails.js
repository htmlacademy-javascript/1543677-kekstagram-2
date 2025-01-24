import { makePictureBig } from './full-image.js';

const picturesContainer = document.querySelector('.pictures');

const template = document.querySelector('#picture').content;
const pictureTemplate = template.querySelector('.picture');

const pictureListFragment = document.createDocumentFragment();

export function initPageData (datas) {
  const pictures = picturesContainer.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());

  datas.forEach((data)=> {
    const pictureClone = pictureTemplate.cloneNode(true);
    const pictureImage = pictureClone.querySelector('.picture__img');
    const pictureComments = pictureClone.querySelector('.picture__comments');
    const pictureLikes = pictureClone.querySelector('.picture__likes');
    pictureImage.src = data.url;
    pictureImage.alt = data.description;
    pictureComments.textContent = data.comments.length;
    pictureLikes.textContent = data.likes;
    pictureClone.addEventListener('click', (evt) => {
      evt.preventDefault();
      makePictureBig(data);
    });
    pictureListFragment.appendChild(pictureClone);
  });

  picturesContainer.appendChild(pictureListFragment);
}

