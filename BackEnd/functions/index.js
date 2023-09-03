/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const firebaseConfig  = require('./firebaseConfig');
const { getFirestore, collection, addDoc, connectFirestoreEmulator } = require('firebase/firestore');
const { initializeApp } = require('firebase/app');

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require('express');

const app = express();
const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp);
// Utilizar el emulador de Firestore en localhost
connectFirestoreEmulator(db, '127.0.0.1', 8080);

app.get('/:id', (req, res) => res.send(`Hola ${req.params.id}`));

app.post('/users/', (req, res) => {
  try{
    const usersRef = collection(db, 'users');
    const docData = {
      name: req.body.name,
      email: req.body.email,
      career: req.body.career
    };
    addDoc(usersRef, docData)
      .then((docRef) => {
        res.send('Document written with ID: ' + docRef.id);
      })
      .catch((error) => {
        res.send('Error adding document: ' + error.message);
      })
  } catch (error) {
    res.send('Error with the data sent: ' + error);
  } 
}
);


// Expose Express API as a single Cloud Function:
exports.api = onRequest(app);