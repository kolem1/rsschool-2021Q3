import showComponent from '../../../../core/component/showComponent';
import appSettings from '../../../appSettings';

export default function setInputsValue() {
  const { settings } = appSettings;

  const soundOnInput = document.querySelector('#sound-on');
  const timeGameOnInput = document.querySelector('#time-game-on');
  const volumeBar = document.querySelector('#volume-bar');
  const timeBar = document.querySelector('#time-bar');

  soundOnInput.checked = settings.soundIsOn;
  timeGameOnInput.checked = settings.timeGameIsOn;
  volumeBar.value = settings.volume * 100;
  timeBar.value = settings.time;

  showComponent('.main');
}
