import player from "./video-player";
import youtubeVideos from "./lazy-youtube";

import Swiper, {Navigation, Pagination} from "swiper";
import 'swiper/css';

Swiper.use([Navigation, Pagination]);

const videoSlider = new Swiper('.video-slider__slider', {
  loop: true,
  slidesPerView: 3,
  spaceBetween: 42,

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

  on: {
    slideChange: function() {
      player.video.src = `assets/video/video${this.realIndex}.mp4`;
      player.video.poster = `assets/video/poster${this.realIndex}.jpg`;
      // stopYoutube();
    }
  }
});

// youtubeVideos.forEach(item => {
//   item.addEventListener('click', function() {
//     stopYoutube();
//     this.querySelector('iframe').contentWindow.postMessage('{"event":"onStateChange","func":"stopYoutube","args":""}', '*')
//   });
// })

// function stopYoutube() {
//   youtubeVideos.forEach(item => {
//     let youtubeVideo = item.querySelector('iframe');
//     if(youtubeVideo) {
//       youtubeVideo.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
//     }
//   })
// }



