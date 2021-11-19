import Component from '../../../core/component';
import Header from '../../components/Header';
import hideComponent from '../../../core/component/hideComponent';
import afterInitCategories from './functions/afterInitCategories';

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
  beforeInitFunction: hideComponent.bind(null, '.main'),
  afterInitFunction: afterInitCategories,
});

export default categoriesPage;
