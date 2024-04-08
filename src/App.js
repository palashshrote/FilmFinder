import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Main from "./Components/Main";
import Search from "./Components/Search";
import NumResults from "./Components/NumResults";
import MovieList from "./Components/MovieList";
import WatchedSummary from "./Components/WatchedSummary";
import WatchMovieList from "./Components/WatchMovieList";
import Box from "./Components/Box";
import Loader from "./Components/Loader";
import ErrorMessage from "./Components/ErrorMessage";
import MovieDetails from "./Components/MovieDetails";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];



const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
const key = "86777683";


export default function App() {
  // const [query, setQuery ] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // const tempQuery = "happy";
  const [query, setQuery] = useState("");
  const handleSelectMovieId = (val) => {
    val === selectedId ? setSelectedId(null) : setSelectedId(val)

  }
  const addWatchedMovies = (movie) => {
    console.log(movie);
    setWatched((watched) => [...watched, movie]);
  }
  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${query}`, { signal: controller.signal });
        console.log(res);

        if (!res.ok) {
          throw new Error('Failed to fetch the movies');
        }
        const data = await res.json();
        console.log(data)
        if (data.Search === undefined) {
          throw new Error('Failed to fetch');
        }
        if (data.Response === "False") {
          throw new Error("Movies not found");
        }

        setMovies(data.Search);
        // console.log(data.Search);
      }
      catch (err) {
        if (err.name !== "AbortError") {
          console.log(err.message)
          setError(err);
        }
      }
      finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    setSelectedId(null);
    fetchMovies();

    return function () {
      controller.abort();
    };

  }, [query]);

  return (
    <>
      <Navbar >
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <Main >
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && movies.length > 0 && <MovieList onSelectMovie={handleSelectMovieId} movies={movies} />}
          {error && <ErrorMessage message={error} />}

        </Box>
        <Box>
          {
            selectedId ? (<MovieDetails getMovies={addWatchedMovies} selectedId={selectedId} setSelectedId={setSelectedId} />) :
              <>
                <WatchedSummary watched={watched} />
                <WatchMovieList watched={watched} />
              </>
          }
        </Box>
      </Main >
    </>
  );
}
