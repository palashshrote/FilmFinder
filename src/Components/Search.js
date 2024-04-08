import React from 'react'

const Search = ({ query, setQuery }) => {
    // const [query, setQuery] = useState("");

    return (
        <>
            <input
                className="search"
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {/* <button onClick={(e) => console.log(query)} className='btn-small'>Search</button> */}
        </>
    )
}

export default Search