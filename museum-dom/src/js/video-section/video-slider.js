import player from "./video-player";
import { youtubeVideos, youtubePlayers } from "./lazy-youtube";

import Swiper, {Navigation, Pagination} from "swiper";
import 'swiper/css';

Swiper.use([Navigation, Pagination]);

const videoSlider = new Swiper('.video-slider__slider', {
  loop: true,
  slidesPerView: 2,
  spaceBetween: 10,

  pagination: {
    el: '.video-slider__dots',
    clickable: true,
    bulletClass: 'video-slider__dot',
    bulletActiveClass: 'video-slider__dot--active',
  },

  navigation: {
    nextEl: '.video-slider__arrow-next',
    prevEl: '.video-slider__arrow-prev'
  },

  breakpoints: {
    375: {
      spaceBetween: 20,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 42
    }
  },

  on: {
    slideChange: function() {
      player.stopVideo();
      setTimeout(() => {
        player.video.src = `assets/video/video${this.realIndex}.mp4`;
        player.video.poster = `assets/video/poster${this.realIndex}.jpg`;
      }, 0)
      pauseYoutubes();
    }
  }
});

youtubeVideos.forEach(item => {
  item.addEventListener('click', function(event) {
    const thisIframe = this.querySelector('iframe');
    pauseYoutubes(event, thisIframe);
    youtubePlayers[youtubePlayers.length - 1].addEventListener('onStateChange', function(event) {
      if(event.data == 1) {
        const thisIframe = event.target.h;
        pauseYoutubes(event, thisIframe);
      }
    });
  })
});

function pauseYoutubes(event, context) {
  youtubePlayers.forEach(item => {
    if(item.h != context) item.pauseVideo();
  });
}



