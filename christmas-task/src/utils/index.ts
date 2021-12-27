export function copyObj<T>(obj: T): T {
  const copy = JSON.parse(JSON.stringify(obj)) as T;
  return copy;
}

export function getImgUrl(num: string, folder = 'toys', ext = 'png'): string {
  return `${process.env.PUBLIC_URL}/assets/${folder}/${num}.${ext}`;
}
