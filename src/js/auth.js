import refs from './refs.js';

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set, onValue, get, child, remove, push } from 'firebase/database';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';

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
    this.db = getDatabase(app);
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
    this.getData();
    // this.removeData();
    this.pushData();
    this.getData();
    return uid;
  };

  addData = async () => {
    await set(ref(this.db, 'users/' + sessionStorage.getItem('user') + '/watched/' + '3'), {
      path: 'https',
      count: [1, 2, 3],
    });
  };

  getData = async () => {
    const dbRef = ref(this.db);
    const result = await get(
      child(dbRef, 'users/' + sessionStorage.getItem('user') + '/watched'),
    ).then(data => {
      if (data.exists()) {
        return data.val();
      } else {
        console.log('ERROR');
      }
    });
    console.log(result);
  };

  removeData = () => {
    const refDB = ref(this.db, 'users/' + sessionStorage.getItem('user') + '/watched/' + '2');
    remove(refDB);
  };

  pushData = () => {
    const refDB = ref(this.db, 'users/' + sessionStorage.getItem('user') + '/watched');
    const push = push(refDB);
    set(push, { path: 'https', count: [1, 2, 3] });
  };
}
