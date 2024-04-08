import React from 'react'
import Movie from './Movie'

const MovieList = ({ movies, onSelectMovie }) => {
    return (
        <ul className="list">

            {movies?.map((movie) => (
                <Movie onSelectMovie={onSelectMovie} key={movie.imdbID} movie={movie} />

            ))}
        </ul>
    )
}

export default MovieList