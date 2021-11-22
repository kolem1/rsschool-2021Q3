import renderQuestions from './renderQuestions';
import showComponent from '../../../core/component/showComponent';

export default function afterInitScorePage() {
  renderQuestions();
  showComponent('.main');
}
