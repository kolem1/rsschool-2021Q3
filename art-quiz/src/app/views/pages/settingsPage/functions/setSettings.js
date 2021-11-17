import appSettings from '../../../appSettings';
import settingsObserver from '../../../settingsObserver';
import setInputsValue from './setInputsValue';

let usersSettings = {};
const currentSettings = appSettings.currentSettings || appSettings.defaultSettings;
Object.assign(usersSettings, currentSettings);

export default {
  soundIsOn() {
    usersSettings.soundIsOn = this.checked;
  },
  timeGameIsOn() {
    usersSettings.timeGameIsOn = this.checked;
  },
  volume() {
    usersSettings.volume = this.value / 100;
  },
  time() {
    usersSettings.time = this.value;
  },
  save() {
    appSettings.setSettings(usersSettings);
    settingsObserver.dispatch(usersSettings);
  },
  default() {
    appSettings.reset();
    usersSettings = appSettings.defaultSettings;
    setInputsValue();
  },
};
