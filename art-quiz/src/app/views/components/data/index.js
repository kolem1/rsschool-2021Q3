import fetchJson from './functions/fetchJson';

class Data {
  constructor(url) {
    this.initialData = fetchJson(url);

    this.formatedArray = this.formatePicture();
  }

  async formatePicture() {
    const data = await this.initialData;

    const pictures = {};

    pictures.artists = data.filter((item, i, array) => i < Math.floor(array.length / 2));
    pictures.pictures = data.filter((item, i, array) => i >= Math.floor(array.length / 2));

    Object.keys(pictures).forEach((category) => {
      pictures[category] = pictures[category].reduce((acc, value, index) => {
        const i = Math.floor(index / 10);
        if (acc[i] === undefined) acc[i] = [];
        acc[i].push(value);
        return acc;
      }, []);
    });

    return pictures;
  }
}

const data = new Data('https://raw.githubusercontent.com/kolem1/image-data/master/images.json');

export default data;
