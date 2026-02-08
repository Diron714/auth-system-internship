import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAKMVb8E6D2Dm7tyFlQoCmXURPo72u5_tk",
  authDomain: "login-ui-test-661d4.firebaseapp.com",
  projectId: "login-ui-test-661d4",
  storageBucket: "login-ui-test-661d4.firebasestorage.app",
  messagingSenderId: "552656817777",
  appId: "1:552656817777:web:c65d085d5823556813d5d0"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
