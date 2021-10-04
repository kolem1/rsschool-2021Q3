const galleryInnerContainer = document.querySelector('.gallery__inner');

const imgLinks = [];
for(let i = 1; i <= 15; i++) {
  imgLinks.push(`assets/img/galery/galery${i}`);
}

shuffle(imgLinks).forEach((item, index) => {
  const picture = document.createElement('picture');
  picture.innerHTML = `
    <source srcset="${item}-178.webp" media="(max-width: 420px)" type="image/webp">
    <source srcset="${item}-178.jpg" media="(max-width: 420px)">
    <source srcset="${item}-280.webp" media="(max-width: 650px)" type="image/webp">
    <source srcset="${item}-280.jpg" media="(max-width: 650px)">
    <source srcset="${item}-360.webp" media="(max-width: 800px)" type="image/webp">
    <source srcset="${item}-360.jpg" media="(max-width: 800px)">
    <source srcset="${item}.webp" media="(max-width: 992px)" type="image/webp">
    <source srcset="${item}.jpg" media="(max-width: 992px)">
    <source srcset="${item}-360.webp" media="(max-width: 1200px)" type="image/webp">
    <source srcset="${item}-360.jpg" media="(max-width: 1200px)">
    <source srcset="${item}.webp" type="image/webp">
    <img src="${item}.jpg" loading="lazy" alt="">`
  picture.classList.add('gallery__img');
  galleryInnerContainer.append(picture);
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}