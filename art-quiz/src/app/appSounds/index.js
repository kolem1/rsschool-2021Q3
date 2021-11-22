import SoundsLibrary from '../core/soundsLibrary';
import appSettings from '../appSettings';
import settingsObserver from '../settingsObserver';

import switchComponent from './audio/switchComponent.mp3';
import rightAnswer from './audio/rightAnswer.mp3';
import falseAnswer from './audio/falseAnswer.mp3';
import gameOver from './audio/gameOver.mp3';

const soundsSettings = appSettings.soundSettings;
const sounds = [
  {
    name: 'switchComponent',
    class: 'sound-switch-component',
    audio: switchComponent,
  },
  {
    name: 'rightAnswer',
    audio: rightAnswer,
  },
  {
    name: 'falseAnswer',
    audio: falseAnswer,
  },
  {
    name: 'gameOver',
    audio: gameOver,
  },
];

const appSounds = new SoundsLibrary(soundsSettings, sounds);

settingsObserver.subscribe(appSounds.setActive.bind(appSounds));

export default appSounds;
