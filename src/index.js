import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore'
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
    .catch((err) => {
        console.log(err);
    })





// Add Book
const addForm = document.querySelector(".add");
addForm.addEventListener("submit", (e) => {
    e.preventDefault();

    addDoc(colRef, {
        title: addForm.title.value,
        author: addForm.author.value
    })
        .then((res) => {
            addForm.reset();
        })
})


// Delete Book
const deleteForm = document.getElementById("delete");
deleteForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const docRef = doc(db, 'books', deleteForm.id.value)

    deleteDoc(docRef)
        .then((res) => {
            deleteForm.reset();
        })
})



// Realtime Collection data
onSnapshot(colRef, (res) => {
    let books = [];
    res.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
    })
    console.log(books);
})