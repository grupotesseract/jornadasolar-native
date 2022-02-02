import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { LogBox } from 'react-native'

LogBox.ignoreLogs(['Setting a timer'])

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  databaseURL: process.env.DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}
const firestore = firebase.firestore()
const auth = firebase.auth()
const emailAuthProvider = firebase.auth.EmailAuthProvider

export { firestore, auth, emailAuthProvider }
