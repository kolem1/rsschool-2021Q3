import Settings from '../core/settings';

const defaultSettings = {
  soundIsOn: false,
  timeGameIsOn: false,
  volume: 0.05,
  time: 5,
};

const appSettings = new Settings(defaultSettings);

export default appSettings;
