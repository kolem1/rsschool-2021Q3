import appSettings from "../../../appSettings";
import setInputsValue from "./setInputsValue";

const usersSettings = {};
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
    usersSettings.volume = this.value;
  },
  time() {
    usersSettings.time = this.value;
  },
  save() {
    appSettings.setSettings(usersSettings);
  },
  default() {
    appSettings.reset();
    setInputsValue();
  }
}