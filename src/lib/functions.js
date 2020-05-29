/**
 * Функция счетчик вызовов
 */
export default function makeCounter() {
    var currentCount = 1;
  
    function counter() {
      return currentCount++;
    }
  
    counter.set = function(value) {
      currentCount = value;
    };
  
    counter.reset = function() {
      currentCount = 1;
    };
  
    return counter;
  }