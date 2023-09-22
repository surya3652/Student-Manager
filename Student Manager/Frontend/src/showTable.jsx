// DataDisplay.js

import React from 'react';
import "./assets/css/table.css"
function DataDisplay({ data }) {
  return (
    <div>
    <br />
    <table className="styled-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Gender</th>
          <th>year</th>
          <th>GPA</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.gender}</td>
            <td>{item.year}</td>
            <td>{item.gpa}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  );
}

export default DataDisplay;
