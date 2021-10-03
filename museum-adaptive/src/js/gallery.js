const galleryInnerContainer = document.querySelector('.gallery__inner');

const imgLinks = [];
for(let i = 1; i <= 15; i++) {
  imgLinks.push(`assets/img/galery/galery${i}.jpg`);
}

shuffle(imgLinks).forEach((item, index) => {
  const img = document.createElement('img');
  img.classList.add('gallery__img');
  img.src = item;
  img.alt = `gallery-item${index}`;
  galleryInnerContainer.append(img);
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}