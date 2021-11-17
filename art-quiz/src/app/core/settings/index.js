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

  get timeSettings() {
    return {
      timeGameIsOn: this.settings.timeGameIsOn,
      time: this.settings.time,
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
