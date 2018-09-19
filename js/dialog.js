'use strict';

// описывает взаимодействие с окном диалога
(function () {
  var keycodes = {
    ESC: 27,
    ENTER: 13
  };

  var userDialog = document.querySelector('.setup');
  var userDialogOpen = document.querySelector('.setup-open');
  var userDialogClose = userDialog.querySelector('.setup-close');
  var userNameElement = userDialog.querySelector('.setup-user-name');

  var userCoat = userDialog.querySelector('.setup-wizard .wizard-coat');
  var userCoatElement = userDialog.querySelector('.setup-player input[name=coat-color]');
  var userEyes = userDialog.querySelector('.setup-wizard .wizard-eyes');
  var userEyesElement = userDialog.querySelector('.setup-player input[name=eyes-color]');
  var userFireball = userDialog.querySelector('.setup-fireball-wrap');
  var userFireballElement = userDialog.querySelector('.setup-fireball-wrap input[name=fireball-color]');


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
    var color = window.utils.COAT_COLORS[window.utils.getRandomIndex(window.utils.COAT_COLORS.length)];
    userCoat.style.fill = color;
    userCoatElement.value = color;
  };

  // функция изменения цвета глаз
  var onEyesClick = function () {
    var color = window.utils.EYES_COLORS[window.utils.getRandomIndex(window.utils.EYES_COLORS.length)];
    userEyes.style.fill = color;
    userEyesElement.value = color;
  };

  // функция-обработчик нажатия на фаербол
  var onFireballClick = function () {
    var color = window.utils.FIREBALL_COLORS[window.utils.getRandomIndex(window.utils.FIREBALL_COLORS.length)];
    userFireball.style.background = color;
    userFireballElement.value = color;
  };

  // обработчик клика по плащу
  userCoat.addEventListener('click', onCoatClick);

  // обработчик клика по глазам
  userEyes.addEventListener('click', onEyesClick);

  // обработчик клика по фаерболу
  userFireball.addEventListener('click', onFireballClick);
})();
