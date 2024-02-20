import { css } from "@emotion/react";
import { IMovie } from "../apis/types";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect, useRef } from "react";

export interface ListProps<T extends IMovie> {
  items: T[];
  onReachEnd?: () => unknown;
}

export const List = <T extends IMovie>({ items, onReachEnd }: ListProps<T>) => {
  const [favorite, setFavorite] = useLocalStorage<IMovie[]>("favorite", "[]");
  const ref = useRef<HTMLDivElement>(null);
  const intersectionObserverRef = useRef(
    new IntersectionObserver(() => onReachEnd?.(), {
      root: null,
      threshold: 1,
    })
  );

  useEffect(() => {
    if (!ref.current || !intersectionObserverRef.current) {
      return;
    }

    intersectionObserverRef.current.observe(ref.current);

    return () => {
      if (!intersectionObserverRef.current) {
        return;
      }
      intersectionObserverRef.current.disconnect();
    };
  }, []);

  return (
    <div>
      {items.map((item) => {
        return (
          <div>
            <img
              alt={item.Title}
              src={item.Poster}
              css={css`
                height: 100%;
                width: 110px;
              `}
            />
            <div
              css={css`
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              `}
            >
              <h3>{item.Title}</h3>
              <p>{item.imdbID}</p>
              <button
                onClick={() => {
                  if (favorite.some((f) => f.imdbID === item.imdbID)) {
                    setFavorite(
                      favorite.filter((f) => f.imdbID !== item.imdbID)
                    );
                  } else {
                    setFavorite([...favorite, item]);
                  }
                }}
              >
                {favorite.some((f) => f.imdbID === item.imdbID)
                  ? "remove Favorite"
                  : "add Favorite"}
              </button>
            </div>
          </div>
        );
      })}
      <div ref={ref} />
    </div>
  );
};
