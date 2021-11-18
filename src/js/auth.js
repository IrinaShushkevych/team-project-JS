import refs from './refs.js';
import DataSaver from './dataSaver.js';

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithCustomToken,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getDatabase, ref, set, onValue, get, child, remove, push } from 'firebase/database';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';
import Message from './message.js';

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
    this.dataSaver = new DataSaver();
  }

  register = async (email, password) => {
    const uid = await createUserWithEmailAndPassword(this.auth, email, password)
      .then(user => {
        sessionStorage.setItem('user', user.user.uid);
        return user.user.uid;
      })
      .catch(error => {
        return { type: 0, text: error.message };
      });
    return { type: 1, text: uid };
  };

  login = async (email, password) => {
    const uid = await signInWithEmailAndPassword(this.auth, email, password)
      .then(user => {
        sessionStorage.setItem('user', user.user.uid);
        return { type: 1, text: user.user.uid };
      })
      .catch(error => {
        return { type: 0, text: error.message };
      });
    return uid;
  };

  getError = error => {
    Message.error(error.message);
    return null;
  };
}
