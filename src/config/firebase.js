// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
const storage = getStorage(app);

async function signupUser(formData) {
  //destructure
  //to extract keys as variables from an object
  const { username, email, password, age, image } = formData;
  console.log(image);
  try {
    //for user creation
    const createUserWithEmailAndPasswordRes =
      await createUserWithEmailAndPassword(auth, email, password);
    const uid = createUserWithEmailAndPasswordRes.user.uid;

    let url = "";
    if (image[0]) {
      //For image upload
      const imageName = image[0].name;
      const folderName = "userPics/";
      const imageRef = await ref(storage, folderName + imageName);
      console.log(imageRef);
      const uploadBytesRes = await uploadBytes(imageRef, image[0]);
      console.log(uploadBytesRes);
      url = await getDownloadURL(uploadBytesRes.ref);
      console.log(url);
    }

    //For database entry
    const res = await setDoc(doc(db, "users", uid), {
      name: username,
      email: email,
      uid: uid,
      age,
      profileImage: url,
    });
    // console.log(res);

    // const addDocRes = await addDoc(collection(db, "users"), {
    //   name: name,
    //   email: email,
    //   uid: createUserWithEmailAndPasswordRes.user.uid
    // });

    return {
      status: "success",
      // res,
    };
  } catch (error) {
    console.log(error.message);
    return {
      status: "error",
      error: error.message,
    };
  }
  // return res;
  // console.log("firebase signupUser end");
}

async function loginUser(formData) {
  //destructure
  //to extract keys as variables from an object
  const { email, password } = formData;

  try {
    const createUserWithEmailAndPasswordRes = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return {
      status: "success",
      // res,
    };
  } catch (error) {
    console.log(error.message);
    return {
      status: "error",
      error: error.message,
    };
  }
}

async function getAllUsersData() {
  try {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);

    let arr = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      arr.push(doc.data());
    });
    console.log(arr);
    return {
      status: "success",
      data: arr,
    };
  } catch (error) {
    console.log(error.message);
    return {
      status: "error",
      error: error.message,
    };
  }
}

async function logoutUser() {
  try {
    await signOut(auth);
    return {
      status: "success",
    };
  } catch (error) {
    console.log(error.message);
    return {
      status: "error",
      error: error.message,
    };
  }
}

async function postAd(formData) {
  const { title, price, image, description, location } = formData;
  console.log(formData);
  try {
    const { uid } = auth.currentUser;
    console.log(uid);

    let url = "";
    if (image[0]) {
      //For image upload
      const imageName = image[0].name;
      const folderName = "userPics/";
      const imageRef = await ref(storage, folderName + imageName);
      console.log(imageRef);
      const uploadBytesRes = await uploadBytes(imageRef, image[0]);
      console.log(uploadBytesRes);
      url = await getDownloadURL(uploadBytesRes.ref);
      console.log(url);
    }

    const addDocRes = await addDoc(collection(db, "ads"), {
      title,
      price,
      image: url,
      description,
      location,
      uid,
    });
    return {
      status: "success",
    };
  } catch (error) {
    console.log(error.message);
    return {
      status: "error",
      error: error.message,
    };
  }
}

async function getAllAds() {
  try {
    const q = query(collection(db, "ads"));
    const querySnapshot = await getDocs(q);

    let arr = [];
    let obj = {};
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      obj = { ...doc.data() };
      obj.docId = doc.id;
      // obj.data = doc.data()
      arr.push(obj);
    });
    console.log(arr);
    return {
      status: "success",
      data: arr,
    };
  } catch (error) {
    console.log(error.message);
    return {
      status: "error",
      error: error.message,
    };
  }
}

export {
  signupUser,
  loginUser,
  getAllUsersData,
  auth,
  logoutUser,
  postAd,
  getAllAds,
};
