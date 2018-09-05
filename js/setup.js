'use strict';

var wizardsParams = {
  COUNT: 4,
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green']
};

var userDialog = document.querySelector('.setup');
var similarElement = document.querySelector('.setup-similar');
var similarListElement = document.querySelector('.setup-similar-list');

// функция получения рандомного индекса
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// функция-конструктор для создания мага
function Wizard() {
  this.name = wizardsParams.NAMES[getRandomIndex(wizardsParams.NAMES.length)] + ' ' + wizardsParams.SURNAMES[getRandomIndex(wizardsParams.SURNAMES.length)];
  this.coatColor = wizardsParams.COAT_COLORS[getRandomIndex(wizardsParams.COAT_COLORS.length)];
  this.eyesColor = wizardsParams.EYES_COLORS[getRandomIndex(wizardsParams.EYES_COLORS.length)];
}

// функция заполнения массива похожих персонажей
var getWizards = function (count) {
  var arr = [];
  for (var i = 0; i < count; i++) {
    arr.push(new Wizard());
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

// показываем скрытые элементы в верстке
userDialog.classList.remove('hidden');
similarElement.classList.remove('hidden');
renderWizardElements();
