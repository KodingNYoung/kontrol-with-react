import React from "react";
import "./Modals.css";

const ModalContainer = ({ children, className, closeModal }) => {
  return (
    <div className={`modal ${className}`}>
      <div className="scrim" onClick={closeModal}></div>
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default ModalContainer;
