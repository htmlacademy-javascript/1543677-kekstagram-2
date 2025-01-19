export function getRandomInteger(a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
}

export const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

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

  function closeMessage() {
    messageElement.remove();
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('click', onOutsideClick);
    closeButton.removeEventListener('click', closeMessage);
  }

  function onEscPress(event) {
    if (isEscapeKey(event)) {
      closeMessage();
    }
  }

  function onOutsideClick(event) {
    if (!innerElement.contains(event.target)) {
      closeMessage();
    }
  }

  return {
    showMessage: () => {
      bodyPage.appendChild(messageElement);
      closeButton.addEventListener('click', closeMessage);
      document.addEventListener('keydown', onEscPress);
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

// Функция устранения дребезга
function debounce(callback, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(this, args), delay);
  };
}

export const showSuccessMessage = successMessageHandler.showMessage;
export const showErrorMessage = errorMessageHandler.showMessage;
export { isEscapeKey, debounce };


