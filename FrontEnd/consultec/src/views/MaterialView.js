import React, { useState, useEffect } from 'react';
import { app } from '../firebaseConfig';
import { getFirestore, collection, query, getDocs } from "firebase/firestore";

function MaterialView({ handleChangePassword, handleLogout, course, temas }) {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedTheme, setSelectTheme] = useState('');
  const [selectedSubTheme, setSelectSubTheme] = useState('');
  const [subtemas, setSubtemas] = useState([]);

  const db = getFirestore(app);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const onSelectTheme = (selectedTheme) => {
    setSelectTheme(selectedTheme);
  }
  const onSelectSubTheme = (selectedTheme) => {
    setSelectSubTheme(selectedTheme);
  }
  const handleShowResume = (selectedTheme) => {
    setSelectSubTheme(selectedTheme);
  }
  const handleShowExample = (selectedTheme) => {
    setSelectSubTheme(selectedTheme);
  }
  const handleShowQuestions = (selectedTheme) => {
    setSelectSubTheme(selectedTheme);
  }
  useEffect(() => {
    const q = query(collection(db, "subtema"));
    const getSubtemas = async () => {
      const querySnapshot = await getDocs(q);
      const subtemasarray = [];
      querySnapshot.forEach((doc) => {
        subtemasarray.push({ ...doc.data(), id: doc.id });
      });
      setSubtemas(subtemasarray);
    };
    getSubtemas();
  }, [db, selectedTheme]);
  
  return (
    <div style={{ backgroundImage: "url('https://th.bing.com/th/id/R.8f11c679e5dac264326985cd4419f975?rik=n%2bnPpJrHK72m9g&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fd%2f9%2f2%2f94254.jpg&ehk=rfeXjwbaITK5Sv1h0%2boMsgAN0shLtxuK5et51esIWJk%3d&risl=&pid=ImgRaw&r=0')" }}>
      <header className="w-full text-gray-700 bg-blue-400 border-t bg-opacity-50 border-gray-100 shadow-sm body-font">
        <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
          <a href="#_" class="flex items-center order-first mb-4 text-4xl font-semibold text-gray-900 lg:order-none lg:w-1/5 title-font lg:items-start lg:justify-start md:mb-0">
            ConsulTec
          </a>
          <div className="ml-auto relative">
            <div onClick={toggleMenu} className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-person-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
              </svg>
            </div>
          </div>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
              <ul>
                <li
                  className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                  onClick={handleChangePassword}
                >
                  Cambiar Contraseña
                </li>
                <li
                  className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
      <h1 style={{ fontSize: '1.6rem', textAlign: 'center' }}>Seleccione un tema</h1>
      <div className=''>
        <div>
          {temas.length === 0 ? (
            <p>No hay temas disponibles.</p>
          ) : (
            <ul>
              {temas.map((tema) => (
                <li
                  className='my-2 p-2 flex justify-between items-center'
                  key={tema.id}>
                  <div onClick={() => onSelectTheme(tema.id)}>
                    {tema.nombre}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div>
        {subtemas.length === 0 ? (
          <p>No hay subtemas disponibles.</p>
        ) : (
          <ul>
            {subtemas.map((subtema) => (
              <li
                className='my-2 p-2 flex justify-between items-center'
                key={subtema.id}>
                <div
                  onClick={() => onSelectSubTheme(subtema.id)}>
                  {subtema.nombre}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        {selectedSubTheme === '' ??
          <div className="flex gap-2">
            <button onClick={() => handleShowResume(selectedSubTheme)} className="bg-blue-500 bg-opacity-70 text-white px-2 py-1 rounded-3xl hover:bg-blue-700 hover:bg-opacity-70">
              Resumen
            </button>
            <button onClick={() => handleShowExample(selectedSubTheme)} className="bg-blue-500 bg-opacity-70 text-white px-2 py-1 rounded-3xl hover:bg-blue-700 hover:bg-opacity-70">
              Ejemplo
            </button>
            <button onClick={() => handleShowQuestions(selectedSubTheme)} className="bg-blue-500 bg-opacity-70 text-white px-2 py-1 rounded-3xl hover:bg-blue-700 hover:bg-opacity-70">
              Preguntas
            </button>
          </div>
        }
      </div>
    </div>
  )




}

export default MaterialView;