export default class SoundsLibrary {
  constructor(soundsSettings, sounds) {
    this.isActive = soundsSettings.soundIsOn;
    this.sounds = sounds;
    this.volume = soundsSettings.volume;
    this.listeners = this.addListeners();
  }

  init() {
    if (this.isActive) {
      document.addEventListener('click', this.listeners);
    } else {
      document.removeEventListener('click', this.listeners);
    }
  }

  addListeners() {
    const sounds = this.sounds;
    const volume = this.volume;
    function listeners({target}) {
      sounds.forEach(sound => {
        if (target.closest(`.${sound.class}`)) {
          const audio = new Audio();
          audio.addEventListener('loadeddata', function() {
            audio.play();
          }, false);
          audio.volume = volume;
          audio.src = sound.audio;
          
        }
      })
    }

    return listeners;
  }

  setActive(settings) {
    this.isActive = settings.soundIsOn;
    this.volume = settings.volume;
    document.removeEventListener('click', this.listeners);
    this.listeners = this.addListeners();
    this.init();
  }
}