import { initPageData } from './thumbnails.js';
import { showSuccessMessage, showErrorMessage, showErrorMessageData } from './utils';
import { handleFormSubmit, closeEditorImage } from './upload-photo-form.js';
import { fetchData } from './api.js';

const successCallbackFunc = () => {
  showSuccessMessage();
  closeEditorImage();
};

fetchData(
  'https://31.javascript.htmlacademy.pro/kekstagram/data',
  initPageData,
  showErrorMessageData
);

handleFormSubmit(successCallbackFunc, showErrorMessage);

