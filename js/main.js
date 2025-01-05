import { initPageData } from './thumbnails.js';
import { showErrorMessageData } from './utils';
import { handleFormSubmit } from './upload-photo-form.js';
import { getData } from './api.js';

// const successCallbackFunc = () => {
//   showSuccessMessage();
//   closeEditorImage();
// };

// fetchData(
//   'https://31.javascript.htmlacademy.pro/kekstagram/data',
//   initPageData,
//   showErrorMessageData
// );

getData().then((datas) => initPageData(datas)).catch(showErrorMessageData);

handleFormSubmit();

