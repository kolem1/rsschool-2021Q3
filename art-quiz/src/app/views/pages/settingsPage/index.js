import Component from '../../../core/component';
import Header from '../../components/Header';
import setInputsValue from './functions/setInputsValue';
import setSettings from './functions/setSettings';

import './styles.scss';
import template from './template.html';

const settingsPage = new Component({
  selector: '#main',
  template,
  subcomponents: [
    new Header({
      data: {
        title: 'Settings',
      },
    }),
  ],
  events: {
    'change #sound-on': setSettings.soundIsOn,
    'change #time-game-on': setSettings.timeGameIsOn,
    'input #volume-bar': setSettings.volume,
    'input #time-bar': setSettings.time,
    'click #save-button': setSettings.save,
    'click #default-button': setSettings.default,
  },
  afterInitFunction: setInputsValue,
});

export default settingsPage;
