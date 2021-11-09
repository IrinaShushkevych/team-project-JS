import refs from './refs.js';

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';

import { getDatabase } from 'firebase/database';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// const firebaseConfig = {
//   apiKey: 'AIzaSyA-7YNXt4BkV_VbA7lry0dxhTz2XrvRAIo',
//   authDomain: 'team-project-js-bf3c2.firebaseapp.com',
//   databaseURL: 'https://team-project-js-bf3c2-default-rtdb.firebaseio.com',
//   projectId: 'team-project-js-bf3c2',
//   storageBucket: 'team-project-js-bf3c2.appspot.com',
//   messagingSenderId: '666264362443',
//   appId: '1:666264362443:web:152a253140bc5479f1aa4e',
//   measurementId: 'G-DVKFPK03GX',
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const database = getDatabase(app);

// console.log(app);
// console.log(db);

// async function getCities(db) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }

export default class Save {
  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyA-7YNXt4BkV_VbA7lry0dxhTz2XrvRAIo',
      authDomain: 'team-project-js-bf3c2.firebaseapp.com',
      databaseURL: 'https://team-project-js-bf3c2-default-rtdb.firebaseio.com',
      projectId: 'team-project-js-bf3c2',
      storageBucket: 'team-project-js-bf3c2.appspot.com',
      messagingSenderId: '666264362443',
      appId: '1:666264362443:web:152a253140bc5479f1aa4e',
      measurementId: 'G-DVKFPK03GX',
    };
    const app = initializeApp(firebaseConfig);
    this.auth = getAuth(app);
    this.db = getDatabase();
  }

  register = async (email, password) => {
    const uid = await createUserWithEmailAndPassword(this.auth, email, password)
      .then(user => {
        console.log(user);
        sessionStorage.setItem('user', user.user.uid);
        return user.user.uid;
      })
      .catch(error => {
        alert(error.code);
        return { type: 0, text: error.code };
      });
    return { type: 1, text: uid };
  };

  login = async (email, password) => {
    const uid = await signInWithEmailAndPassword(this.auth, email, password)
      .then(user => {
        console.log(user);
        sessionStorage.setItem('user', user.user.uid);
        return { type: 1, text: uid };
      })
      .catch(error => {
        // alert(error.code);
        console.log('ERROR', error);
        return { type: 0, text: error.code };
      });
    return uid;
  };
}
