import React from 'react'
import './Preloader.css';
const Preloader = ({size, border, color}) => {
  const spinnerStyles = {
    width: `${size}px`,
    height: `${size}px`,
    border: `${border}px solid ${color}`,
    borderTopColor: 'transparent',
    top: `${size}px`,
    left: `${size}px`,
  };
  const spinnerGrandParentStyle = {
    width: `${2 * size}px`,
    height: `${2 * size}px`,
  }
  
  return (
    <div className="preloader">
      <div className="loadingio-spinner-rolling-51lh98h3ckv" style={spinnerGrandParentStyle}>
        <div className="ldio-a84914bx1x">
          <div className="spinner" style={spinnerStyles}></div>
        </div>
      </div>
    </div>
  )
}

export default Preloader
