import { IMovie } from "../apis/types";
import { List } from "../components/List";
import { useLocalStorage } from "../hooks/useLocalStorage";

function Favorite() {
  const [favorite] = useLocalStorage<IMovie[]>("favorite");
  return (
    <div>
      <List items={favorite} />
    </div>
  );
}

export default Favorite;
