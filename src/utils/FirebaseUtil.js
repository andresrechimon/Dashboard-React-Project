import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { uuid } from 'uuidv4';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export function firebaseConfig() {
  const config = {
    apiKey: "AIzaSyBpHwvxDeJ3W7c0YArgP1XSIiMmsCANo68",
    authDomain: "firstfbproyect.firebaseapp.com",
    projectId: "firstfbproyect",
    storageBucket: "firstfbproyect.appspot.com",
    messagingSenderId: "888798996437",
    appId: "1:888798996437:web:18e424580075bd453a3f5c",
    measurementId: "G-EJYHB67FYW"
  };

  // Initialize Firebase
  const app = initializeApp(config);
  const analytics = getAnalytics(app);
}

export function firebaseRegistrarUsuario(email, password) {
  createUserWithEmailAndPassword(getAuth(), email, password)
    .then(credenciales => {
      // credenciales.user.
    })
}

export async function firebaseIniciarSesion(email, password) {
  try {
    let credenciales = await signInWithEmailAndPassword(getAuth(), email, password);
    //credenciales.user
  } catch (e) {
    return false;
  }
  return true;
}

export async function firebaseBuscar(coleccionABuscar) {
  let listado = [];
  let consulta = collection(getFirestore(), coleccionABuscar);
  let resultado = await getDocs(consulta);
  resultado.forEach(documento => {
    let objeto = documento.data();
    objeto.id = documento.id;
    listado.push(objeto);
  });
  return listado;
}

export function firebaseCrear(coleccion, objeto) {
  objeto.id = uuid();
  let referencia = doc(getFirestore(), coleccion, objeto.id);
  setDoc(referencia, objeto);
}

export async function firebaseEliminar(coleccion, id) {
  await deleteDoc(doc(getFirestore(), coleccion, id));
}