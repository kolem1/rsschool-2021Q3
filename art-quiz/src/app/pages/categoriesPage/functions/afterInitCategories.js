import showComponent from '../../../core/component/showComponent';
import renderCategories from './renderCategories';

export default function afterInitCategories() {
  renderCategories();
  showComponent('.main');
}
