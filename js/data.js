// data.js
import { getRandomInteger, getRandomArrayElement } from './utils.js';

const NAMES = [
  'Алексей', 'Мария', 'Иван', 'Елена', 'Дмитрий', 'Анна', 'Сергей', 'Ольга', 'Владимир', 'Наталья', 'Павел', 'Татьяна', 'Михаил', 'Людмила', 'Андрей'
];

const DESCRIPTIONS_PHOTO = [
  'Красивый закат над горами', 'Спокойствие океанских волн', 'Яркий городской пейзаж ночью', 'Спокойствие в сердце леса', 'Исследование красоты пустынных песков'
];

const COMMENTS_ARRAY = [
  'Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра...', 'Моя бабушка случайно чихнула с фотоаппаратом...', 'Я поскользнулся на банановой кожуре...', 'Лица у людей на фотке перекошены...'
];

const LENGTH_ARRAY = 25;

function generateId() {
  let counter = 0;
  return () => ++counter;
}

function createRandomIdFromRangeGenerator(min, max) {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const generateCommentMessage = () => {
  const messageParts = Array.from({ length: getRandomInteger(1, 2) }, () => getRandomArrayElement(COMMENTS_ARRAY));
  return messageParts.join(' ');
};

const idGenerator = generateId();
const generateCommentsId = createRandomIdFromRangeGenerator(10, 1000);

const generateCommentObject = () => ({
  id: generateCommentsId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: generateCommentMessage(),
  name: getRandomArrayElement(NAMES)
});

const createPhotoObject = () => {
  const idNumber = idGenerator();
  return {
    id: idNumber,
    url: `photos/${idNumber}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS_PHOTO),
    likes: getRandomInteger(15, 200),
    comments: Array.from({ length: getRandomInteger(0, 30) }, generateCommentObject)
  };
};

export const objectsPhotoArray = () => Array.from({ length: LENGTH_ARRAY }, createPhotoObject);
