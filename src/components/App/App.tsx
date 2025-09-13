import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import type { Movie } from "../../types/movie";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import css from "./App.module.css";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import type { FetchMoviesResponse } from "../../services/movieService";



export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError,isSuccess, isFetching } = useQuery<FetchMoviesResponse, Error>({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: Boolean(query),
    placeholderData: keepPreviousData,
  });

useEffect(() => {
  if (isSuccess && query && data?.results.length === 0) {
    toast("There are no movies with this name.");
  }
}, [isSuccess, query, data]);
  
  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    setSelectedMovie(null);
  };

  const handleOpenModal = (movie: Movie) => {
    
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    
    setSelectedMovie(null);
  };

  const movies = data?.results || [];
  const totalPages = data?.total_pages || 0;

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <div className={css.app}>
        {(isLoading || isFetching) && <Loader />}
        {isError && <ErrorMessage />}
        {!isFetching && movies.length > 0 && (
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
        {selectedMovie && (
          <MovieModal onClose={closeModal} movie={selectedMovie} />
        )}
        <Toaster />
      </div>
    </>
  );
}
