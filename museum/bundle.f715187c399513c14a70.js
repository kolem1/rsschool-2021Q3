(()=>{var e={505:()=>{document.querySelectorAll(".remove-label").forEach((e=>{const t=e.querySelector("input"),n=e.querySelector("label");t.oninput=function(){null!=t.value&&(n.style.visibility="hidden")},t.onblur=function(){""==t.value&&(n.style.visibility="visible")},"date"!==t.attributes.type.value&&"time"!==t.attributes.type.value||(t.onfocus=function(){n.style.visibility="hidden"})}))},288:()=>{const e=document.querySelector(".gallery__inner-container"),t=[];for(let e=1;e<=15;e++)t.push(`assets/img/galery/galery${e}.jpg`);(function(e){for(let t=e.length-1;t>0;t--){let n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}return e})(t).forEach(((t,n)=>{const o=document.createElement("img");o.classList.add("gallery__img"),o.src=t,o.alt=`gallery-item${n}`,e.append(o),setTimeout((()=>{const t=o.offsetTop-e.offsetTop;n>9&&0===t&&(o.style.marginTop="50px")}),200)}))},105:()=>{const e=document.querySelector(".modal-open"),t=document.querySelector(".modal__close"),n=document.querySelector(".modal__overlay");function o(){this.closest(".modal").classList.remove("active")}e.addEventListener("click",(function(){const e=this.dataset.modal;document.querySelector(e).classList.add("active")})),t.addEventListener("click",o),n.addEventListener("click",o)},913:()=>{console.log('\n158/150\n1 Верстка валиднаю +10\n2 Верстка семантическая - присутствую все необходимые элементы +24\n3 Соответсвие макету: +40\n  - блок <header> +5\n  - секция Welcome +5\n  - секция Visiting +5\n  - секция Explore +5\n  - секция Video +5\n  - секция Gallery +5\n  - секция Tickets +5\n  - секция Contacts +5\n  - блок <footer> +5\n4 Форма покупки билетов +22\n  - форма плавно выдвигается слева при открытии и плавно возвращается назад при закрытии. В открытом состоянии под формой есть полупрозрачный overlay, который занимает весь экран. Форма и overlay прокручиваются вместе со страницей +2\n  - форма открывается при клике по кнопке Buy Now в секции Tickets и закрывается кликом по иконке с крестиком в верхнем правом углу или кликом по overlay +2\n  - при вёрстке формы используются следующие элементы: form, input type="date", input type="time", input type="text", input type="email", input type="tel", input type="number", select +8\n  - вёрстка формы соответствует макету + 10\n5 Требования к css + 18\n  - добавлен favicon +2\n  - для построения сетки используются флексы или гриды +2\n  - при уменьшении масштаба страницы браузера вёрстка размещается по центру, а не сдвигается в сторону +2\n  - фоновый цвет каждого блока и секции тянется на всю ширину страницы +2\n  - иконки добавлены в формате .svg. SVG может быть добавлен любым способом. Обращаем внимание на формат, а не на способ добавления +2\n  - расстояние между буквами, там, где это требуется по макету, регулируется css-свойством letter-spacing +2\n  - переключаются радиокнопки в блоке Tickets, одновременно может быть выбрана только одна кнопка +2\n  - в блоке Contacts правильно указанны ссылки на почту mailto и на телефон tel +2\n  - в футере добавлены ссылки на соцсети. Круглая граница вокруг иконок соцсетей выполнена при помощи css +2\n6 Интерактивность, реализуемая через css +25\n  - плавная прокрутка по якорям +5\n  - параллакс +5\n  - при кликам по кнопке Discover the Louvre и карточкам секции Visiting открываются полноэкранные панорамы Google Street View встроенные в страницы вашего сайта при помощи iframe +5\n  - изменение стиля интерактивных элементов при наведении и клике +10\n  - интерактивность включает в себя не только изменение внешнего вида курсора, например, при помощи свойства cursor: pointer, но и другие визуальные эффекты – изменение цвета фона или шрифта, появление подчёркивания и т.д. Если в макете указаны стили при наведении и клике, для элемента указываем эти стили. Если в макете стили не указаны, реализуете их по своему усмотрению, руководствуясь общим стилем макета +4\n  - обязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике не влияющее на соседние элементы +2\n  - интерактивность при наведении карточек в секции Visiting предусматривает плавное растягивание подчёркивания заголовка карточки на всю ширину карточки Демо +2\n  - интерактивность при наведении иконок социальных сетей в футере предусматривает изменение цвета иконки и круглой границы вокруг иконки на золотистый +2\n7 Интерактивность, реализуемая через js +14\n  - можно передвигать ползунки громкости и прогресс-бар видео, при этом цвет шкалы до и после ползунка отличается и соответствует макету +2\n  - кликами по кнопкам + и - в секции Tiskets можно менять количество билетов Basic и Senior от 0 до 20 +2\n  - кнопке "Book" в форме покупки билетов добавлен ripple-эффект Демо 0\n  - при перезагрузке (обновлении) страницы картины в блоке Galery отображаются в рандомном порядке + 10\n')},862:()=>{document.querySelectorAll(".styled-range").forEach((e=>{e.addEventListener("input",(function(){const e=this.value;console.log(e),this.style.background=`linear-gradient(to right, #710707 ${e}%, #C4C4C4 ${e}%)`}))}))}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,n),i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";n(862),n(288),n(105),n(505),n(913)})()})();