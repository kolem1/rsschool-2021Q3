class ImageComparator {
  constructor(selector) {
    this.element = document.querySelector(selector);
    this.width = this.element.offsetWidth;
    this.init(this.element);
    window.addEventListener('resize', this.resize.bind(this));
  }

  init(element) {
    const ChangedContainer = element.querySelector('.explore-mutable'),
          drag = element.querySelector('.explore-drag');
    let clicked = 0;
    
    drag.addEventListener('mousedown', slideReady);
    window.addEventListener('mouseup', slideFinish);
    drag.addEventListener('touchstart', slideReady);
    drag.addEventListener('touchstop', slideFinish);

    const slide = (position) => {
      const containerWidth = Math.round(position / this.width  * 1000) / 10;
      const dragPosition = Math.round((position - drag.offsetWidth / 2) / this.width * 1000) / 10;

      ChangedContainer.style.width = containerWidth + '%';

      drag.style.left = dragPosition + '%';
    }

    const slideMove = (e) => {
      if(clicked == 0) return;

      let position = getCursorPosition(e);

      if(position < 0) position = 0;
      if(position > this.width) position = this.width;

      slide(position);
    }

    function slideReady(e) {
      e.preventDefault();

      clicked = 1;

      window.addEventListener("mousemove", slideMove.bind(this));
      window.addEventListener("touchmove", slideMove.bind(this));
    }

    function slideFinish() {
      clicked = 0;
    }

    function getCursorPosition(e) {
      let containerRect = ChangedContainer.getBoundingClientRect();

      let x = e.pageX - containerRect.left;
      x = x - window.pageXOffset;

      return x;
    }
  }

  resize() {
    this.width = this.element.offsetWidth
  }
}

const pictureExplore = new ImageComparator('.picture-compare');