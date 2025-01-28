const sliderElement = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const effectsRadio = document.querySelector('.effects__radio');
const image = document.querySelector('.img-upload__preview img');

let effectName = 'none';

effectLevel.classList.add('hidden');

noUiSlider.create(sliderElement, {
  start: 0,
  connect: 'lower',
  step: 0.1,
  range: {
    min: 0,
    max: 1,
  },
  format: {
    to: (value) => (Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1)),
    from: (value) => parseFloat(value),
  },
});

const effectSettings = {
  none: { range: { min: 0, max: 1 }, start: 0, step: 0.1, hidden: true },
  chrome: { range: { min: 0, max: 1 }, start: 1, step: 0.1, hidden: false, filter: 'grayscale' },
  sepia: { range: { min: 0, max: 1 }, start: 1, step: 0.1, hidden: false, filter: 'sepia' },
  marvin: { range: { min: 0, max: 100 }, start: 100, step: 1, hidden: false, filter: 'invert', unit: '%' },
  phobos: { range: { min: 0, max: 3 }, start: 3, step: 0.1, hidden: false, filter: 'blur', unit: 'px' },
  heat: { range: { min: 0, max: 3 }, start: 3, step: 0.1, hidden: false, filter: 'brightness' },
};

const updateImageFilter = (value) => {
  const { filter, unit = '' } = effectSettings[effectName] || {};
  image.style.filter = filter ? `${filter}(${value}${unit})` : '';
};

const updateSliderOptions = ({ range, start, step, hidden }) => {
  sliderElement.noUiSlider.updateOptions({ range, start, step });
  effectLevel.classList.toggle('hidden', hidden);
};

sliderElement.noUiSlider.on('update', () => {
  const value = sliderElement.noUiSlider.get();
  effectLevelValue.value = value;
  updateImageFilter(value);
});

const changeEffectParametr = (evt) => {
  effectName = evt.target.value;
  const settings = effectSettings[effectName] || effectSettings.none;
  updateSliderOptions(settings);
};

const resetNoUiSlider = () => {
  effectName = 'none';
  updateSliderOptions(effectSettings.none);
  effectsRadio.checked = true;
  image.style.filter = '';
};

effectsList.addEventListener('click', changeEffectParametr);

export { resetNoUiSlider };
