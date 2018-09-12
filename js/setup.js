'use strict';

var wizardsParams = {
  COUNT: 4,
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
  FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
};

var keycodes = {
  ESC: 27,
  ENTER: 13
};

var userDialog = document.querySelector('.setup');
var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = document.querySelector('.setup-close');
var userNameElement = document.querySelector('.setup-user-name');
var userCoat = document.querySelector('.setup-wizard .wizard-coat');
var userCoatElement = document.querySelector('.setup-player input[name=coat-color]');
var userEyes = document.querySelector('.setup-wizard .wizard-eyes');
var userEyesElement = document.querySelector('.setup-player input[name=eyes-color]');
var userFireball = document.querySelector('.setup-fireball-wrap');
var userFireballElement = document.querySelector('.setup-fireball-wrap input[name=fireball-color]');
var similarElement = document.querySelector('.setup-similar');
var similarListElement = document.querySelector('.setup-similar-list');

// функция получения рандомного индекса
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// функция возвращает объект wizard
var getWizardObject = function () {
  var wizard = {
    name: wizardsParams.NAMES[getRandomIndex(wizardsParams.NAMES.length)] + ' ' +
          wizardsParams.SURNAMES[getRandomIndex(wizardsParams.SURNAMES.length)],
    coatColor: wizardsParams.COAT_COLORS[getRandomIndex(wizardsParams.COAT_COLORS.length)],
    eyesColor: wizardsParams.EYES_COLORS[getRandomIndex(wizardsParams.EYES_COLORS.length)]
  };
  return wizard;
};

// функция заполнения массива похожих персонажей
var getWizards = function (count) {
  var arr = [];
  for (var i = 0; i < count; i++) {
    arr.push(getWizardObject());
  }
  return arr;
};

// функция создания DOM-элементов и заполнения их данными из массива
var renderWizard = function (wizard) {
  var wizardElement = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item')
    .cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

// функция отрисовки сгенерированных DOM-элементов
var renderWizardElements = function () {
  var wizards = getWizards(wizardsParams.COUNT);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

// функция-обработчик нажатия на Esc
var onPopupEscPress = function (evt) {
  if (evt.keyCode === keycodes.ESC) {
    closePopup();
  }
};

// функция открывает окно персонажа
var openPopup = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

// функция закрывает окно персонажа
var closePopup = function () {
  userDialog.classList.add('hidden');
};

// если поле имени в фокусе, удаляем обработчик нажатия Esc
userNameElement.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

// если поле имени не в фокусе, добавляем обработчик нажатия Esc
userNameElement.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});

// обработчик клика на блоке открытия окна
userDialogOpen.addEventListener('click', function () {
  openPopup();
});

// обработчик нажатия на клавишу на блоке открытия окна
userDialogOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === keycodes.ENTER) {
    openPopup();
  }
});

// обработчик клика на кнопке закрыть
userDialogClose.addEventListener('click', function () {
  closePopup();
});

// обработчик нажатия на клавишу на кнопке закрыть
userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === keycodes.ENTER) {
    closePopup();
  }
});

// функция изменения цвета плаща
var onCoatClick = function () {
  var color = wizardsParams.COAT_COLORS[getRandomIndex(wizardsParams.COAT_COLORS.length)];
  userCoat.style.fill = color;
  userCoatElement.value = color;
};

// функция изменения цвета глаз
var onEyesClick = function () {
  var color = wizardsParams.EYES_COLORS[getRandomIndex(wizardsParams.EYES_COLORS.length)];
  userEyes.style.fill = color;
  userEyesElement.value = color;
};

// функция-обработчик нажатия на фаербол
var onFireballClick = function () {
  var color = wizardsParams.FIREBALL_COLORS[getRandomIndex(wizardsParams.FIREBALL_COLORS.length)];
  userFireball.style.background = color;
  userFireballElement.value = color;
};

// обработчик клика по плащу
userCoat.addEventListener('click', onCoatClick);

// обработчик клика по глазам
userEyes.addEventListener('click', onEyesClick);

// обработчик клика по фаерболу
userFireball.addEventListener('click', onFireballClick);

similarElement.classList.remove('hidden');
renderWizardElements();
