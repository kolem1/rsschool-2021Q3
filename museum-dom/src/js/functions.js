function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    let context = this, args = arguments;
    let later = function() {
      timeout = null;
      if(!immediate) func.call(context, args);
    }
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if(callNow) func.call(context, args);
  }
}

function offset(el) {
  const rect = el.getBoundingClientRect(),
        scrollLeft = window.scrollX,
        scrollTop = window.scrollY;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  }
}

export {shuffle, debounce, offset};