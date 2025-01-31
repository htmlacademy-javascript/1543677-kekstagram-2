import { initPageData } from './thumbnails.js';
import { debounce } from './utils.js';

const DEBOUNCE_DELAY = 500;

const imageFiltersContainer = document.querySelector('.img-filters');
let picturesArray = [];

const debouncedRenderPictures = debounce(initPageData, DEBOUNCE_DELAY);

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
    ? processPhotos[activeButtonId](picturesArray)
    : [...picturesArray];

  debouncedRenderPictures(processedArray);
};

const setImageFiltersEventListener = () => {
  const imgFilters = document.querySelector('.img-filters');
  if (imgFilters) {
    imgFilters.addEventListener('click', onImgFiltersClick);
  }
};

export const showImageFilters = (datas) => {
  imageFiltersContainer.classList.remove('img-filters--inactive');
  picturesArray = datas;
  initPageData(datas);
  setImageFiltersEventListener();
};

