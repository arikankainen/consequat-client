import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB1G1S3bcIzb51Agtbu-TX2wGDmkFvGd6s',
  authDomain: 'test-e6902.firebaseapp.com',
  databaseURL: 'https://test-e6902.firebaseio.com',
  projectId: 'test-e6902',
  storageBucket: 'test-e6902.appspot.com',
  messagingSenderId: '604938111787',
  appId: '1:604938111787:web:bd9d0d713dd766c3a6936e',
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
