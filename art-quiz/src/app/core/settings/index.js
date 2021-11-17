import loadSettings from './loadSettings';

export default class Settings {
  constructor(defaultSettings) {
    this.defaultSettings = defaultSettings;
    this.currentSettings = JSON.parse(loadSettings());
  }

  get settings() {
    return this.currentSettings || this.defaultSettings;
  }

  get soundSettings() {
    return {
      soundIsOn: this.settings.soundIsOn,
      volume: this.settings.volume,
    };
  }

  reset() {
    this.currentSettings = this.defaultSettings;
    localStorage.removeItem('kolem1-settings');
  }

  save() {
    localStorage.setItem('kolem1-settings', JSON.stringify(this.currentSettings));
  }

  setSettings(settings) {
    this.currentSettings = settings;
    this.save();
  }
}
