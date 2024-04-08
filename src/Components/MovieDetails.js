import React, { useEffect, useState } from 'react'
import StarRating from '../StarRating';
import Loader from './Loader';
const key = "86777683";
const MovieDetails = ({ getMovies, selectedId, setSelectedId }) => {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [movieRating, setMovieRating] = useState();
    const { Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre } = movie;
    const sendMovie = () => {
        const MovieBrief = {
            Poster: poster,
            Title: title,
            imdbRating: imdbRating,
            userRating: movieRating,
            runtime: runtime.split(" ")[0],
        }
        console.log(MovieBrief);
        getMovies(MovieBrief);
    }
    const onCloseMovie = () => {
        setSelectedId(null);
    }
    console.log(year, title, selectedId);
    useEffect(() => {
        async function fetchMovieDetails() {
            try {
                setIsLoading(true);
                const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`);
                console.log(res);
                if (!res.ok) {
                    throw new Error('Bad response');
                }
                const data = await res.json();
                setMovie(data);
                console.log(data);
            }
            catch (err) {
                console.log(err.message);
            }
            finally {
                setIsLoading(false);
            }
        }
        if (selectedId === null) {
            return;
        }
        fetchMovieDetails();
    }, [selectedId])

    useEffect(() => {
        function updateTitle() {
            if (!title) return;
            document.title = title;
        }
        updateTitle();
        return function () {
            document.title = "FilmFinder";
            // console.log(`Clean up function ${title}`);
        }
    }, [title])
    useEffect(() => {
        function callback(e) {
            if (e.code === "Escape") {
                onCloseMovie();
            }

        }
        document.addEventListener("keydown", callback);
        return function () {
            document.removeEventListener("keydown", callback);
        }
    }, [onCloseMovie]);
    return (
        <div className='details'>
            {isLoading ? <Loader /> :
                <>
                    <header>
                        <button onClick={onCloseMovie} className='btn-back'>&larr;</button>

                        <img src={poster} alt={`Poster of ${movie} movie`} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>
                                {released} &bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p>⭐{imdbRating} IMDb rating</p>
                        </div>
                    </header>
                    <section>
                        <div className="rating">
                            <StarRating onSetRating={setMovieRating} size={25} maxRating={10} />

                            <button onClick={sendMovie} className='btn-add'>Add to list</button>
                        </div>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>Starring: {actors}</p>
                        <p>Directed by: {director}</p>
                    </section>
                    {/* <h2>{movieRating}</h2> */}
                </>
            }
        </div>
    )
}

export default MovieDetails