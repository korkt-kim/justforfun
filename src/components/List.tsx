import { useEffect, useRef } from "react";
import { IMovie, IMovieAPIRes } from "../apis/types";
import { useLocalStorage } from "../hooks/useLocalStorage";

export interface ListProps<T extends IMovie> {
  items: T[];
  onReachEnd?: () => Promise<unknown>;
}

const List = <T extends IMovie>({ items, onReachEnd }: ListProps<T>) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [favorites, setFavorites] = useLocalStorage<IMovie[]>("favorites");

  const intersectionObserver = useRef(
    onReachEnd
      ? new IntersectionObserver(onReachEnd, {
          root: null,
          rootMargin: undefined,
          threshold: 0,
        })
      : null
  );

  useEffect(() => {
    if (!intersectionObserver.current || !ref.current) {
      return;
    }

    intersectionObserver.current.observe(ref.current);

    return () => intersectionObserver.current?.disconnect();
  }, []);

  return (
    <div>
      {items.map((item) => {
        return (
          <div css={{ display: "flex", height: "150px" }}>
            <div css={{ height: "100%", width: "120px" }}>
              <img
                src={item.Poster}
                alt={item.Title}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div>
              <h3>{item.Title}</h3>
              <p>{item.imdbID}</p>
              <button
                onClick={() => {
                  setFavorites((prev) => {
                    const index = prev
                      .map((item) => item.imdbID)
                      .findIndex((f) => f === item.imdbID);

                    if (index === -1) {
                      return [...favorites, item];
                    }

                    return favorites.filter((f) => f.imdbID !== item.imdbID);
                  });
                }}
              >
                {favorites.map((item) => item.imdbID).includes(item.imdbID)
                  ? "remove favorite"
                  : "add favorite"}
              </button>
            </div>
          </div>
        );
      })}
      <div ref={ref}></div>
    </div>
  );
};

export default List;
