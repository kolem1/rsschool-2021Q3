export default class Settings {
  constructor(defaultSettings) {
    this.defaultSettings = defaultSettings;
    this.currentSettings = JSON.parse(this.load());
  }

  get settings() {
    return this.currentSettings || this.defaultSettings;
  }

  init() {
    this.soundIsOn = this.currentSettings.soundIsOn || this.defaultSettings.soundIsOn;
    this.timeGameIsOn = this.currentSettings.timeGameIsOn || this.defaultSettings.timeGameIsOn;

    this.volume = this.currentSettings.volume || this.defaultSettings.volume;
    this.time = this.currentSettings.time || this.defaultSettings.time;
  }

  reset() {
    this.currentSettings = this.defaultSettings;
    this.init();
    localStorage.removeItem('kolem1-settings');
  }

  save(settings) {
    localStorage.setItem('kolem1-settings', JSON.stringify(settings));
  }

  load() {
    return localStorage.getItem('kolem1-settings');
  }

  setSettings(settings) {
    this.currentSettings = settings;
    this.init();
    this.save(settings);
  }
}