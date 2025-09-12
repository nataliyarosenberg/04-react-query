import axios from "axios";
import type { Movie } from "../types/movie";

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

interface FetchMoviesResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

//function HTTP-query for movies
export const fetchMovies = async (searchValue: string): Promise<Movie[]> => {
  if (!searchValue.trim()) {
    return [];
  }
  const movieConfig = {
    params: {
      query: searchValue,
      include_adult: false,
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  };
 
  const res = await axios.get<FetchMoviesResponse>(
    `${BASE_URL}/search/movie`, movieConfig
  );
  return res.data.results;
};