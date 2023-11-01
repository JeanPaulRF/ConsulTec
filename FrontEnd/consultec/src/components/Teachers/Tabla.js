import React,  { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './ModalRes'

function Tabla({ data, onEstadoChange }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [consultaSeleccionada, setConsultaSeleccionada] =useState("");
  const [consultaSel, setConsultaSel] =useState("");

 
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
        backgroundColor: 'pink', 
      };
   
  
      const openModal = (consulta, item) => {
        setConsultaSeleccionada(consulta);
        setConsultaSel(item)
        setModalIsOpen(true);
        
      };


      const closeModal = () => {
        setModalIsOpen(false);
      };

   
    
  return (
    <div>
   <table style={tableStyle}>
      <thead>
        <tr style={rowStyle}>
          <th style={headerCellStyle}>Curso</th>
          <th style={headerCellStyle}>Pregunta</th>
          <th style={headerCellStyle}>Estado</th>
          <th style={headerCellStyle}>Respuesta</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
        <tr key={index} style={item.isResolved === false ? { ...rowStyle, ...noResueltoStyle } : rowStyle}>
        <td style={cellStyle}>{item.titleSubject}</td>
        <td style={cellStyle}>
        <span onClick={() => openModal(item.consulta, item.id)} style={{ cursor: 'pointer' }}>{item.consulta}</span>
        </td>
        <td style={cellStyle}>
          {item.isResolved ? 'Resuelto' : 'No resuelto'}
        </td>
        <td style={cellStyle}>{item.resolve}</td>
          </tr>
        ))}
      </tbody>
    </table>

            
      <Modal
        consulta={consultaSeleccionada}
        objeto = {consultaSel}
        resoluciones={['Resolución 1', 'Resolución 2', 'Resolución 3']} // Reemplaza con tus resoluciones reales
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      />

    </div>
    
  );
}

export default Tabla;
