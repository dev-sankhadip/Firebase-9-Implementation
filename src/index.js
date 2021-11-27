import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyB1HktvzpD7ebCCyHvkiPmV1Ww2wCp5mIU",
    authDomain: "fir-9-7ed0a.firebaseapp.com",
    projectId: "fir-9-7ed0a",
    storageBucket: "fir-9-7ed0a.appspot.com",
    messagingSenderId: "663524613984",
    appId: "1:663524613984:web:1fcc8b6a3a634691a04805"
};


initializeApp(firebaseConfig);



// get firebase DB
const db = getFirestore();

// collection ref
const colRef = collection(db, 'books');

// Get collection values 
getDocs(colRef)
    .then((res) => {
        let books = [];
        res.docs.forEach((doc) => {
            books.push({ ...doc.data(), id: doc.id });
        })

        console.log(books);
    })