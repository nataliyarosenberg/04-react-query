import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import type { Movie } from "../../types/movie";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import css from "./App.module.css";
import toast, { Toaster } from "react-hot-toast"
import Loader from '../Loader/Loader';
import ErrorMessage from "../ErrorMessage/ErrorMessage";



export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (query === "") return;
    async function getMovies() {
      try {
        setIsLoading(true);
        setIsError(false);
        const fetchedMovies = await fetchMovies(query);
        if (fetchedMovies.length === 0) {
          toast("There are no movies with this name.");
        }
        setMovies(fetchedMovies);
      } catch {
        setIsError(true);
        toast("There was an error fetching movies. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
  }, [query]);
  
  const handleSearch = async (newQuery: string) => {
    setQuery(newQuery);
    setMovies([]);
    setIsError(false);
    setSelectedMovie(null);
  };

  const handleOpenModal = (movie: Movie) => {
    setShowModal(true);
    setSelectedMovie(movie);
  }
  const closeModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  }
   
  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <div className={css.app}>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleOpenModal} />
        )}
        </div>
    {showModal && selectedMovie && (
      <MovieModal onClose={closeModal} movie={selectedMovie} />
          
  )}
  <Toaster />
    </>
    );
}