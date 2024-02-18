export interface IMovie {
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
  imdbID: string;
}

export interface IMovieAPIRes {
  Response: string;
  Search?: IMovie[];
  totalResults?: string;
  Error?: string;
}
