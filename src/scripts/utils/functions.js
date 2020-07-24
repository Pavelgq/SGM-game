/**
 * Функция счетчик вызовов
 */
 const makeCounter = function makeCounter() {
  var currentCount = 1;

  function counter() {
    return currentCount++;
  }

  counter.set = function (value) {
    currentCount = value;
  };

  counter.reset = function () {
    currentCount = 1;
  };

  return counter;
}

const randomNumber = function randomNumber(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
export default {
  makeCounter,
  randomNumber
};