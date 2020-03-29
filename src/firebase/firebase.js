import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAa6Ls56u3oK3zmKSS-eR-yV-1nF2L_n7M',
  authDomain: 'second-hand-parts-f4116.firebaseapp.com',
  databaseURL: 'https://second-hand-parts-f4116.firebaseio.com',
  projectId: 'second-hand-parts-f4116',
  storageBucket: 'second-hand-parts-f4116.appspot.com',
  messagingSenderId: '1079456856511',
  appId: '1:1079456856511:web:a563a40c469e9cee8bc90a',
}

export default firebase.initializeApp(firebaseConfig)

// Get a reference to the database service
//   var database = firebase.database();

// export default database;
