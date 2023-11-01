import React, { useState } from 'react';
import Modal from 'react-modal';
import { app } from '../../firebaseConfig';
import { getFirestore, collection, query, doc, updateDoc} from 'firebase/firestore';


function ModalRes({ consulta, objeto ,resoluciones, isOpen, onRequestClose }){
    const [respuesta, setRespuesta] = useState('');
    const [selectedResolucion, setSelectedResolucion] = useState('');
    const db = getFirestore(app);
    const [selectedOption, setSelectedOption] = useState('');
    const [textareaValue, setTextareaValue] = useState('');
  
   


    const botonEstilo = {
      background: 'linear-gradient(to bottom, #3498db, #2980b9)',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      padding: '10px 20px',
      cursor: 'pointer',
      marginRight: '10px',
    };
    
    
    const handleAceptar = async () => {
       if (textareaValue.length>0) {
       
        try {
          
          const docRef = doc(db, 'consulta', objeto ); 
          await updateDoc(docRef, {
            isResolved: true,
            resolve: textareaValue
          });
    
           setRespuesta("");
          onRequestClose();
        } catch (error) {
          
          console.error("Error al actualizar el documento en Firebase:", error);
        }
      } 

    };

     

      return (
          <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Consulta Modal"
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 255, 0.2)',
              },
              content: {
                padding: '20px',
                maxWidth: '400px',
                margin: '0 auto',
                backgroundColor: 'lightgray',
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', 
              },
            }}
          >
            <h1 style={{ marginBottom: '20px', textAlign: 'center' }}>Consulta</h1>
            <p>{consulta}</p>

            <h3 style={{ marginTop: '20px', textAlign: 'center' }}>Responder</h3>
            <textarea
              value={selectedOption ? selectedOption : textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
              rows="4"
              style={{ width: '100%' }}
            />

            <h3 style={{ marginTop: '20px', textAlign: 'center' }}>Seleccione una Respuesta</h3>
            <select
              value={selectedOption}
              onChange={(e) => {
                setSelectedOption(e.target.value);
                setTextareaValue(e.target.value); // Establecer el valor del textarea con lo seleccionado en el dropdown
              }}
              style={{ width: '100%' }}
            >
              <option value="">Respuestas Previas</option>
              {resoluciones.map((resolucion) => (
                <option key={resolucion} value={resolucion}>
                  {resolucion}
                </option>
              ))}
            </select>

            <div style={{ marginTop: '20px', marginLeft: '10px' }}>
              <button  onClick={handleAceptar} style={botonEstilo}>
                Aceptar
              </button>
              <button onClick={onRequestClose} style={{ ...botonEstilo, background: 'red' }}>
                Cancelar
              </button>
            </div>
          </Modal>

      );
    }
    






export default ModalRes;