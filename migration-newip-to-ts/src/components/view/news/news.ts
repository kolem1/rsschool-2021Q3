import IArticle from '../../../interfaces/article';
import './news.css';

class News {
  draw(data: IArticle[]) {
    const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

    const fragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

    news.forEach((item, idx) => {
      const newsClone = newsItemTemp.content.cloneNode(true) as Element;

      const newItem = newsClone.querySelector('.news__item') as Element;

      if (idx % 2) newItem.classList.add('alt');

      const newPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement;
      const newAuthor = newsClone.querySelector('.news__meta-author') as HTMLElement;
      const newDate = newsClone.querySelector('.news__meta-date') as HTMLElement;
      const newTitle = newsClone.querySelector('.news__description-title') as HTMLElement;
      const newSource = newsClone.querySelector('.news__description-source') as HTMLElement;
      const newContent = newsClone.querySelector('.news__description-content') as HTMLElement;
      const newReadMore = newsClone.querySelector('news__read-more a') as HTMLElement;

      newPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
      newAuthor.textContent = item.author || item.source.name;
      newDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

      newTitle.textContent = item.title;
      newSource.textContent = item.source.name;
      newContent.textContent = item.description;
      newReadMore.setAttribute('href', item.url);

      fragment.append(newsClone);
    });

    const newsContainer = document.querySelector('.news') as Element;

    newsContainer.innerHTML = '';
    newsContainer.appendChild(fragment);
  }
}

export default News;
