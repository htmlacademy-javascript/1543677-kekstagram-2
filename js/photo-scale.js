const bigger = document.querySelector('.scale__control--bigger');
const smaller = document.querySelector('.scale__control--smaller');
const controlValue = document.querySelector('.scale__control--value');
const image = document.querySelector('.img-upload__preview img');

const SCALE_STEP = 0.25;
let scale = 1;

function makeBiggerImage() {
  if (scale < 1) {
    scale += SCALE_STEP;
    image.style.transform = `scale(${scale})`;
    controlValue.value = `${scale * 100}%`;
  }
}

function makeSmallerImage() {
  if (scale > SCALE_STEP) {
    scale -= SCALE_STEP;
    image.style.transform = `scale(${scale})`;
    controlValue.value = `${scale * 100}%`;
  }
}

bigger.addEventListener('click', makeBiggerImage);
smaller.addEventListener('click', makeSmallerImage);

const resetScale = () => {
  scale = 1;
  image.style.transform = `scale(${scale})`;
  controlValue.value = `${100}%`;
};

export {resetScale};
