export function copyObj<T>(obj: T): T {
  const copy = JSON.parse(JSON.stringify(obj)) as T;
  return copy;
}
