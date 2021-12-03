import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import ISources from '../../interfaces/sources';
import IArticles from './../../interfaces/articles';

class App {
  private controller: AppController = new AppController();

  private view: AppView = new AppView();

  start() {
    const sourcesContainer = document.querySelector('.sources') as Element;
    sourcesContainer.addEventListener('click', (e) =>
      this.controller.getNews(e, (data: IArticles) => this.view.drawNews(data))
    );
    this.controller.getSources((data: ISources) => this.view.drawSources(data));
  }
}

export default App;
