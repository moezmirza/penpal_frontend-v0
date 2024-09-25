import React from 'react';

const Button = (props) => {
    const { onClick, isLoading, title } = props;
    return(
    <button
        type="button"
        disabled={isLoading ?? false}
        className="mx-auto mt-4 border text-white px-4 md:px-5 py-2 md:py-3 bg-fr-blue-100 rounded-xl hover:opacity-90"
        onClick={onClick}
    >
        {title}
    </button>
    )
}

export default Button;