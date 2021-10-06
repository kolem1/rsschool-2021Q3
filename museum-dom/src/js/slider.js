const Slider = function(slider, options = {}) {
  this.slider = document.querySelector(slider);

  this.currentBreakpoint = 0;

  this.init = function() {
    this.resize.bind(this, options)();
    window.addEventListener('resize', this.resize.bind(this, options));
  };

  this.resize = function(params) {
    let slider = this.slider;
    let slides = slider.querySelectorAll('.slide');
    slides.forEach(slide => {
      let slidesCount = params.slides ? params.slides : 1;
      let gap = params.gap ? params.gap : 0;

      if(params.breakpoints) {
        const width = document.body.clientWidth;
        let breakpoints = [];
        for(let breakpoint in params.breakpoints) {
          if(width <= breakpoint) {
            breakpoints.push(breakpoint);
          }
        }
        if(breakpoints.length > 0) {
          this.currentBreakpoint = Math.min(...breakpoints.map(item => +item));
        } else {
          this.currentBreakpoint = 0;
        }
        if(this.currentBreakpoint != 0) {
          slidesCount = params.breakpoints[this.currentBreakpoint].slides ? params.breakpoints[this.currentBreakpoint].slides : slidesCount;
          gap = params.breakpoints[this.currentBreakpoint].gap ? params.breakpoints[this.currentBreakpoint].gap : 0;
        }
      }

      const width = (slider.offsetWidth - gap * (slidesCount - 1)) / slidesCount;
      slide.style.width = width + 'px';
      if(gap) {
        slide.style.marginRight = gap + 'px';
      }
    })
  };

  this.init();
}

const welcomeSlider = new Slider('.welcome-slider');
const videoSlider = new Slider('.video-slider', {
  slides: 3,
  gap: 42,
  breakpoints: {
    992: {
      slides: 2,
      gap: 20
    },
    375: {
      slides: 1,
      gap: 0
    }
  }
})