// Importa las funciones que necesitas de los SDKs que necesitas
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAN40i5IP9HuRTl5bDFF4HbnXLCKo1qyQA",
    authDomain: "consulta-tec.firebaseapp.com",
    projectId: "consulta-tec",
    storageBucket: "consulta-tec.appspot.com",
    messagingSenderId: "1091023132943",
    appId: "1:1091023132943:web:160aabe43bbdaa4ee0067a"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Exporta la instancia de autenticación y Cloud Firestore
export { app, auth, db };