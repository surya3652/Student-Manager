import React from 'react';
import "./assets/css/analyze.css"
const Notification = ({ type, message, onClose }) => {
  return (
    <div className={`notification ${type}`}>
      <p>{message}</p>
      <button onClick={onClose}>&times;</button>
    </div>
  );
};

export default Notification;
