import { IMovie } from "../apis/types";
import List from "../components/List";
import { useLocalStorage } from "../hooks/useLocalStorage";

function Favorite() {
  const [favorites] = useLocalStorage<IMovie[]>("favorites");

  return (
    <div>
      <List items={favorites} />
    </div>
  );
}

export default Favorite;
