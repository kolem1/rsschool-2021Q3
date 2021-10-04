const galleryInnerContainer = document.querySelector('.gallery__inner');

const imgLinks = [];
for(let i = 1; i <= 15; i++) {
  imgLinks.push(`assets/img/galery/galery${i}.jpg`);
}

shuffle(imgLinks).forEach((item, index) => {
  const picture = document.createElement('picture');
  picture.classList.add('gallery__img');
  const source = document.createElement('source');
  source.srcset = item.slice(0, -3) + 'webp';
  source.type = 'image/webp';
  picture.append(source);
  const img = document.createElement('img');
  img.src = item;
  img.alt = `gallery-item${index}`;
  picture.append(img);
  galleryInnerContainer.append(picture);
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}