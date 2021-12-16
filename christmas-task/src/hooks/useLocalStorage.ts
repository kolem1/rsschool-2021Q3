import { useState, useEffect } from 'react';

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [value: T, setValue: React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : initialValue;
  });

  useEffect(() => {
    const item = JSON.stringify(value);
    window.localStorage.setItem(key, item);
  }, [value, key]);

  return [value, setValue];
}
