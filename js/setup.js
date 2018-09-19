'use strict';

// отрисовывает похожих магов
(function () {
  var wizardsParams = {
    COUNT: 4,
    NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг']
  };

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarElement = document.querySelector('.setup-similar');

  // функция возвращает объект wizard
  var getWizardObject = function () {
    var wizard = {
      name: wizardsParams.NAMES[window.utils.getRandomIndex(wizardsParams.NAMES.length)] + ' ' +
            wizardsParams.SURNAMES[window.utils.getRandomIndex(wizardsParams.SURNAMES.length)],
      coatColor: window.utils.COAT_COLORS[window.utils.getRandomIndex(window.utils.COAT_COLORS.length)],
      eyesColor: window.utils.EYES_COLORS[window.utils.getRandomIndex(window.utils.EYES_COLORS.length)]
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

  similarElement.classList.remove('hidden');
  renderWizardElements();
})();
