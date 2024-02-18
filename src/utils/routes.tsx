import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Favorite from "../pages/Favorite";

const router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/favorite" element={<Favorite />}></Route>
    </Routes>
  );
};

export default router;
