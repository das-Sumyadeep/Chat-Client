import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: "AIzaSyA4OJDroyUT1sH8wR7NiTwwVJA_0WrUauI",
  authDomain: "chatapp-d9afa.firebaseapp.com",
  projectId: "chatapp-d9afa",
  storageBucket: "chatapp-d9afa.appspot.com",
  messagingSenderId: "657287354998",
  appId: "1:657287354998:web:fb8774a473eb7cf58c1d57",
};


firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
