//import { initPageData } from './thumbnails.js';
import { showErrorMessageData } from './utils';
import { handleFormSubmit } from './upload-photo-form.js';
import { getData } from './api.js';
import { showImageFilters } from './filter.js';
import './download-photo.js';

getData().then((datas) =>{
  showImageFilters(datas);
}).catch(showErrorMessageData);

handleFormSubmit();

