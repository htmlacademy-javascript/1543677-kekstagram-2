import { onDocumentKeydown } from './upload-photo-form.js';

const isEscapeKey = (evt) => evt.key === 'Escape';

const bodyPage = document.querySelector('body');
const templateSuccess = document.querySelector('#success').content.querySelector('.success');
const templateError = document.querySelector('#error').content.querySelector('.error');

const dataError = document.querySelector('#data-error').content.querySelector('.data-error');

export const showErrorMessageData = () => {
  const errorElement = dataError.cloneNode(true);
  bodyPage.appendChild(errorElement);
  setTimeout(() => {
    errorElement.remove();
  }, 5000);
};

function createMessageHandler(template, closeSelectors) {
  const messageElement = template.cloneNode(true);
  const closeButton = messageElement.querySelector(closeSelectors.button);
  const innerElement = messageElement.querySelector(closeSelectors.inner);

  function onCloseButtonClick() {
    messageElement.remove();
    document.removeEventListener('keydown', onDocumentEscape);
    document.removeEventListener('click', onOutsideClick);
    closeButton.removeEventListener('click', onCloseButtonClick);
    document.addEventListener('keydown', onDocumentKeydown);
  }

  function onDocumentEscape(event) {
    if (isEscapeKey(event)) {
      onCloseButtonClick();
    }
  }

  function onOutsideClick(event) {
    if (!innerElement.contains(event.target)) {
      onCloseButtonClick();
    }
  }

  return {
    showMessage: () => {
      bodyPage.appendChild(messageElement);
      document.removeEventListener('keydown', onDocumentKeydown);
      closeButton.addEventListener('click', onCloseButtonClick);
      document.addEventListener('keydown', onDocumentEscape);
      document.addEventListener('click', onOutsideClick);
    },
  };
}

const successMessageHandler = createMessageHandler(templateSuccess, {
  button: '.success__button',
  inner: '.success__inner',
});

const errorMessageHandler = createMessageHandler(templateError, {
  button: '.error__button',
  inner: '.error__inner',
});

const createDebouncedFunction = (callback, delay) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(this, args), delay);
  };
};

export const showSuccessMessage = successMessageHandler.showMessage;
export const showErrorMessage = errorMessageHandler.showMessage;
export { isEscapeKey, createDebouncedFunction };


