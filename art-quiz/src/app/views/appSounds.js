import SoundsLibrary from "../core/soundsLibrary";
import appSettings from "./appSettings";
import settingsObserver from "./settingsObserver";

const soundsSettings = appSettings.soundSettings;
const sounds = [
  {
    class: 'sound-switch-component',
    audio: '/audio/switchComponent.mp3'
  }
]

const appSounds = new SoundsLibrary(soundsSettings, sounds);

settingsObserver.subscribe(appSounds.setActive.bind(appSounds));

export default appSounds;