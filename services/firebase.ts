import { initializeApp ,getApp,getApps} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRQmH0c2SgujZbPgAVBJkadqtdCi-jZGE",
  authDomain: "tidal-22798.firebaseapp.com",
  projectId: "tidal-22798",
  storageBucket: "tidal-22798.appspot.com",
  messagingSenderId: "179782453800",
  appId: "1:179782453800:web:514379c6a50145921c031d",
  measurementId: "G-ZMCNC8R8M4",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);


