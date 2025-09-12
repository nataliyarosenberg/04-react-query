
import css from './MovieGrid.module.css';
import type { Movie } from "../../types/movie";


interface MovieGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}
const BASE_IMG_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  if (movies.length === 0) { 
    return null;
  }
  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li key={movie.id} onClick={() => onSelect(movie)}>
          <div className={css.card}>
            <img
              className={css.image}
              src={
                movie.poster_path
                  ? `${BASE_IMG_URL}${movie.poster_path}`
                  : "https://placehold.co/500x750?text=No+Image"
              }
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={css.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}

