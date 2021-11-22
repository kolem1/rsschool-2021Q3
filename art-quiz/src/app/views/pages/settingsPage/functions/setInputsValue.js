import showComponent from '../../../../core/component/showComponent';
import appSettings from '../../../appSettings';
import styleRanges from '../../../../core/tools/styleRanges';
import setActivityForBar from './setActivityForBar';

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

  const timeDisplay = timeBar.nextElementSibling;
  timeDisplay.innerHTML = timeBar.value;
  timeBar.addEventListener('input', () => {
    timeDisplay.innerHTML = timeBar.value;
  });

  setActivityForBar(soundOnInput);
  setActivityForBar(timeGameOnInput);

  styleRanges([volumeBar, timeBar]);

  showComponent('.main');
}
