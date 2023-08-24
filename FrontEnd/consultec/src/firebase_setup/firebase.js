// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAN40i5IP9HuRTl5bDFF4HbnXLCKo1qyQA",
    authDomain: "consulta-tec.firebaseapp.com",
    projectId: "consulta-tec",
    storageBucket: "consulta-tec.appspot.com",
    messagingSenderId: "1091023132943",
    appId: "1:1091023132943:web:160aabe43bbdaa4ee0067a"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);