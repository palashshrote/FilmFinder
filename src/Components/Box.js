import React, { useState } from 'react'
import Button from './Button';

const Box = ({ children }) => {
    const [isOpen1, setIsOpen1] = useState(true);
    return (
        <div className="box">

            <Button onClickFunction={() => setIsOpen1((open) => !open)}>{isOpen1 ? "–" : "+"}</Button>
            {isOpen1 && children}
        </div>
    )
}

export default Box