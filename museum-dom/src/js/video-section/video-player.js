import styleRanges from "../style-ranges";

const ranges = document.querySelectorAll('.styled-range');
styleRanges(ranges);

class VideoPlayer {
  constructor(selector) {
    this.player = document.querySelector(selector);
    this.init();
  }

  init() {
    const player = this.player;
    this.video = player.querySelector('video');
    this.progressRange = player.querySelector('.range[name=progress]');
    this.playButton = player.querySelector('.button[name=play]');
    this.volumeRange = player.querySelector('.range[name=volume]');
    this.controlPlayButton = player.querySelector('.button[name=control-play]');
    this.muteButton = player.querySelector('.button[name=mute]');
    this.fullscreenButton = player.querySelector('.button[name=fullscreen]');


    this.video.addEventListener('click', this.toggleVideo.bind(this));
    this.controlPlayButton.addEventListener('click', this.toggleVideo.bind(this))

    this.video.addEventListener('play', this.updatePlayButtons.bind(this));
    this.video.addEventListener('pause', this.updatePlayButtons.bind(this));

    this.video.volume = parseInt(this.volumeRange.value) / 100;
    this.volumeRange.addEventListener('input', this.handleVolumeUpdate.bind(this));
    this.video.addEventListener('volumechange', this.updateMuteButton.bind(this));
    this.muteButton.addEventListener('click', this.ChangeMuteVideo.bind(this));

    this.video.addEventListener('timeupdate', this.changeProgress.bind(this));
    this.progressRange.addEventListener('input', this.setProgress.bind(this));

    this.fullscreenButton.addEventListener('click', this.requestFullscreen.bind(this));
    this.player.addEventListener('fullscreenchange', this.fullscreenChange.bind(this));

    this.video.addEventListener('play', () => this.video.focus());
    document.addEventListener('keydown', this.keyControls.bind(this));
  }

  toggleVideo() {
    if(this.video.paused) {
      this.video.play();
    } else {
      this.video.pause();
    }
  }

  updatePlayButtons() {
    const paused = this.video.paused;
    if(paused) {
      this.playButton.classList.remove('video-played');
      this.replaceSvgHref(this.controlPlayButton, 'play');
      this.replaceSvgHref(this.playButton, 'big-play');
    } else {
      this.playButton.classList.add('video-played');
      this.replaceSvgHref(this.controlPlayButton, 'pause');
      this.replaceSvgHref(this.playButton, 'big-pause');
    }
  }

  updateMuteButton() {
    if(this.video.volume == 0) {
      this.replaceSvgHref(this.muteButton, 'mute');
    } else {
      this.replaceSvgHref(this.muteButton, 'volume');
    }
  }

  ChangeMuteVideo() {
    if(this.video.volume == 0) {
      this.replaceSvgHref(this.muteButton, 'mute');
      this.video.volume = parseInt(this.volumeRange.value) / 100;
    } else {
      this.replaceSvgHref(this.muteButton, 'volume');
      this.video.volume = 0;
    }
  }

  changeProgress() {
    const percent = this.video.currentTime / this.video.duration * 100;
    this.progressRange.value = percent;
    this.progressRange.style.background = `linear-gradient(to right, #710707 ${percent}%, #C4C4C4 ${percent}%)`
  }

  setProgress() {
    this.video.currentTime = this.progressRange.value / 100 * this.video.duration;
  }

  handleVolumeUpdate() {
    this.video.volume = parseInt(this.volumeRange.value) / 100;
  }

  requestFullscreen() {
    const player = this.player;
    if(player.classList.contains('video--fullscreen')) {
      document.exitFullscreen();
    } else {
      player.requestFullscreen();
    }
  }

  fullscreenChange() {
    const controlsBar = this.player.querySelector('.video-control');
    const videoContainer = this.player.querySelector('.video__container');
    if(document.fullscreenElement && document.fullscreenElement.classList.contains('video')) {
      this.player.classList.add('video--fullscreen');
      videoContainer.style.height = `calc(100vh - ${controlsBar.offsetHeight}px)`;
      this.replaceSvgHref(this.fullscreenButton, 'fullscreen_exit');
      this.video.focus();
    } else {
      this.player.classList.remove('video--fullscreen');
      videoContainer.style.height = '';
      this.replaceSvgHref(this.fullscreenButton, 'fullscreen');
    }
  }

  keyControls(event) {
    console.log(event)
    if(document.activeElement == this.video) {
      switch(event.code) {
        case 'Space':
          event.preventDefault();
          this.toggleVideo();
          break;
        case 'KeyM':
          event.preventDefault();
          this.ChangeMuteVideo();
          break;
        case 'KeyF':
          event.preventDefault();
          this.requestFullscreen();
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          document.onkeydown = (event) => {
            if(event.code == 'Period') {
              this.changePlaybackRate.call(this, 0.25);
            }
            if(event.code == 'Comma') {
              this.changePlaybackRate.call(this, -0.25);
            }
          }
      }

    }
  }

  changePlaybackRate(coef) {
    const currentPlaybackRate = this.video.playbackRate;
    const changedPlaybackRate = currentPlaybackRate + coef;
    if(changedPlaybackRate <= 2 && changedPlaybackRate >= 0.25) {
      this.video.playbackRate = changedPlaybackRate;
    }
    const videoContainer = this.player.querySelector('.video__container');
    const oldMessage = videoContainer.querySelector('.video__playbackRate');

    const message = document.createElement('span');
    message.classList.add('video__playbackRate');
    message.textContent = this.video.playbackRate + 'x';

    if(oldMessage) oldMessage.remove();
    videoContainer.append(message);
    setTimeout(() => message.remove(), 1000);
  }

  replaceSvgHref(buttonWithSprieSvg, spriteItemId) {
    const buttonSvg = buttonWithSprieSvg.querySelector('use');
    const buttonSvgHref = buttonSvg.href.baseVal;
    buttonSvg.href.baseVal = buttonSvgHref.match(/.+\.svg#/) + spriteItemId;
  }
}

const player = new VideoPlayer('.video');

export default player;