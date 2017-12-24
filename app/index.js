import { AppRegistry } from 'react-native';
import * as firebase from 'firebase';
import App from './App';

const firebaseConfig = {
  apiKey: 'AIzaSyCuVaTRqWJWzXP23yogufcMvt0TAo9f7b0',
  authDomain: 'teatimes-8d7cd.firebaseapp.com',
  databaseURL: 'https://teatimes-8d7cd.firebaseio.com',
  projectId: 'teatimes-8d7cd',
  storageBucket: 'teatimes-8d7cd.appspot.com',
  messagingSenderId: '589985448945'
};

firebase.initializeApp(firebaseConfig);

AppRegistry.registerComponent('TeaTimes', () => App);
