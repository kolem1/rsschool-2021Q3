import Callback from '../../types/callback';
import AppLoader from './appLoader';

class AppController extends AppLoader {
  getSources<T>(callback: Callback<T>) {
    super.getResp<T>(
      {
        endpoint: 'sources',
      },
      callback
    );
  }

  getNews<T>(e: Event, callback: Callback<T>) {
    let target = e.target as Element;
    const newsContainer = e.currentTarget as Element;

    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id') as string;
        if (newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResp<T>(
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
              },
            },
            callback
          );
        }
        return;
      }
      target = target.parentNode as Element;
    }
  }
}

export default AppController;
