import React from 'react';
import './Card.css';

function Card ({ img }) {
    return (
        <div className='Card'>
            <img src={img} />
        </div>
    )
}

export default Card;