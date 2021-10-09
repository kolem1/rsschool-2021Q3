import { debounce, offset } from "../functions";

const animatedItems = document.querySelectorAll('.slide-up');

if(animatedItems.length > 0) {
    window.addEventListener('scroll', debounce(checkItems));
    setTimeout(checkItems, 0);
}

function checkItems() {
  animatedItems.forEach(item => {
    const itemHeight = item.offsetTop;
    const itemOffset = offset(item);
    const animStart = 10;

    let animPoint = window.innerHeight - itemHeight / animStart;
    if(window.innerHeight < itemHeight) {
      animPoint = window.innerHeight - window.innerHeight / animStart;
    }

    if(window.scrollY > itemOffset.top - animPoint) {
      item.classList.add('active');
    } else if (window.scrollY < itemOffset.top) {
      item.classList.remove('active');
    }

  });
}