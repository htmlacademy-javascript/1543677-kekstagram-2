import { isEscapeKey, showSuccessMessage, showErrorMessage } from './utils';
import { sendData } from './api';
import { pristine, resetPristine } from './pristine-validate.js';
import { resetScale } from './photo-scale.js';
import { resetNoUiSlider } from './nouislider.js';

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Сохраняю...',
};

const imageInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const pageBody = document.querySelector('body');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const formUploadImage = document.querySelector('#upload-select-image');
const submitButton = document.querySelector('#upload-submit');

export const onDocumentKeydown = (evt) => {
  const activeElement = document.activeElement;
  if (
    activeElement &&
    (activeElement.classList.contains('text__hashtags') ||
      activeElement.classList.contains('text__description'))
  ) {
    return;
  }

  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditorImage();
  }
};

const openEditorImage = () => {
  uploadOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

function closeEditorImage() {
  uploadOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imageInput.value = '';
  resetPristine();
  resetScale();
  resetNoUiSlider();
}

imageInput.addEventListener('change', (evt) => {
  evt.preventDefault();
  openEditorImage();
});

imgUploadCancel.addEventListener('click', closeEditorImage);

const blockSubmitButton = (isBlocked = true) => {
  submitButton.disabled = isBlocked;
  submitButton.textContent = isBlocked ? SubmitButtonText.SENDING : SubmitButtonText.IDLE;
};

const successCallbackFunc = () => {
  showSuccessMessage();
  closeEditorImage();
};

const handleFormSubmit = () => {
  formUploadImage.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (!isValid) {
      return;
    }
    if (isValid) {
      blockSubmitButton();
      const formData = new FormData(evt.target);
      sendData(formData)
        .then(() => {
          successCallbackFunc();
        })
        .catch(showErrorMessage)
        .finally(() => {
          blockSubmitButton(false);
        });
    }
  });
};

export { handleFormSubmit };
