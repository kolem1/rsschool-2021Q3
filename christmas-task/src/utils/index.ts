export function copyObj<T>(obj: T) {
  const copy = JSON.parse(JSON.stringify(obj)) as T;
  return copy;
}
