import Component from '../../../core/component';
import hideComponent from '../../../core/component/hideComponent';
import Header from '../../components/Header';
import setInputsValue from './functions/setInputsValue';
import setSettings from './functions/setSettings';
import setActivityForBar from './functions/setActivityForBar';

import './styles.scss';
import template from './template.html';

const settingsPage = new Component({
  selector: '#main',
  template,
  subcomponents: [
    new Header({
      data: {
        title: 'Настройки',
      },
    }),
  ],
  events: {
    'change #sound-on': setSettings.soundIsOn,
    'change #time-game-on': setSettings.timeGameIsOn,
    'change #sound-on': setActivityForBar,
    'change #time-game-on': setActivityForBar,
    'input #volume-bar': setSettings.volume,
    'input #time-bar': setSettings.time,
    'click #save-button': setSettings.save,
    'click #default-button': setSettings.default,
  },
  beforeInitFunction: hideComponent.bind(null, '.main'),
  afterInitFunction: setInputsValue,
});

export default settingsPage;
