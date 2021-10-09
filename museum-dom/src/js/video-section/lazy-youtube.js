const tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
tag.defer = 'defer';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

const youtubePlayers = [];

function findVideos() {
  let videos = document.querySelectorAll('.youtube-video');

  for (let i = 0; i < videos.length; i++) {
      setupVideo(videos[i]);
  }

  return videos;
}

function setupVideo(video) {
  let link = video.querySelector('.youtube-video__link');
  let media = video.querySelector('.youtube-video__media');
  let button = video.querySelector('.youtube-video__button');
  let id = parseMediaURL(media);

  video.addEventListener('click', () => {
      createIframe(id, link.dataset.id, video);

      link.remove();
      button.remove();
  });

  link.removeAttribute('href');
  video.classList.add('youtube-video--enabled');
}

function parseMediaURL(media) {
  let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/.+\.jpg/i;
  let url = media.src;
  let match = url.match(regexp);

  return match[1];
}

function createIframe(videoId, containerID, parent) {
  let container = document.createElement('div');
  container.id = containerID;
  container.className = 'youtube-video__media';
  parent.append(container)
  let player = new YT.Player(container.id, {
    videoId: videoId,
    playerVars: {
      autoplay: 1
    },
    // events: {
    //   'onStateChange': pauseYoutubes
    // }
  });

  youtubePlayers.push(player);
}

const youtubeVideos = findVideos();

export { youtubeVideos, youtubePlayers };