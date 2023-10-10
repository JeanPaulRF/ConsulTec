import { useNavigate, useLocation } from 'react-router-dom';
import MaterialView from '../views/MaterialView';
import React, { useState, useEffect } from 'react';
import { app } from '../firebaseConfig';
import { getFirestore, collection, query, getDocs} from "firebase/firestore";

function MaterialContainer  ()  {
    const navigate = useNavigate();
    
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const course = searchParams.get('course');

    const db = getFirestore(app);
    const [temas, setTemas] = useState([]);
    useEffect(() => {
      const q = query(collection(db, "tema"));
      const getTemas = async () => {
        const querySnapshot = await getDocs(q);
        const temasarray = [];
        querySnapshot.forEach((doc) => {
          temasarray.push({ ...doc.data(), id: doc.id });
        });
  
        setTemas(temasarray);
      };
      getTemas();
    }, [db]);

    const handleChangePassword = () => {
      navigate('/password')
    }

    const handleLogout = () => {
      navigate('/login')
    }

    return (
      <div>
        <MaterialView
        course={course}
        temas={temas}
        handleChangePassword={handleChangePassword}
        handleLogout={handleLogout}
        />
      </div>
    );
};

export default MaterialContainer;