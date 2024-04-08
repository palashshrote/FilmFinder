import React, { useState } from 'react'
import Button from './Button'


const WatchedBox = ({ children }) => {
    const [isOpen2, setIsOpen2] = useState(true);


    return (
        <div className="box">
            <Button onClickFunction={() => setIsOpen2((open) => !open)}>{isOpen2 ? "–" : "+"}</Button>
            (isOpen2 && {children})
        </div>
    )
}

export default WatchedBox