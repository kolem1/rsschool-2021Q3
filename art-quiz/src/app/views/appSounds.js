import SoundsLibrary from '../core/soundsLibrary';
import appSettings from './appSettings';
import settingsObserver from './settingsObserver';

const soundsSettings = appSettings.soundSettings;
const sounds = [
  {
    name: 'switchComponent',
    class: 'sound-switch-component',
    audio: '/audio/switchComponent.mp3',
  },
  {
    name: 'rightAnswer',
    audio: '/audio/rightAnswer.mp3'
  },
  {
    name: 'falseAnswer',
    audio: '/audio/falseAnswer.mp3'
  },
  {
    name: 'gameOver',
    audio: '/audio/gameOver.mp3'
  },
];

const appSounds = new SoundsLibrary(soundsSettings, sounds);

settingsObserver.subscribe(appSounds.setActive.bind(appSounds));

export default appSounds;
