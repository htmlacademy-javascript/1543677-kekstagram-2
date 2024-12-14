import { isEscapeKey } from './utils';

const imageInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const pageBody = document.querySelector('body');
const imgUploadCancel = document.querySelector('.img-upload__cancel');

const formUploadImage = document.querySelector('#upload-select-image');
const textHashtags = formUploadImage.querySelector('.text__hashtags');

let errorMessageFunc = null;
let errorMessage = '';

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
}

const initializeImageEditorHandlers = () => {
  // Прослушивание изменения фото
  imageInput.addEventListener('change', (evt) => {
    evt.preventDefault();
    openEditorImage();
  });

  // Включение кнопки закрытия
  imgUploadCancel.addEventListener('click', closeEditorImage);
};

// Инициализация Pristine
const pristine = new Pristine(formUploadImage, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
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
    if (!regex.test(tag)) {
      errorMessage = 'Хэштег может содержать только буквы и цифры, без пробелов, спецсимволов или эмодзи.';
      return false;
    }
    if (tag.length > maxLength) {
      errorMessage = 'Хэштег не может быть длиннее 20 символов, включая символ `#`.';
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

errorMessageFunc = () => errorMessage;

// Добавляем валидацию для хэштегов
pristine.addValidator(
  textHashtags, // Элемент input
  validateHeshtag,
  errorMessageFunc
);

// Обработка события отправки формы
formUploadImage.addEventListener('submit', (evt) => {
  evt.preventDefault(); // Отменяем стандартное поведение

  const isValid = pristine.validate(); // Проверяем валидацию
  if (isValid) {
    console.log('Форма валидна, можно отправлять');
  } else {
    console.log('Форма невалидна, проверьте поля');
  }
});

export {initializeImageEditorHandlers};
