(()=>{"use strict";function t(t,e){return t=Math.ceil(t),e=Math.floor(e),Math.floor(Math.random()*(e-t+1))+t}function e(t,e){localStorage.setItem(e,t.value)}function n(t,e){const n=localStorage.getItem(e);n&&(t.value=n)}function o(t){let e=Math.round(t);return(e-(e%=60))/60+(e>9?":":":0")+e}function i(t){let e;return t.forEach((t=>{t.checked&&(e=t.value)})),e}const a=(t,e)=>{let n;return function(){const o=arguments,i=this;n||(t.apply(i,o),n=!0,setTimeout((()=>n=!1),e))}},s=document.querySelector(".city"),r=document.querySelector(".weather-icon"),l=document.querySelector(".temperature"),c=document.querySelector(".wind"),u=document.querySelector(".humidity"),d=document.querySelector(".weather-description");async function h(){"Minsk"!==s.value&&"Минск"!==s.value||(s.value=O.defaultCity[E]);const t=`https://api.openweathermap.org/data/2.5/weather?q=${s.value}&lang=${E}&appid=c553a031b9295379b0b1312b571019d6&units=metric`,e=await fetch(t),n=await e.json();try{r.className=`weather-icon owf owf-${n.weather[0].id}`,l.textContent=`${Math.round(n.main.temp)}°C`,c.textContent=`${O.weather.windSpeed[0][E]} ${Math.round(n.wind.speed)} ${O.weather.windSpeed[1][E]}`,u.textContent=`${O.weather.humidity[E]} ${n.main.humidity}%`,d.textContent=n.weather[0].description}catch{r.className="",l.textContent="",c.textContent="",u.textContent="",d.innerHTML=`<span class="error">${O.weather.error[E]}</span>`}}let m=t(1,20),p=[],g=0;function y(){m+=1,m>20&&(m=1),g+=1,g>p.length-1&&(g=0),f()}function v(){m-=1,m<1&&(m=20),g-=1,g<0&&(g=p.length-1),f()}async function f(){const e=await async function(){const e=function(){const t=(new Date).getHours();let e;switch(!0){case t<6:e="night";break;case t<12:e="morning";break;case t<18:e="afternoon";break;default:e="evening"}return e}(),n=String(m).padStart(2,"0");if("github"===T)return`https://raw.githubusercontent.com/kolem1/stage1-tasks/assets/images/${e}/${n}.jpg`;if("unsplash"===T){const t=`https://api.unsplash.com/photos/random?orientation=landscape&query=${e}&client_id=RezO9Ri1__P_OVBuMahPk6g6ZfoiFTcIm2rC9ZnTUWc`,n=await fetch(t);return(await n.json()).urls.raw+"&w=1920&auto=format&fm=jpg"}if("flickr"===T){let n,o={morning:"72157720069530982",afternoon:"72157720111881805",evening:"72157720111880160",night:"72157720062587146"};if(0===p.length){const i=`https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=dbec84ec8c52b616139011cf98f9c7fb&gallery_id=${o[e]}&extras=url_k&format=json&nojsoncallback=1`,a=await fetch(i);n=await a.json(),p=n.photos.photo.filter((t=>t.url_k)),g=t(0,p.length-1)}return p[g].url_k}}(),n=new Image;n.src=e,n.onload=()=>{document.body.style.backgroundImage=`url(${e})`}}const S=document.querySelector(".quote"),L=document.querySelector(".author");let w;function b(){const e=t(0,w[E].length-1);S.textContent=w[E][e].text,L.textContent=w[E][e].author}function k(){const t=document.querySelector(".todo-input"),e=document.querySelector("#option-all + label"),n=document.querySelector("#option-completed + label");t.placeholder=O.todo.placeholder[E],e.textContent=O.todo.all[E],n.textContent=O.todo.completed[E]}!function(){const t=document.querySelector(".todo-show-button"),e=document.querySelector(".todo");t.addEventListener("click",(()=>{t.classList.toggle("active"),e.classList.toggle("active")})),document.body.addEventListener("click",(function(n){n.target.closest(".todo")||n.target.closest(".todo-show-button")||(t.classList.remove("active"),e.classList.remove("active"))}))}();const q={language:"en",imgSrc:"github",hideBlocks:{time:!1,date:!1,greeting:!1,quotes:!1,weather:!1,player:!1}};let E,T,P,C={};window.addEventListener("beforeunload",(function(){localStorage.setItem("settings",JSON.stringify(C))})),window.addEventListener("load",(function(){const t=localStorage.getItem("settings");t&&(C=JSON.parse(t)),E=C.language||q.language,T=C.imgSrc||q.imgSrc,P=C.hideBlocks||q.hideBlocks,function(t,e){for(let n of t)n.value===e&&(n.checked=!0)}(x,E),function(t,e){let n=0;for(let o of t.options)o.value===e&&(n=o.index);t.selectedIndex=n}(B,T),M(),D(),k()}));const x=document.querySelectorAll(".language-input");function A(){C.language=i(x),E=C.language||q.language,U(),V(),h(),b(),M(),D(),k()}x.forEach((t=>t.addEventListener("change",A)));const B=document.querySelector(".img-src-select");B.addEventListener("change",(function(){var t;C.imgSrc=(t=B).options[t.selectedIndex].value,T=C.imgSrc||q.imgSrc,f()}));const I=document.querySelector(".language-field"),N=document.querySelector(".image-src-field");function M(){I.textContent=O.settings.language[E],N.textContent=O.settings.imgSrc[E]}const $=document.querySelector(".blocks-show-title"),H=document.querySelectorAll(".block-title"),R=document.querySelectorAll(".block-input");function D(){$.textContent=O.settings.bloksTitles.mainBlock[E],H.forEach((t=>{const e=t.dataset.block;t.textContent=O.settings.bloksTitles[e][E]}))}window.addEventListener("load",(()=>{R.forEach((t=>{!function(t){const e=t.dataset.block,n=document.querySelector(`.${e}`);let o=P[e];o&&(n.classList.add("hidden"),t.checked=!1),setTimeout((()=>n.classList.add("animate")),0),t.addEventListener("change",(function(){o?(n.classList.remove("hidden"),C.hideBlocks[e]=!1,C.hideBlocks=P,o=!1):(n.classList.add("hidden"),P[e]=!0,C.hideBlocks=P,o=!0)}))}(t)}))}));const F={timeOfDay:{en:["night","morning","afternoon","evening"],ru:["ночи","утро","день","вечер"]},greeting:{en:["Good","Good","Good","Good"],ru:["Доброй","Доброе","Добрый","Добрый"]},namePlaceholder:{en:"Enter Your Name",ru:"Введите Ваше Имя"},cityPlaceholder:{en:"Enter Your City",ru:"Введите Ваш Город"},defaultCity:{en:"Minsk",ru:"Минск"},weather:{windSpeed:[{en:"Wind speed:",ru:"Скорость ветра:"},{en:"m/s",ru:"м/с"}],humidity:{en:"Humidity:",ru:"Влажность:"},error:{en:"The city is entered incorrectly. Try again",ru:"Город введен неверно. Попробуйте снова"}},settings:{language:{en:"Language",ru:"Язык"},imgSrc:{en:"Image Source",ru:"Источник изображений"},bloksTitles:{mainBlock:{en:"Show Blocks",ru:"Показать блоки"},time:{en:"Time",ru:"Время"},date:{en:"Date",ru:"Дата"},greeting:{en:"Greeting",ru:"Приветствие"},quotes:{en:"Quote",ru:"Цитата"},weather:{en:"Weather",ru:"Погода"},player:{en:"Player",ru:"Плеер"},todo:{en:"Todo",ru:"Список дел"}}},todo:{placeholder:{en:"New Todo (Max 6)",ru:"Новый пункт (Максимум 6)"},all:{en:"All",ru:"Все"},completed:{en:"Completed",ru:"Завершенные"}}},O=F,G=document.querySelector(".date"),j=document.querySelector(".greeting-container .greeting"),_=document.querySelector(".greeting-container .name");function W(t){!function(t){const e=(new Date).toLocaleTimeString();t.innerHTML=e}(t),U(),V(),setTimeout(W,1e3,t)}function U(){const t=(new Date).toLocaleDateString(E,{weekday:"long",month:"long",day:"numeric"});G.innerHTML=t}function V(){const t=function(){const t=(new Date).getHours();let e;switch(!0){case t<6:e=F.timeOfDay[E][0];break;case t<12:e=F.timeOfDay[E][1];break;case t<18:e=F.timeOfDay[E][2];break;default:e=F.timeOfDay[E][3]}return e}(),e=function(){const t=(new Date).getHours();let e;switch(!0){case t<6:e=F.greeting[E][0];break;case t<12:e=F.greeting[E][1];break;case t<18:e=F.greeting[E][2];break;default:e=F.greeting[E][3]}return e}();_.placeholder=O.namePlaceholder[E],j.innerHTML=`${e} ${t}, `}const J=[{title:"Aqua Caelestis",src:"./assets/sounds/AquaCaelestis.mp3",duration:"00:39"},{title:"Ennio Morricone",src:"./assets/sounds/EnnioMorricone.mp3",duration:"01:37"},{title:"River Flows In You",src:"./assets/sounds/RiverFlowsInYou.mp3",duration:"01:37"},{title:"Summer Wind",src:"./assets/sounds/SummerWind.mp3",duration:"01:50"}];!function(){const t=document.querySelector(".player-button"),e=document.querySelector(".player");t.addEventListener("click",(()=>{t.classList.toggle("active"),e.classList.toggle("active")})),document.body.addEventListener("click",(function(n){n.target.closest(".player")||n.target.closest(".player-button")||(t.classList.remove("active"),e.classList.remove("active"))}))}();document.querySelectorAll(".styled-range").forEach((t=>{t.addEventListener("input",(function(){const t=this.value;this.style.background=`linear-gradient(to right, #2196F3 ${t}%, #C4C4C4 ${t}%)`}))})),function(){const t=document.querySelector(".settings-button"),e=document.querySelector(".settings-wrapper");t.addEventListener("click",(()=>{t.classList.toggle("active"),e.classList.toggle("active")})),document.body.addEventListener("click",(function(n){n.target.closest(".settings-wrapper")||n.target.closest(".settings-button")||(t.classList.remove("active"),e.classList.remove("active"))}))}(),function(t){const o=document.querySelector(".time");window.addEventListener("load",W.bind(null,o)),window.addEventListener("beforeunload",e.bind(null,_,"name")),window.addEventListener("load",n.bind(null,_,"name"))}(),function(){window.addEventListener("load",f);const t=document.querySelector(".slide-next"),e=document.querySelector(".slide-prev");t.addEventListener("click",a(y,1500)),e.addEventListener("click",a(v,1500))}(),window.addEventListener("beforeunload",e.bind(null,s,"city")),window.addEventListener("load",(()=>{localStorage.getItem("city")?n(s,"city"):s.value=O.defaultCity[E],h(),s.placeholder=O.cityPlaceholder[E]})),s.addEventListener("change",h),async function(){const t=document.querySelector(".change-quote"),e=await fetch("./assets/quotes.json");w=await e.json(),window.addEventListener("load",b),t.addEventListener("click",b)}(),new class{constructor(t){this.player=document.querySelector(t),this.init()}init(){this.playBtn=this.player.querySelector(".play"),this.progressRange=this.player.querySelector(".player-progress-range"),this.playNextBtn=this.player.querySelector(".play-next"),this.playPrevBtn=this.player.querySelector(".play-prev"),this.playListContainer=this.player.querySelector(".play-list"),this.trackTitle=this.player.querySelector(".player-title"),this.volumeRange=this.player.querySelector(".player-volume-range"),this.volumeButton=this.player.querySelector(".player-volume"),this.currentTimeField=this.player.querySelector(".current-time"),this.durationField=this.player.querySelector(".duration"),this.playNum=0,this.trackTitle.textContent=J[this.playNum].title,this.audio=new Audio,this.audio.src=J[this.playNum].src,this.createPlayList(J),this.playListItems=this.player.querySelectorAll(".play-item"),this.playListButtons=this.player.querySelectorAll(".play-item .play"),this.playNextBtn.addEventListener("click",this.playNext.bind(this)),this.playPrevBtn.addEventListener("click",this.playPrev.bind(this)),this.playBtn.addEventListener("click",this.toggleAudio.bind(this)),this.playListItems.forEach(((t,e)=>t.addEventListener("click",this.playThis.bind(this,e)))),this.audio.volume=parseInt(this.volumeRange.value)/100,this.volumeRange.addEventListener("input",this.handleVolumeUpdate.bind(this)),this.audio.addEventListener("volumechange",this.updateMuteButton.bind(this)),this.volumeButton.addEventListener("click",this.changeMuteAuido.bind(this)),this.audio.addEventListener("play",this.updatePlayElements.bind(this)),this.audio.addEventListener("pause",this.updatePlayElements.bind(this)),this.audio.addEventListener("ended",this.playNext.bind(this)),this.audio.addEventListener("timeupdate",this.changeProgress.bind(this)),this.progressRange.addEventListener("input",this.setProgress.bind(this)),this.audio.onloadeddata=()=>{this.currentTimeField.textContent="0:00",this.durationField.textContent=o(this.audio.duration)},this.audio.addEventListener("timeupdate",this.changeTime.bind(this))}toggleAudio(){this.audio.paused?this.audio.play():this.audio.pause()}updatePlayElements(){this.audio.paused?(this.playBtn.classList.remove("pause"),this.playListButtons[this.playNum].classList.remove("pause")):(this.playBtn.classList.add("pause"),this.playListItems.forEach((t=>t.classList.remove("item-active"))),this.playListItems[this.playNum].classList.add("item-active"),this.playListButtons.forEach((t=>t.classList.remove("pause"))),this.playListButtons[this.playNum].classList.add("pause"))}playNext(){this.playNum++,this.playNum>J.length-1&&(this.playNum=0),this.audio.src=J[this.playNum].src,this.trackTitle.textContent=J[this.playNum].title,this.audio.currentTime=0,this.toggleAudio()}playPrev(){this.playNum--,this.playNum<0&&(this.playNum=J.length-1),this.audio.src=J[this.playNum].src,this.trackTitle.textContent=J[this.playNum].title,this.audio.currentTime=0,this.toggleAudio()}playThis(t){this.playNum!==t&&(this.playNum=t,this.audio.src=J[this.playNum].src,this.trackTitle.textContent=J[this.playNum].title,this.audio.currentTime=0),this.toggleAudio()}changeProgress(){const t=this.audio.duration||1,e=this.audio.currentTime/t*100;this.progressRange.value=e,this.progressRange.style.background=`linear-gradient(to right, #2196F3 ${e}%, #C4C4C4 ${e}%)`}setProgress(){this.audio.currentTime=this.progressRange.value/100*this.audio.duration}changeTime(){this.currentTimeField.textContent=o(this.audio.currentTime),this.durationField.textContent=o(this.audio.duration)}handleVolumeUpdate(){this.audio.volume=parseInt(this.volumeRange.value)/100}updateMuteButton(){0==this.audio.volume?this.replaceSvgHref(this.volumeButton,"volume-mute"):this.audio.volume<=.25?this.replaceSvgHref(this.volumeButton,"volume-down"):this.audio.volume<=.75?this.replaceSvgHref(this.volumeButton,"volume-middle"):this.replaceSvgHref(this.volumeButton,"volume-up")}changeMuteAuido(){0==this.audio.volume?(this.replaceSvgHref(this.volumeButton,"volume-mute"),this.audio.volume=parseInt(this.volumeRange.value)/100):(this.replaceSvgHref(this.volumeButton,"volume-up"),this.audio.volume=0)}createPlayList(t){t.forEach((t=>{const e=document.createElement("li"),n=document.createElement("button");e.classList.add("play-item"),e.textContent=t.title,n.classList.add("player-icon","play"),e.prepend(n),this.playListContainer.append(e)}))}replaceSvgHref(t,e){const n=t.querySelector("use"),o=n.href.baseVal;n.href.baseVal=o.match(/.+\.svg#/)+e}}(".player"),new class{constructor(){this.todo=document.querySelector(".todo"),this.init()}init(){this.input=this.todo.querySelector(".todo-input"),this.list=this.todo.querySelector(".todos"),this.options=this.todo.querySelectorAll("input[name=todo-option]"),this.loadTodos(),this.input.addEventListener("keypress",(t=>{13==t.which&&(this.createTodo(),this.save())})),this.options.forEach((t=>t.addEventListener("change",this.updateTodos))),this.list.addEventListener("click",this.onClickTodo),document.addEventListener("click",this.action.bind(this))}updateTodos(){const t=i(document.querySelectorAll("input[name=todo-option]"));document.querySelector(".todos").dataset.todoOption=t,document.querySelector(".todo-input").disabled="all"!==t}createTodo(){if(6===document.querySelectorAll(".todo-item").length)return;const t=document.createElement("li");t.classList.add("todo-item"),t.dataset.todoState="active",t.innerHTML=`\n      <input class="todo-checkbox todo-action" type="checkbox" data-todo-action="complete">\n      <span class="todo-task">${this.input.value}</span>\n      <span class="todo-action todo-action-delete" data-todo-action="deleted"></span>`,this.list.appendChild(t),this.input.value=""}loadTodos(){const t=localStorage.getItem("todos");t&&(this.list.innerHTML=t),document.querySelectorAll(".todo-item[data-todo-state=completed]").forEach((t=>{t.querySelector(".todo-checkbox").checked=!0}))}save(){localStorage.setItem("todos",this.list.innerHTML)}action(t){const e=t.target;if(e.classList.contains("todo-action")){const t=e.dataset.todoAction,n=e.closest(".todo-item");"deleted"===t?n.remove():"active"===n.dataset.todoState?n.dataset.todoState="completed":n.dataset.todoState="active",this.save()}}},console.log('\n  157/160\n\n  Невыполненный пункт - укзание тегов для API изображений -3 балла\n\n  1. Часы и календарь +15\n    - время выводится в 24-часовом формате, например: 21:01:00 +5\n    - время обновляется каждую секунду - часы идут. Когда меняется одна из цифр, остальные при этом не меняют своё положение на странице (время не дёргается) +5\n    - выводится день недели, число, месяц, например: "Воскресенье, 16 мая" / "Sunday, May 16" / "Нядзеля, 16 траўня" +5\n    - Язык и формат вывода даты определяется языком приложения.\n    - при изменении дня недели, даты, месяца эти данные меняются в приложении (в ходе кросс-чека этот пункт не проверяется)\n  2. Приветствие +10\n    - текст приветствия меняется в зависимости от времени суток (утро, день, вечер, ночь) +5\n    - с 6:00 до 11:59 - Good morning / Доброе утро / Добрай раніцы\n    - с 12:00 до 17:59 - Good afternoon / Добрый день / Добры дзень\n    - с 18:00 до 23:59 - Good evening / Добрый вечер / Добры вечар\n    - с 00:00 до 5:59 - Good night / Доброй/Спокойной ночи / Дабранач\n    - при изменении времени суток, если в это время приложение открыто, меняется текст приветствия (в ходе кросс-чека этот пункт не проверяется)\n    - пользователь может ввести своё имя. При перезагрузке страницы приложения имя пользователя сохраняется, данные о нём хранятся в local storage +5\n  3. Смена фонового изображения +20\n    - При загрузке или перезагрузке приложения фоновое изображение выбирается из расположенной на GitHub коллекции изображений.\n    - Репозиторий с изображениями необходимо форкнуть, и использовать изображения форкнутого репозитория, а не школьного.\n    - Сами изображения желательно оптимизировать, например, конвертировать в формат WebP с целью уменьшения веса и увеличения скорости загрузки.\n    - Также можно использовать свою собственную коллекцию изображений.\n    - Скачать картинки на компьютер и использовать локальные файлы нельзя.\n    - ссылка на фоновое изображение формируется с учётом времени суток и случайного номера изображения (от 01 до 20) +5\n    изображения можно перелистывать кликами по стрелкам, расположенным по бокам экрана.\n      - изображения перелистываются последовательно - после 18 изображения идёт 19 (клик по правой стрелке), перед 18 изображением идёт 17 (клик по левой стрелке) +5\n      - изображения перелистываются по кругу: после двадцатого изображения идёт первое (клик по правой стрелке), перед 1 изображением идёт 20 (клик по левой стрелке) +5\n      - при смене слайдов важно обеспечить плавную смену фоновых изображений. Не должно быть состояний, когда пользователь видит частично загрузившееся изображение или страницу без фонового изображения. Плавную смену фоновых изображений не проверяем: 1) при загрузке и перезагрузке страницы 2) при открытой консоли браузера 3) при слишком частых кликах по стрелкам для смены изображения +5\n  4. Виджет погоды +15\n    - город по умолчанию - Минск, пока пользователь не ввёл другой город\n    - при перезагрузке страницы приложения указанный пользователем город сохраняется, данные о нём хранятся в local storage +5\n    - для указанного пользователем населённого пункта выводятся данные о погоде, если их возвращает API\n    - данные о погоде включают в себя: иконку погоды, описание погоды, температуру в °C, скорость ветра в м/с, относительную влажность воздуха в %. Числовые параметры погоды округляются до целых чисел +5\n    - выводится уведомление об ошибке при вводе некорректных значений, для которых API не возвращает погоду (пустая строка или бессмысленный набор символов) +5\n  5. Виджет цитата дня +10\n    - при загрузке страницы приложения отображается рандомная цитата и её автор +5\n    - при перезагрузке страницы цитата обновляется (заменяется на другую). Есть кнопка, при клике по которой цитата обновляется (заменяется на другую) +5\n  6. Аудиоплеер +15\n    - при клике по кнопке Play/Pause проигрывается первый трек из блока play-list, иконка кнопки меняется на Pause +3\n    - при клике по кнопке Play/Pause во время проигрывания трека, останавливается проигрывание трека, иконка кнопки меняется на Play +3\n    - треки можно пролистывать кнопками Play-next и Play-prev\n    - треки пролистываются по кругу - после последнего идёт первый (клик по кнопке Play-next), перед первым - последний (клик по кнопке Play-prev) +3\n    - трек, который в данный момент проигрывается, в блоке Play-list выделяется стилем +3\n    - после окончания проигрывания первого трека, автоматически запускается проигрывание следующего. Треки проигрываются по кругу: после последнего снова проигрывается первый. +3\n    - Для удобства проверки треки возьмите небольшой продолжительности. Обрезать треки можно здесь: https://mp3cut.net/ru/\n    - плейлист генерируется средствами JavaScript (в ходе кросс-чека этот пункт не проверяется)\n  7. Продвинутый аудиоплеер (реализуется без использования библиотек) +20\n    - примерные внешний вид и функциональность плеера https://howlerplayer.github.io/\n    - добавлен прогресс-бар в котором отображается прогресс проигрывания +3\n    - при перемещении ползунка прогресс-бара меняется текущее время воспроизведения трека +3\n    - над прогресс-баром отображается название трека +3\n    - отображается текущее и общее время воспроизведения трека +3\n    - есть кнопка звука при клике по которой можно включить/отключить звук +2\n    - добавлен регулятор громкости, при перемещении ползунка регулятора громкости меняется громкость проигрывания звука +3\n    - можно запустить и остановить проигрывания трека кликом по кнопке Play/Pause рядом с ним в плейлисте +3\n  8. Перевод приложения на два языка (en/ru или en/be) +15\n    - переводится язык и меняется формат отображения даты +3\n    - переводится приветствие и placeholder +3\n    - переводится прогноз погоды в т.ч описание погоды (OpenWeatherMap API предоставляет такую возможность) и город по умолчанию +3\n    - переводится цитата дня (используйте подходящий для этой цели API, возвращающий цитаты на нужном языке или создайте с этой целью - JSON-файл с цитатами на двух языках) +3\n    - переводятся настройки приложения. При переключении языка приложения в настройках, язык настроек тоже меняется +3\n  9. Получение фонового изображения от API +10\n    - в качестве источника изображений может использоваться Unsplash API +5\n    - в качестве источника изображений может использоваться Flickr API +5\n  10. Настройки приложения +20\n    - в настройках приложения можно указать язык приложения (en/ru или en/be) +3\n    - в настройках приложения можно указать источник получения фото для фонового изображения: коллекция изображений GitHub, Unsplash API, Flickr API +3\n    - в настройках приложения можно скрыть/отобразить любой из блоков, которые находятся на странице: время, дата, приветствие, цитата дня, прогноз погоды, аудиоплеер, список дел/список ссылок/ваш собственный дополнительный функционал +3\n    - скрытие и отображение блоков происходит плавно, не влияя на другие элементы, которые находятся на странице, или плавно смещая их +3\n    - настройки приложения сохраняются при перезагрузке страницы +5\n  11. Дополнительный функционал на выбор +10\n    ToDo List - список дел +10\n  ')})();