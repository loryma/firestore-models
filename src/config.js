const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

firebase.initializeApp({
    apiKey: 'AIzaSyCiY3l4xtqJ3bAiq9YoC9pKV3BZ8y0Aobs',
    authDomain: 'basic-shop-e2c7a.firebaseapp.com',
    databaseURL: 'https://basic-shop-e2c7a.firebaseio.com',
    projectId: 'basic-shop-e2c7a',
    storageBucket: 'basic-shop-e2c7a.appspot.com',
    messagingSenderId: '406524655787',
    appId: '1:406524655787:web:ae6e236cb58cf3e5441fee',
});

export default firebase.firestore();
