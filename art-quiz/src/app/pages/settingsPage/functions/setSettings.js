import appSettings from '../../../appSettings';
import settingsObserver from '../../../settingsObserver';
import setInputsValue from './setInputsValue';
import setActivityForBar from './setActivityForBar';

let usersSettings = {};
const currentSettings = appSettings.currentSettings || appSettings.defaultSettings;
Object.assign(usersSettings, currentSettings);

export default {
  soundIsOn() {
    usersSettings.soundIsOn = this.checked;
    setActivityForBar(this);
  },
  timeGameIsOn() {
    usersSettings.timeGameIsOn = this.checked;
    setActivityForBar(this);
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
