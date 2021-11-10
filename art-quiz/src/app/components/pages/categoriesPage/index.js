import Component from 'core/component';
import Header from '../../common/header';

import './styles.scss';
import template from './template.html';

const categoriesPage = new Component({
  selector: '#main',
  template,
  subcomponents: [
    new Header({
      data: {
        title: 'Categories'
      }
    })
  ],
});

export default categoriesPage;