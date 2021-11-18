import data from '../../../components/data';
import startNewGame from './startNewGame';
import setMaxSizeForWrapper from '../../../../core/tools/setMaxSizeForWrapper';

export default function afterGamePageRender() {
  startNewGame();
  setMaxSizeForWrapper();
  window.addEventListener('resize', setMaxSizeForWrapper);
}