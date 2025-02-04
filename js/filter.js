import { renderPhotoThumbnails } from './thumbnails.js';
import { createDebouncedFunction } from './utils.js';

const DEBOUNCE_DELAY = 500;

const imageFiltersContainer = document.querySelector('.img-filters');
let pictures = [];

const debouncedRenderPictures = createDebouncedFunction(renderPhotoThumbnails, DEBOUNCE_DELAY);

const toggleActiveFilter = (button) => {
  const buttons = document.querySelectorAll('.img-filters__button');
  buttons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
  button.classList.add('img-filters__button--active');
};

const processPhotos = {
  'filter-default': (photos) => [...photos],
  'filter-discussed': (photos) => [...photos].sort((a, b) => b.comments.length - a.comments.length),
  'filter-random': (photos) => [...photos].sort(() => Math.random() - 0.5).slice(0, 10),
};

const onImgFiltersClick = (event) => {
  if (!event.target.classList.contains('img-filters__button') ||
    event.target.classList.contains('img-filters__button--active')) {
    return;
  }

  const activeButtonId = event.target.id;
  toggleActiveFilter(event.target);

  const processedArray = processPhotos[activeButtonId]
    ? processPhotos[activeButtonId](pictures)
    : [...pictures];

  debouncedRenderPictures(processedArray);
};

const setImageFiltersEventListener = () => {
  const imgFilters = document.querySelector('.img-filters');
  if (imgFilters) {
    imgFilters.addEventListener('click', onImgFiltersClick);
  }
};

export const showImageFilters = (data) => {
  imageFiltersContainer.classList.remove('img-filters--inactive');
  pictures = data;
  renderPhotoThumbnails(data);
  setImageFiltersEventListener();
};

