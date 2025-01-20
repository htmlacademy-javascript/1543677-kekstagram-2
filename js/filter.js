import { initPageData } from './thumbnails.js';
import { debounce } from './utils.js';

const imageFiltersContainer = document.querySelector('.img-filters');
let picturesArray = [];

const debouncedHandleFilterClick = debounce(handleFilterClick, 500);

// Фильтрді көрсету
function toggleActiveFilter(button) {
  const buttons = document.querySelectorAll('.img-filters__button');
  buttons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
  button.classList.add('img-filters__button--active');
}

// Массивті өңдеудің функциялары
const processArray = {
  'filter-default': (array) => [...array], // Массив өзгермейді
  'filter-discussed': (array) => [...array].sort((a, b) => b.comments.length - a.comments.length), // Кему ретімен сұрыптау
  'filter-random': (array) => [...array].sort(() => Math.random() - 0.5).slice(0, 10), // Кездейсоқ 10 элемент алу
};

// Фильтрлермен жұмыс істеу
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

  // Мәліметтерді көрсету
  initPageData(processedArray);
}

// Фильтрлерді қосу
function setImageFiltersEventListener() {
  const imgFilters = document.querySelector('.img-filters');
  if (imgFilters) {
    imgFilters.addEventListener('click', debouncedHandleFilterClick);
  }
}

// Фильтрлерді көрсету және массивті жаңарту
export function showImageFilters(datas) {
  imageFiltersContainer.classList.remove('img-filters--inactive');
  picturesArray = datas;
  initPageData(datas);
  setImageFiltersEventListener();
}

