import Component from '../../../core/component';
import Header from '../../components/header';
import renderCategories from './functions/renderCategories';

import './styles.scss';
import template from './template.html';

const categoriesPage = new Component({
  selector: '#main',
  template,
  subcomponents: [
    new Header({
      data: {
        title: 'Categories',
      },
    }),
  ],
  events: {
    '': '',
  },
  afterInitFunction: renderCategories,
});

export default categoriesPage;
