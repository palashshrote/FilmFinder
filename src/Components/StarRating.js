import React, { useState } from 'react'
import Star from './Star'

const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "14px",
}
const starContainerStyle = {
    display: "flex",
}

//1st prop "setMovieRating" is for the user to get the rating value so that it could be used somewhere else.


const StarRating = ({ defaultRating, message = [], maxRating = 5, color = "yellow", size = 48, className }) => {
    const textStyle = {
        lineHeight: "1px",
        margin: "0px",
        color,
        fontSize: `${size / 1.7}px`,
    }
    const [rating, setRating] = useState(defaultRating);

    const [tempRating, setTempRating] = useState(0);
    const handleRating = (rating) => {
        setRating(() => rating + 1);
        // setMovieRating(() => rating + 1);
    }
    return (
        <div className='className' style={containerStyle}>
            <div style={starContainerStyle}>
                {Array.from({ length: maxRating }, (_, i) => (

                    <Star
                        color={color}
                        size={size}
                        key={i}
                        onRate={handleRating}
                        full={tempRating === 0 ? rating >= i + 1 : tempRating >= i + 1}
                        hoverIn={() => setTempRating(() => i + 1)}
                        hoverOut={() => setTempRating(() => 0)}
                    />
                ))}
            </div>
            {maxRating === message.length ? <p style={textStyle}>{message[rating - 1]}</p> : <p style={textStyle}>{tempRating === 0 ? rating : tempRating}/{maxRating}</p>}

        </div>
    )
}
// StarRating.propTypes = {
//     maxRating: PropTypes.number,

//     defaultRating: PropTypes.number,
//     message: PropTypes.array,
//     color: PropTypes.string,
//     size: PropTypes.number,
//     className: PropTypes.string,

// };
export default StarRating