import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs, addDoc, deleteDoc, doc, onSnapshot, query, where, orderBy,
    serverTimestamp, getDoc, updateDoc
} from 'firebase/firestore'
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
        author: addForm.author.value,
        createdAt: serverTimestamp()
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



// Firestore Queries
const qResult = query(colRef, where("author", "==", "novoneel"), orderBy("createdAt"));

// Pass CollectionRef or Query as first argument in snapshot
// Realtime Collection data
onSnapshot(qResult, (res) => {
    let books = [];
    res.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
    })
    console.log(books);
}, (err) => {
    console.log(err);
})




// Get a single document
const docRef = doc(db, 'books', 'MpOyDZhytoaX8GJv5Mzq');
getDoc(docRef)
    .then((res) => {
        console.log(res.data());
    })
    .catch((err) => {
        console.log(err);
    })

onSnapshot(docRef, (doc) => {
    console.log(doc.data());
}, (err) => {
    console.log(err);
})


// Update a document
const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const docRef = doc(db, 'books', updateForm.id.value);
    updateDoc(docRef, {
        title: "Updated Title"
    })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err);
        })
})