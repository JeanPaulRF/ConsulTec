// Tabla.js
import React,  { useState } from 'react';

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
        <tr key={index} style={item.Estado === 'No resuelto' ? { ...rowStyle, ...noResueltoStyle } : rowStyle}>
        <td style={cellStyle}>{item.Curso}</td>
        <td style={cellStyle}>{item.Pregunta}</td>
        <td style={cellStyle}>
          {item.Estado === 'No resuelto' ? (
            <button onClick={() => onEstadoChange(index, 'Resuelto')}>No resuelto</button>
          ) : (
            <button onClick={() => onEstadoChange(index, 'No resuelto')}>Resuelto</button>
          )}
        </td>
        <td style={cellStyle}>{item.Calificación}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Tabla;
