import { useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string) => {
  const [state, setState] = useState<T>(
    JSON.parse(window.localStorage.getItem(key) ?? "[]")
  );

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
};
