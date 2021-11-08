//https://www.youtube.com/watch?v=KS2ngnRAKlg&t=2424s
//https://www.youtube.com/watch?v=b1ULt_No3IY&t=111sn

// https://team-project-js-bf3c2-default-rtdb.firebaseio.com/?auth=${token}

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(app);

export default class Save {
  constructor() {}
  print = () => {
    console.log(app);
  };

  save = id => {
    fetch('https://team-project-js-bf3c2-default-rtdb.firebaseio.com/main/user.json', {
      method: 'POST',
      body: JSON.stringify(id),
      headers: {
        'CContent-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  };

  auth = (email, password) => {
    const apiKey = 'AIzaSyA-7YNXt4BkV_VbA7lry0dxhTz2XrvRAIo';
    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${apiKey}`,
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        returnSecureToken: true,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        return data.idToken;
      });
  };
}
