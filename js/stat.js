'use strict';

var cloudWidth = 420;
var cloudHeight = 270;
var cloudX = 100;
var cloudY = 10;
var gap = 10;
var fontGap = 20;
var textHeight = 80;
var barHeight = 150;
var barX = cloudX + fontGap * 2;
var barY = cloudY + textHeight;
var columnWidht = 40;
var columnGap = 50;

// функция рисования облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x + fontGap, y);
  ctx.lineTo(x + cloudWidth - fontGap, y);
  ctx.quadraticCurveTo(x + cloudWidth, y, x + cloudWidth, y + fontGap);
  ctx.lineTo(x + cloudWidth, y + cloudHeight - fontGap);
  ctx.quadraticCurveTo(x + cloudWidth, y + cloudHeight, x + cloudWidth - fontGap, y + cloudHeight);
  ctx.lineTo(x + fontGap, y + cloudHeight);
  ctx.quadraticCurveTo(x, y + cloudHeight, x, y + cloudHeight - fontGap);
  ctx.lineTo(x, y + fontGap);
  ctx.quadraticCurveTo(x, y, x + fontGap, y);
  ctx.closePath();
  ctx.fill();
};

// функция поиска максимального элемента
var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  // рисование облака
  renderCloud(ctx, cloudX + gap, cloudY + gap, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, cloudX, cloudY, '#ffffff');

  // рисование текста на облаке
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', cloudX + fontGap, cloudY + fontGap + gap);
  ctx.fillText('Список результатов:', cloudX + fontGap, cloudY + fontGap * 2 + gap);

  // если массивы times и names разной длины, лишние элементы удаляются
  if (times.length !== names.length) {
    var differenceLengths = Math.abs(times.length - names.length);
    if (times.length > names.length) {
      times.splice(times.length - differenceLengths);
    } else {
      names.splice(names.length - differenceLengths);
    }
  }

  var maxTime = getMaxElement(times);

  // рисование гистограммы
  for (var i = 0; i < times.length; i++) {
    var columnOpacity = Math.random();
    var columnHeight = Math.round(times[i] * barHeight / maxTime);
    ctx.fillStyle = names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + columnOpacity + ')';
    ctx.fillRect(barX + i * (columnGap + columnWidht), barY + barHeight - columnHeight, columnWidht, columnHeight);
    ctx.fillStyle = '#000000';
    ctx.fillText(Math.round(times[i]), barX + i * (columnGap + columnWidht), barY + barHeight - columnHeight - gap);
    ctx.fillText(names[i], barX + i * (columnGap + columnWidht), barY + barHeight + fontGap);
  }
};
