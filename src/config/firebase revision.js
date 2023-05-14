// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANBF3ewdY5XSt4O75eJKtIY2hdq7O_BvY",
  authDomain: "exms-17.firebaseapp.com",
  projectId: "exms-17",
  storageBucket: "exms-17.appspot.com",
  messagingSenderId: "837819777755",
  appId: "1:837819777755:web:afe89d07b43a27331c42fe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signupUser = async (formData) => {
  try {
    console.log("signupUser start");
    const response = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    console.log("res", response.user.uid);

    const resDb = await addDoc(collection(db,"users"),{
      email: formData.email,
      name: formData.username,
      uid: response.user.uid
    })
    console.log("resDb",resDb)

    console.log("signupUser end");
  } catch (error) {
    alert(error.message);
    console.log(error.message);
    return error.message;
  }
};

export { signupUser };
