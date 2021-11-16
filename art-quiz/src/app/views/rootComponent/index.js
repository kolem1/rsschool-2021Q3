import Component from '../../core/component';
import appSounds from '../appSounds';

import './styles.scss';
import template from './template.html';

const rootComponent = new Component({
  selector: '#root',
  template,
  afterInitFunction: appSounds.init.bind(appSounds),
});

export default rootComponent;
