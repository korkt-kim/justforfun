import { Routes, Route } from "react-router-dom";
import Search from "../pages/Search";
import Layout from "../layouts/Layout";
import Favorite from "../pages/Favorite";

const router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="search" element={<Search />} />
        <Route path="favorite" element={<Favorite />} />
      </Route>
    </Routes>
  );
};

export default router;
