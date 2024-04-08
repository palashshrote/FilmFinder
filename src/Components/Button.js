import React from 'react'

const Button = ({ children, onClickFunction }) => {
    return (
        <button
            className="btn-toggle"
            onClick={onClickFunction}>{children}
        </button>
    )
}

export default Button