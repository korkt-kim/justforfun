import { useState } from "react";
import { useGetMovies } from "../apis/movie";
import List from "../components/List";
import { IMovie } from "../apis/types";

function Home() {
  const [inputValue, setInputValue] = useState("");
  const [s, setS] = useState("");
  const { data, fetchNextPage } = useGetMovies(s);
  console.log(s);
  return (
    <div css={{ overflow: "auto", height: "100%" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setS(inputValue);
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></input>
        <input type="submit" value="Submit" />
      </form>
      <List
        items={
          data?.pages.reduce<IMovie[]>((acc, item) => {
            acc.push(...(item.Search ?? []));
            return acc;
          }, []) ?? []
        }
        onReachEnd={() => {
          return fetchNextPage();
        }}
      />
    </div>
  );
}

export default Home;
