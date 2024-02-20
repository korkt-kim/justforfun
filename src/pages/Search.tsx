import { useCallback, useEffect, useState } from "react";
import { getMovies } from "../apis/movie";
import { IMovie } from "../apis/types";
import { List } from "../components/List";

function Search() {
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    getMovies({ s: searchValue, page: page }).then((res) => {
      if (!res.data.Search) {
        return;
      }
      setMovies((prev) => [...prev, ...(res.data.Search ?? [])]);
    });
  }, [searchValue, page]);

  const onReachEnd = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setMovies([]);
          setSearchValue(inputValue);
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
      <List items={movies} onReachEnd={onReachEnd} />
    </div>
  );
}

export default Search;
