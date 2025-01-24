import { initPageData } from './thumbnails.js';
import { debounce } from './utils.js';

const DEBOUNCE_DELAY = 500;

const imageFiltersContainer = document.querySelector('.img-filters');
let picturesArray = [];

const debouncedRenderPictures = debounce(initPageData, DEBOUNCE_DELAY);

function toggleActiveFilter(button) {
  const buttons = document.querySelectorAll('.img-filters__button');
  buttons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
  button.classList.add('img-filters__button--active');
}

const processArray = {
  'filter-default': (array) => [...array],
  'filter-discussed': (array) => [...array].sort((a, b) => b.comments.length - a.comments.length),
  'filter-random': (array) => [...array].sort(() => Math.random() - 0.5).slice(0, 10),
};

function handleFilterClick(event) {
  if (!event.target.classList.contains('img-filters__button') ||
      event.target.classList.contains('img-filters__button--active')) {
    return;
  }

  const activeButtonId = event.target.id;
  toggleActiveFilter(event.target);

  const processedArray = processArray[activeButtonId]
    ? processArray[activeButtonId](picturesArray)
    : [...picturesArray];

  debouncedRenderPictures(processedArray);
}

function setImageFiltersEventListener() {
  const imgFilters = document.querySelector('.img-filters');
  if (imgFilters) {
    imgFilters.addEventListener('click', handleFilterClick);
  }
}

export function showImageFilters(datas) {
  imageFiltersContainer.classList.remove('img-filters--inactive');
  picturesArray = datas;
  initPageData(datas);
  setImageFiltersEventListener();
}

