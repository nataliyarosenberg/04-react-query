import { useEffect } from "react";
import type { Movie } from "../../types/movie";
import css from './MovieModal.module.css';
import { createPortal } from "react-dom";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const BASE_IMG_URL = "https://image.tmdb.org/t/p/";

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const backdropImageUrl = movie.backdrop_path
    ? `${BASE_IMG_URL}w780${movie.backdrop_path}`
    : null;

  const posterImageUrl = movie.poster_path
    ? `${BASE_IMG_URL}w500${movie.poster_path}`
    : null;

  const imageUrl =
    backdropImageUrl ||
    posterImageUrl ||
    "https://placehold.co/1280x720?text=No+Image";

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        <img src={imageUrl} alt={movie.title} className="image" />
        <div className="content">
          <h2 className="title">{movie.title}</h2>
          <p className="overview">{movie.overview}</p>
          <p className="releaseDate">
            <strong>Release date:</strong> {movie.release_date}
          </p>
          <p className="rating">
            <strong>Rating: </strong> {movie.vote_average.toFixed(1)}/10
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
