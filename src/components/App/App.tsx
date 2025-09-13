import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import type { Movie } from "../../types/movie";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import css from "./App.module.css";
import { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import type { FetchMoviesResponse } from "../../services/movieService";



export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError } = useQuery<FetchMoviesResponse, Error>({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: Boolean(query),
  });

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    setSelectedMovie(null);
  };

  const handleOpenModal = (movie: Movie) => {
    setShowModal(true);
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  const movies = data?.results || [];
  const totalPages = data?.total_pages || 0;

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <div className={css.app}>
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {!isLoading && movies.length > 0 && (
          <div>
            <MovieGrid movies={movies} onSelect={handleOpenModal} />
            {totalPages > 1 && (
              <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={({ selected }) => setPage(selected + 1)}
                forcePage={page - 1}
                containerClassName={css.pagination}
                activeClassName={css.active}
                nextLabel="→"
                previousLabel="←"
              />
            )}
          </div>
        )}
        {showModal && selectedMovie && (
          <MovieModal onClose={closeModal} movie={selectedMovie} />
        )}
        <Toaster />
      </div>
    </>
  );
}
