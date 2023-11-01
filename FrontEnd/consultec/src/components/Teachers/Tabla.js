// Tabla.js
import React,  { useState } from 'react';
import { Link } from 'react-router-dom';

function Tabla({ data, onEstadoChange }) {

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        border: '1px solid #ddd',
      };
    
      const headerCellStyle = {
        background: '#f2f2f2',
        padding: '8px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
      };
    
      const rowStyle = {
        background: '#f2f2f2',
      };
    
      const cellStyle = {
        padding: '8px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
      };

      const noResueltoStyle = {
        backgroundColor: 'pink', // Cambia esto a tu estilo deseado
      };
   

  
     
  return (
   <table style={tableStyle}>
      <thead>
        <tr style={rowStyle}>
          <th style={headerCellStyle}>Curso</th>
          <th style={headerCellStyle}>Pregunta</th>
          <th style={headerCellStyle}>Estado</th>
          <th style={headerCellStyle}>Calificación</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
        <tr key={index} style={item.isResolved === false ? { ...rowStyle, ...noResueltoStyle } : rowStyle}>
        <td style={cellStyle}>{item.titleSubject}</td>
        <td style={cellStyle}>
              <Link to={`/question`}>{item.consulta}</Link>
        </td>
        <td style={cellStyle}>
          {item.isResolved === false ? (
            <button onClick={() => onEstadoChange(index, true)}>No resuelto</button>
          ) : (
            <button onClick={() => onEstadoChange(index, false)}>Resuelto</button>
          )}
        </td>
        <td style={cellStyle}>{item.titulo}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Tabla;
