/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const firebaseConfig  = require('./firebaseConfig');
const { getFirestore, collection, addDoc, connectFirestoreEmulator, where, setDoc, doc, updateDoc } = require('firebase/firestore');
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

//Create a user without password
app.post('/users/', (req, res) => {
  try{
    const docData = {
      name: req.body.name,
      email: req.body.email,
      career: req.body.career,
      isDelete: false
    };
    setDoc(doc(db, "users", req.body.email), docData)
      .then((docRef) => {
        res.send('Document written');
      })
      .catch((error) => {
        res.send('Error: ' + error);
      });
  } catch (error) {
    res.send('Error with the data sent: ' + error.message);
  } 
}
);

//To update profile without password
app.put('/users/:email', (req, res) => {
  try{
    const docData = {...req.body};
    updateDoc(doc(db, "users", req.params.email), docData)
      .then((docRef) => {
        res.send('Document update:'+ docData);
      })
      .catch((error) => {
        res.send('Error: ' + error);
      });
  } catch (error) {
    res.send('Error with the data sent: ' + error.message);
  } 
}
);

// logical delete user
app.delete('/users/:email', (req, res) => {
  try{
    const docData = {
      isDelete: true
    };
    updateDoc(doc(db, "users", req.params.email), docData)
      .then((docRef) => {
        res.send('Logical deleted');
      })
      .catch((error) => {
        res.send('Error: ' + error);
      });
  } catch (error) {
    res.send('Error with the data sent: ' + error.message);
  } 
}
);

// Expose Express API as a single Cloud Function:
exports.api = onRequest(app);