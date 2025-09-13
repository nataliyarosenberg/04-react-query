import axios from "axios";
import type { Movie } from "../types/movie";

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

export interface FetchMoviesResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

//function HTTP-query for movies
export const fetchMovies = async (
  searchValue: string,
  page: number = 1
): Promise<FetchMoviesResponse> => {
  if (!searchValue.trim()) {
    return { results: [], total_pages: 0, total_results: 0 };
  }
  const movieConfig = {
    params: {
      query: searchValue,
      include_adult: false,
      page: page,
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const res = await axios.get<FetchMoviesResponse>(
    `${BASE_URL}/search/movie`,
    movieConfig
  );
  return res.data;
};