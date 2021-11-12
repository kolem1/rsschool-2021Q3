class Data {
  constructor(url) {
    this.initialData = this.fetchJson(url);

    this.formatedArray = this.formatePicture();
  }
  
  async fetchJson(url) {
    const data = await fetch(url).then((result) => result.json());

    return data
  }

  async formatePicture() {
    const data = await this.initialData

    let pictures = {};

    pictures.artists = data.filter((item, i, array) => i < Math.floor(array.length / 2));
    pictures.pictures = data.filter((item, i, array) => i >= Math.floor(array.length / 2));

    for(let category in pictures) {
      pictures[category] = pictures[category].reduce((acc, value, index) => {
        const i = Math.floor(index / 10);
        if(acc[i] === undefined) acc[i] = [];
        acc[i].push(value);
        return acc;
      }, [])
    }

    return pictures;
  }
}

const data = new Data('https://raw.githubusercontent.com/kolem1/image-data/master/images.json');

export default data;