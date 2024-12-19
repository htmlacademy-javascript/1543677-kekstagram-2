import { isEscapeKey } from './utils';

const SCALE_STEP = 0.25;

const imageInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const pageBody = document.querySelector('body');
const imgUploadCancel = document.querySelector('.img-upload__cancel');

const formUploadImage = document.querySelector('#upload-select-image');
const textHashtags = formUploadImage.querySelector('.text__hashtags');
const textComment = formUploadImage.querySelector('.text__description');

const bigger = document.querySelector('.scale__control--bigger');
const smaller = document.querySelector('.scale__control--smaller');
const controlValue = document.querySelector('.scale__control--value');
const image = document.querySelector('.img-upload__preview img');

const sliderElement = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level');
let effectLevelValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');

let errorMessageFunc = null;
let errorMessage = '';
let scale = 1;
let effectName = 'none';

effectLevel.classList.add('hidden');

function makeBiggerImage() {
  if (scale < 1) {
    scale += SCALE_STEP;
    image.style.transform = `scale(${scale})`;
    controlValue.value = `${scale * 100}%`;
  }
}

function makeSmallerImage() {
  if (scale > SCALE_STEP) {
    scale -= SCALE_STEP;
    image.style.transform = `scale(${scale})`;
    controlValue.value = `${scale * 100}%`;
  }
}

// при нажати Escape закрывается
const onDocumentKeydown = (evt) => {

  const activeElement = document.activeElement;
  if (activeElement && (activeElement.classList.contains('text__hashtags') || activeElement.classList.contains('text__description'))) {
    return; // Прерываем обработку, если фокус на поле ввода
  }

  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditorImage();
  }
};

// Открыт Модальное окно
function openEditorImage() {
  uploadOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

// Закрыть Модальное окно
function closeEditorImage() {
  uploadOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imageInput.value = ''; // Сурет таңдауды тазалау
  errorMessageFunc = null;
  errorMessage = '';
  scale = 1;
  image.style.transform = `scale(${scale})`;
  effectLevel.classList.add('hidden');
  image.style.filter = `grayscale(${sliderElement.noUiSlider.set(0)})`;
}

// Прослушивание изменения фото
imageInput.addEventListener('change', (evt) => {
  evt.preventDefault();
  openEditorImage();
});

// Включение кнопки закрытия
imgUploadCancel.addEventListener('click', closeEditorImage);

// Инициализация Pristine
const pristine = new Pristine(formUploadImage, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

noUiSlider.create(sliderElement, {
  start: 0,
  connect: 'lower',
  step: 0.1,
  range: {
    'min': 0,
    'max': 1
  },
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  effectLevelValue = sliderElement.noUiSlider.get();
  if (effectName === 'none') {
    image.style.filter = `grayscale(${effectLevelValue})`;
  } else if (effectName === 'chrome') {
    image.style.filter = `grayscale(${effectLevelValue})`;
  }else if (effectName === 'sepia') {
    image.style.filter = `sepia(${effectLevelValue})`;
  } else if (effectName === 'marvin') {
    image.style.filter = `invert(${effectLevelValue}%)`;
  } else if (effectName === 'phobos') {
    image.style.filter = `blur(${effectLevelValue}px)`;
  }else if (effectName === 'heat') {
    image.style.filter = `brightness(${effectLevelValue})`;
  }
});

// Валидационная функция для проверки хэштегов
function validateHeshtag(value) {
  const maxHashtags = 5;
  const maxLength = 20;

  // Если поле пустое, разрешаем
  if (value.length === 0) {
    return true;
  }

  const tags = value.trim().split(/\s+/).map((word) => word.toLowerCase());
  const regex = /^#[a-zA-Z0-9]{1,19}$/i;

  if (!value.trim()) {
    return true; // Хэштеги необязательны
  }

  // Проверка на количество хэштегов
  if (tags.length > maxHashtags) {
    errorMessage = 'Нельзя использовать больше пяти хэштегов.';
    return false;
  }

  for (let index = 0; index < tags.length; index++) {
    const tag = tags[index];

    if (!tag.startsWith('#')) {
      errorMessage = 'Хэштег должен начинаться с символа `#`.';
      return false;
    }
    if (tag === '#') {
      errorMessage = 'Хэштег не может состоять только из символа `#`.';
      return false;
    }
    if (tag.length > maxLength) {
      errorMessage = 'Хэштег не может быть длиннее 20 символов, включая символ `#`.';
      return false;
    }
    if (!regex.test(tag)) {
      errorMessage = 'Хэштег может содержать только буквы и цифры, без пробелов, спецсимволов или эмодзи.';
      return false;
    }

    const duplicateIndex = tags.findIndex((t) => t.toLowerCase() === tag.toLowerCase());
    if (duplicateIndex !== -1 && duplicateIndex !== index) {
      errorMessage = 'Один и тот же хэштег нельзя использовать несколько раз.';
      return false;
    }
  }

  return true; // Все валидации прошли успешно
}

// Валидационная функция для проверки коммента
function validateComment(value) {
  const maxLengthComment = 140;
  if (value.length > maxLengthComment) {
    errorMessage = 'Комментарий слишком длинный. Максимальная длина составляет 140 символов. Пожалуйста, сократите текст.';
    return false;
  }
  return true;
}

function changeEffectParametr (evt) {
  effectName = evt.target.value;
  if (effectName === 'none') {
    effectLevel.classList.add('hidden');
    sliderElement.noUiSlider.updateOptions({
      start: 0,
    });
  } else if (effectName === 'chrome' || effectName === 'sepia') {
    effectLevel.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1
      },
      start: 0,
      step: 0.1
    });
  } else if (effectName === 'marvin') {
    effectLevel.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100
      },
      start: 0,
      step: 1
    });
  } else if (effectName === 'phobos' || effectName === 'heat') {
    effectLevel.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3
      },
      start: 0,
      step: 0.1
    });
  }
}

errorMessageFunc = () => errorMessage;

// Добавляем валидацию для хэштегов
pristine.addValidator(
  textHashtags, // Элемент input
  validateHeshtag,
  errorMessageFunc
);

// Добавляем валидацию для коммента
pristine.addValidator (
  textComment,
  validateComment,
  errorMessageFunc
);

bigger.addEventListener('click', makeBiggerImage);
smaller.addEventListener('click', makeSmallerImage);
effectsList.addEventListener('click', changeEffectParametr);

// Обработка события отправки формы
formUploadImage.addEventListener('submit', (evt) => {
  evt.preventDefault(); // Отменяем стандартное поведение

  const isValid = pristine.validate(); // Проверяем валидацию
  if (isValid) {
    textHashtags.value = textHashtags.value.trim().replaceAll(/\s+/g, ' ');
    formUploadImage.submit();
  }
});


