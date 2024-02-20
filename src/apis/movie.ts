import axios from "../utils/axios";
import { IMovieAPIRes } from "./types";

interface IParams {
  s?: string;
  page: number;
}

export const getMovies = (params: IParams) => {
  return axios.get<IMovieAPIRes>("/", { params: { ...params, type: "movie" } });
};
