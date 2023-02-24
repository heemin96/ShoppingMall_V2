// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { v4 as uuid } from "uuid";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { getDatabase, ref, set, get, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  //   storageBucket: "shoppingmall-73141.appspot.com",
  //   messagingSenderId: "412401958382",
  //   appId: "1:412401958382:web:a672fb74e6a79a5044e2ff",
  //   measurementId: "G-D0G9EZ7TCK",
};

//firebase 초기화
const app = initializeApp(firebaseConfig);
//초기화 후 getauth를 이용해 auth를 가져온다
const auth = getAuth();
// auth 가져온 후 provider 만든다
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export function login() {
  //사용자가 로그인을 클릭할때 호출하는 함수
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    //1. 사용자가 있는 경우에 (로그인한 경우)
    const updatedUser = user ? await adminUser(user) : null;
    console.log(user);
    callback(updatedUser);
  });
}

async function adminUser(user) {
  //2. 사용자가 어드민 권한을 가지고 있는지 확인
  //3. {...user, inAdmin: true/false}
  return get(ref(database, "admins")) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        console.log(admins);
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
}

export async function addNewProduct(product, imageUrl) {
  const id = uuid();
  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image: imageUrl,
    options: product.options.split(","),
  });
}

export async function getProducts() {
  return get(ref(database, "products"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      }
      return [];
    })
    .catch(console.error);
}

export async function getCart(userId) {
  return get(ref(database, `carts/${userId}`)) //
    .then((snapshot) => {
      const items = snapshot.val() || {};
      console.log(items);
      return Object.values(items);
    });
}

export async function addOrUpdateToCart(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
}

export async function removeFromCart(userId, productId) {
  return remove(ref(database, `carts/${userId}/${productId}`));
}
