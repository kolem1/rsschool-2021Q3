import ISource from '../../../interfaces/source';
import './sources.css';

class Sources {
  draw(data: ISource[]) {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

    data.forEach((item: ISource) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as Element;

      const name = sourceClone.querySelector('.source__item-name') as Element;
      name.textContent = item.name;

      const itemContainer = sourceClone.querySelector('.source__item') as Element;
      itemContainer.setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    const sourcesCOntainer = document.querySelector('.sources') as Element;
    sourcesCOntainer.append(fragment);
  }
}

export default Sources;
