import { showErrorMessageData } from './utils.js';
import { handleFormSubmit } from './upload-photo-form.js';
import { getData } from './api.js';
import { showImageFilters } from './filter.js';
import './download-photo.js';

getData()
  .then((data) => {
    showImageFilters(data);
  })
  .catch(showErrorMessageData);

handleFormSubmit();

