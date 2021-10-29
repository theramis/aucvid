import { useState, useEffect } from "react";

export function useStickyState<T>(key: string, defaultValue?: T) {
  const [value, setValue] = useState<T>(() => {
    const stickyValue = window.localStorage.getItem(key);

    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
