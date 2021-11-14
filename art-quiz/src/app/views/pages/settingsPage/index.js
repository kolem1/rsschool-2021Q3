import Component from '../../../core/component';
import Header from '../../components/Header';

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
});

export default settingsPage;
