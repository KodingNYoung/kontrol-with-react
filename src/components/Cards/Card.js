import React from 'react'
import './Cards.css';

const Card = ({ children }) => {
  return (
    <div className="card">
      {children}
    </div>
  )
}

export default Card
