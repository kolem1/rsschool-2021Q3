import startNewGame from './startNewGame';
import setMaxSizeForWrapper from '../../../../core/tools/setMaxSizeForWrapper';
import showComponent from '../../../../core/component/showComponent';

export default function afterGamePageRender() {
  startNewGame();
  setMaxSizeForWrapper();
  window.addEventListener('resize', setMaxSizeForWrapper);
  showComponent('.main');
}
