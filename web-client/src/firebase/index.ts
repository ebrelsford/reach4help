import * as firebase from 'firebase/app';
// eslint-disable-next-line import/no-duplicates
import 'firebase/auth';
// eslint-disable-next-line import/no-duplicates
import 'firebase/firestore';
// eslint-disable-next-line import/no-duplicates
import 'firebase/functions';

import 'firebase/analytics';

  app.initializeApp({
    measurementId : process.env.REACT_APPMEASUREMENT_ID,
    appId : process.env.REACT_APP_DEV_ID
  })

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(config);
firebase.analytics();

export const firebaseAuth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();

export default firebase;
