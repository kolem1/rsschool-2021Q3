export function copyObj<T>(obj: T): T {
  const copy = JSON.parse(JSON.stringify(obj)) as T;
  return copy;
}

export function getImgUrl(num: string, format = 'png'): string {
  return `https://raw.githubusercontent.com/kolem1/stage1-tasks/christmas-task/assets/toys/${num}.${format}`;
}
