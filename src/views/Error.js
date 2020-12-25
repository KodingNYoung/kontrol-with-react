import React from 'react'

const Error = ({ message, title, mood }) => {
  return (
    <div className="error">
      <h1>{title}</h1>
      <span>{message}</span>
      <h3>{mood}</h3>
    </div>
  )
}

export default Error
