import React, { useState, useEffect } from 'react';
import { app } from '../firebaseConfig';
import { getFirestore, collection, query, getDocs, where, doc } from "firebase/firestore";
import TemaList from '../components/material/TemaList';
import SubTemaList from '../components/material/SubTemaList';
import { useNavigate } from 'react-router-dom';

function MaterialView({ handleChangePassword, handleLogout, course, temas, title }) {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedTheme, setSelectTheme] = useState('');
  const [selectedSubTheme, setSelectSubTheme] = useState('');
  const [subtemas, setSubtemas] = useState([]);
  const navigate = useNavigate();

  const db = getFirestore(app);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const onSelectTheme = (selectedTheme) => {
    setSelectTheme(selectedTheme);
  }
  const onSelectSubTheme = (selectedSubTheme) => {
    setSelectSubTheme(selectedSubTheme);
  }

  const handleShowResume = async (selectedSubTheme) => {
    console.log('buscando ' + selectedSubTheme);
    const subThemeRef = doc(db, 'subtema', selectedSubTheme);
    const q = query(
      collection(db, "resumen"),
      where("subtemaRef", "==", subThemeRef)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      window.open(doc.data().pdfURL);
    });
  }
  const handleShowExample = async (selectedSubTheme) => {
    console.log('buscando ' + selectedSubTheme);
    const subThemeRef = doc(db, 'subtema', selectedSubTheme);
    const q = query(
      collection(db, "ejemplo"),
      where("subtemaRef", "==", subThemeRef)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      window.open(doc.data().pdfURL);
    });
  }
  const handleShowQuestions = (selectedSubTheme) => {
    navigate(`/question?subtheme=${selectedSubTheme}&title=${title}&course=${course}`);
  }
  useEffect(() => {
    if (selectedTheme !== '') {
      const themeRef = doc(db, 'tema', selectedTheme);
      const q = query(
        collection(db, "subtema"),
        where("temaRef", "==", themeRef));
      const getSubtemas = async () => {
        const querySnapshot = await getDocs(q);
        const subtemasarray = [];
        querySnapshot.forEach((doc) => {
          subtemasarray.push({ ...doc.data(), id: doc.id });
        });
        setSubtemas(subtemasarray);
      };
      getSubtemas();
    }
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
      <div className='flex h-full w-full'>
        <div className="w-1/3">
          <TemaList
            temas={temas}
            onSelectTheme={onSelectTheme}
          />
        </div>
        <div className="w-1/3">
          <SubTemaList
            subtemas={subtemas}
            onSelectSubTheme={onSelectSubTheme}
          />
        </div>
        <div className="w-1/3">
          {selectedSubTheme !== '' &&
            <div className="rounded-xl mx-16 my-16 h-1/2 text-white bg-gray-700 border-t bg-opacity-90 border-gray-100 shadow-sm body-font flex items-center justify-center space-x-4">
              <button 
              onClick={() => handleShowResume(selectedSubTheme)} 
              className="bg-blue-500 bg-opacity-70 text-white px-2 py-1 rounded-3xl hover:bg-blue-700 hover:bg-opacity-70">
                Resumen
              </button>
              <button 
              onClick={() => handleShowExample(selectedSubTheme)} 
              className="bg-blue-500 bg-opacity-70 text-white px-2 py-1 rounded-3xl hover:bg-blue-700 hover:bg-opacity-70">
                Ejemplo
              </button>
              <button 
              onClick={() => handleShowQuestions(selectedSubTheme, course, title)} 
              className="bg-blue-500 bg-opacity-70 text-white px-2 py-1 rounded-3xl hover:bg-blue-700 hover:bg-opacity-70">
                Preguntas
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  )




}

export default MaterialView;