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
    const { volume } = this;
    const sounds = this.sounds.filter((item) => item.class);
    function listeners({ target }) {
      sounds.forEach((sound) => {
        if (target.closest(`.${sound.class}`)) {
          const audio = new Audio();
          audio.addEventListener('loadeddata', () => audio.play(), false);
          audio.volume = volume;
          audio.src = sound.audio;
        }
      });
    }

    return listeners;
  }

  playSound(sound) {
    if (this.isActive) {
      const audio = new Audio();
      this.playedSound = audio;
      audio.addEventListener('loadeddata', () => audio.play(), false);
      audio.volume = this.volume;

      const soundsItem = this.sounds.find((item) => item.name === sound);
      audio.src = soundsItem.audio;
    }
  }

  stopSound() {
    this.playedSound.pause();
    this.playedSound.remove();
  }

  setActive(settings) {
    this.isActive = settings.soundIsOn;
    this.volume = settings.volume;
    document.removeEventListener('click', this.listeners);
    this.listeners = this.addListeners();
    this.init();
  }
}
