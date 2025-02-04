
const MAX_HASHTAGS = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;
const REGEX = /^#[a-zA-Z0-9а-яА-Я]{1,19}$/i;

const ERROR_MESSAGES = {
  tooManyHashtags: 'Нельзя использовать больше пяти хэштегов.',
  hashtagNoHash: 'Хэштег должен начинаться с символа `#`.',
  hashtagOnlyHash: 'Хэштег не может состоять только из символа `#`.',
  hashtagTooLong: 'Хэштег не может быть длиннее 20 символов, включая символ `#`.',
  invalidCharacters: 'Хэштег может содержать только буквы и цифры, без пробелов, спецсимволов или эмодзи.',
  duplicateHashtag: 'Один и тот же хэштег нельзя использовать несколько раз.',
  commentTooLong: 'Комментарий слишком длинный. Максимальная длина составляет 140 символов. Пожалуйста, сократите текст.'
};

const formUploadImage = document.querySelector('#upload-select-image');
const textHashtags = formUploadImage.querySelector('.text__hashtags');
const textComment = formUploadImage.querySelector('.text__description');

let errorMessage = '';

const pristine = new Pristine(formUploadImage, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const validateHashtagFormat = (tag) => REGEX.test(tag);

const validateHashtags = (value) => {
  if (!value.trim()) {
    return true;
  }

  const tags = value.trim().split(/\s+/).map((tag) => tag.toLowerCase());

  if (tags.length > MAX_HASHTAGS) {
    errorMessage = ERROR_MESSAGES.tooManyHashtags;
    return false;
  }

  for (const [index, tag] of tags.entries()) {
    if (!tag.startsWith('#')) {
      errorMessage = ERROR_MESSAGES.hashtagNoHash;
      return false;
    }
    if (tag === '#') {
      errorMessage = ERROR_MESSAGES.hashtagOnlyHash;
      return false;
    }
    if (tag.length > MAX_HASHTAG_LENGTH) {
      errorMessage = ERROR_MESSAGES.hashtagTooLong;
      return false;
    }
    if (!validateHashtagFormat(tag)) {
      errorMessage = ERROR_MESSAGES.invalidCharacters;
      return false;
    }
    if (tags.indexOf(tag) !== index) {
      errorMessage = ERROR_MESSAGES.duplicateHashtag;
      return false;
    }
  }

  return true;
};

const validateComment = (value) => {
  if (value.length > MAX_COMMENT_LENGTH) {
    errorMessage = ERROR_MESSAGES.commentTooLong;
    return false;
  }
  return true;
};

const getErrorMessage = () => errorMessage;

pristine.addValidator(textHashtags, validateHashtags, getErrorMessage);
pristine.addValidator(textComment, validateComment, getErrorMessage);

function resetPristine() {
  formUploadImage.reset();
  pristine.reset();
  errorMessage = '';
}

export { pristine, resetPristine };
