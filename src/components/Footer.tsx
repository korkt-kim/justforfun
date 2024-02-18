import { css } from "@emotion/react";
import { NavLink } from "react-router-dom";

export const FOOTER_HEIGHT = 80;

export const Footer = () => {
  return (
    <nav
      css={css`
        display: flex;
        border-top: 1px solid black;
        width: 100%;
        height: ${FOOTER_HEIGHT}px;
      `}
    >
      <NavLink
        css={{
          height: "100%",
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        to="/"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        검색
      </NavLink>
      <NavLink
        css={{
          height: "100%",
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        to="/favorite"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        즐겨찾기
      </NavLink>
    </nav>
  );
};
