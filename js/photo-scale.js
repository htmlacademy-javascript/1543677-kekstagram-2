const SCALE_STEP = 0.25;

const bigger = document.querySelector('.scale__control--bigger');
const smaller = document.querySelector('.scale__control--smaller');
const controlValue = document.querySelector('.scale__control--value');
const image = document.querySelector('.img-upload__preview img');

let scale = 1;

function onBiggerButtonClick() {
  if (scale < 1) {
    scale += SCALE_STEP;
    image.style.transform = `scale(${scale})`;
    controlValue.value = `${scale * 100}%`;
  }
}

function onSmallerButtonClick() {
  if (scale > SCALE_STEP) {
    scale -= SCALE_STEP;
    image.style.transform = `scale(${scale})`;
    controlValue.value = `${scale * 100}%`;
  }
}

bigger.addEventListener('click', onBiggerButtonClick);
smaller.addEventListener('click', onSmallerButtonClick);

const resetScale = () => {
  scale = 1;
  image.style.transform = `scale(${scale})`;
  controlValue.value = `${100}%`;
};

export { resetScale };
