import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: '5fa8b00ed491453f9000b022c75faec9', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
