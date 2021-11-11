import refs from './refs.js';
import DataSaver from './dataSaver.js';

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
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
    this.db = getDatabase(app);
    this.dbRef = ref(getDatabase(app));
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
    this.getData();
    return uid;
  };

  getError = error => {
    Message.error(error.message);
    return null;
  };

  getFilmFromBase = async (id, page) => {
    const result = await get(
      child(this.dbRef, `users/${sessionStorage.getItem('user')}/${page}/${id}`),
    )
      .then(data => {
        if (data.exists()) {
          return data.val();
        } else {
          console.log('ERROR');
          return null;
        }
      })
      .catch(this.getError);
    if (result) return true;
    return false;
  };

  getFilm = async (id, page) => {
    let res = null;
    if (!page) {
      page = localStorage.getItem('activePage');
      // page = this.getActivePage();
    }
    if (page === 'home') {
      let films = localStorage.getItem(page);
      if (films) {
        films = JSON.parse(films);
        res = films.find(el => el.id === id);
      }
    } else {
      result = this.getFilmFromBase;
      const res = [];
      if (result)
        for (let key in result) {
          res.push(JSON.parse(result[key]));
        }
    }
    return res;
  };

  isFilmInList = (id, page) => {
    let result = false;
    if (page === 'home') {
      //this.isFilmInList(id,'home')
    } else {
      const film = this.getFilmFromBase(id, page);
      result = film ? true : false;
    }
    return result;
  };

  addFilm = async (id, page) => {
    if (!this.isFilmInList(id, page)) {
      const result = await set(
        ref(this.db, `users/${sessionStorage.getItem('user')}/${page}/${id}`),
        JSON.stringify(this.getFilm(id, page)),
      );
    }
    this.getError(`This film is allrady in ${page}`);
  };

  getData = async page => {
    const result = await get(
      child(this.dbRef, `users/${sessionStorage.getItem('user')}/${page}`),
    ).then(data => {
      if (data.exists()) {
        return data.val();
      } else {
        return [];
      }
    });
    const res = [];
    for (let key in result) {
      res.push(JSON.parse(result[key]));
    }
    return res;
  };

  removeData = async (id, page) => {
    const refDB = ref(this.db, `users/${sessionStorage.getItem('user')}/${page}/${id}`);
    const result = await remove(refDB);
    console.log(result);
    return result;
  };
}
