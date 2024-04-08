import React from 'react'
import WatchedMovie from './WatchedMovie'

const WatchMovieList = ({ watched }) => {
    return (
        <ul className="list">
            {watched.map((movie) => (

                <WatchedMovie key={movie.imdbID} movie={movie} />
            ))}
        </ul>
    )
}

export default WatchMovieList