
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, OAuthProvider} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDtdgWwT3RWmDbzaw_k0DYXybiAGnv-r84",
  authDomain: "sreekanth-foodhub-merchandise.firebaseapp.com",
  projectId: "sreekanth-foodhub-merchandise",
  storageBucket: "sreekanth-foodhub-merchandise.appspot.com",
  messagingSenderId: "442613137928",
  appId: "1:442613137928:web:94ee7728abbb25066847bd"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProv = new GoogleAuthProvider()
export const appleProv = new OAuthProvider('apple.com') // unable to do as it needs apple dev ID 
