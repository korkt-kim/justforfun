import React, { useEffect } from "react";
import { css } from "@emotion/react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

const FOOTER_HEIGHT = 80;

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(location);
    if (location.pathname === "/") {
      navigate("/search", { replace: true });
    }
  }, [location, navigate]);

  return (
    <>
      <div
        css={css`
          height: calc(100% - ${FOOTER_HEIGHT}px);
          overflow: auto;
        `}
      >
        <Outlet />
      </div>
      <nav
        css={css`
          border-top: 1px solid black;
          height: ${FOOTER_HEIGHT}px;
          display: flex;
          width: 100%;

          > * {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50%;
            height: 100%;
          }
        `}
      >
        <NavLink
          to="/search"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          검색
        </NavLink>
        <NavLink
          to="/favorite"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          즐겨찾기
        </NavLink>
      </nav>
    </>
  );
}

export default Layout;
