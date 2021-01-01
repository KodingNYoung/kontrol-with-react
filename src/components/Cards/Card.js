import React from 'react'
import './Cards.css';

const Card = ({ children, classname }) => {
  return (
    <div className={`card ${classname}`}>
      {children}
    </div>
  )
}

export default Card
