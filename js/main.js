
const NAMES = [
  'Алексей',
  'Мария',
  'Иван',
  'Елена',
  'Дмитрий',
  'Анна',
  'Сергей',
  'Ольга',
  'Владимир',
  'Наталья',
  'Павел',
  'Татьяна',
  'Михаил',
  'Людмила',
  'Андрей'
];

const DESCRIPTIONS_PHOTO = [
  'Красивый закат над горами',
  'Спокойствие океанских волн',
  'Яркий городской пейзаж ночью',
  'Спокойствие в сердце леса',
  'Исследование красоты пустынных песков'
];

const COMMENTS_ARRAY = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const LENGTH_ARRAY = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function generateId() {
  let counter = 0;
  return () => ++counter;
}

function createRandomIdFromRangeGenerator (min, max) {
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

const createCommentObject = () => {
  const generateCommentsId = createRandomIdFromRangeGenerator(10, 50);
  return {
    id: generateCommentsId(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: generateCommentMessage(),
    name: getRandomArrayElement(NAMES)
  };
};


const createObject = () => {
  const idNumber = idGenerator();
  return {
    id: idNumber,
    url: `photos/${idNumber}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS_PHOTO),
    likes: getRandomInteger(15, 200),
    comments: Array.from({ length: getRandomInteger(0, 30) }, createCommentObject)
  };
};

const objectsArray = Array.from({ length: LENGTH_ARRAY }, createObject);

