export default class Settings {
  constructor(defaultSettings) {
    this.defaultSettings = defaultSettings;
    this.currentSettings = JSON.parse(this.load());
  }

  get settings() {
    return this.currentSettings || this.defaultSettings;
  }

  get soundSettings() {
    return {
      soundIsOn: this.settings.soundIsOn,
      volume: this.settings.volume,
    }
  }

  reset() {
    this.currentSettings = this.defaultSettings;
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
    this.save(settings);
  }
}