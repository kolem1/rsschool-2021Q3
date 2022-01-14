export function getRandomColor(): string {
  const randonNum = () =>
    Math.floor(Math.random() * 255)
      .toString(16)
      .padStart(2, '0');

  return `#${randonNum()}${randonNum()}${randonNum()}`;
}
