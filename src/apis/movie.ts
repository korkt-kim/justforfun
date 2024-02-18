import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import axios from "../utils/axios";
import { IMovieAPIRes } from "./types";

interface IParams {
  s?: string;
  page: number;
}

const getMovies = (params: IParams) => {
  return axios.get<IMovieAPIRes>("/", { params: { ...params, type: "movie" } });
};

export const useGetMovies = (s?: string) => {
  return useInfiniteQuery<
    IMovieAPIRes,
    Error,
    InfiniteData<IMovieAPIRes>,
    string[],
    number
  >({
    queryKey: ["movies", s ?? ""],
    queryFn: async ({ pageParam }) => {
      console.log(s, pageParam);
      return getMovies({ s, page: pageParam }).then((res) => res.data);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      (lastPage.Search?.length ?? 0) < 10 ? undefined : pages.length + 1,
    enabled: true,
  });
};
