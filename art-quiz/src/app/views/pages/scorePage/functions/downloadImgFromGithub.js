export default function downloadImgFromGithub(url, name) {
  const canvas = document.createElement('canvas');

  const image = new Image();
  image.src = url;
  image.crossOrigin = 'anonymous';

  image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;

    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);

    const a = document.createElement('a');
    a.download = name;
    a.href = canvas.toDataURL();
    a.click();
    a.remove();
  };
}
