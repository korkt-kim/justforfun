import { useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue?: string) => {
  const [value, setValue] = useState<T>(
    JSON.parse(window.localStorage.getItem(key) ?? initialValue ?? "")
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};
