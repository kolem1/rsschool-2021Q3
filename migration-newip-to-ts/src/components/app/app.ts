import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import Sources from '../../interfaces/sources';

class App {
  private controller: AppController = new AppController();
  private view: AppView = new AppView();

  start() {
    const sourcesContainer = document.querySelector('.sources') as Element;
    sourcesContainer.addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
    this.controller.getSources((data: Sources) => this.view.drawSources(data));
  }
}

export default App;
