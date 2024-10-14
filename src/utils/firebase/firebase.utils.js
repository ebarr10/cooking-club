import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";
import { firebaseConfig } from "./config";

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Offline Persistence
initializeFirestore(firebaseApp, {
  experimentalForceLongPolling: true,
  cacheSizeBytes: 1048576,
});

export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
const auth = getAuth();

export async function anonymousSignIn(callback) {
  await signInAnonymously(auth).catch((error) => {
    console.error("Error signing in anonymously: ", error);
  });
  return onAuthStateChanged(auth, callback);
}

export async function uploadImage(file) {
  const storageRef = ref(storage, file.name);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
}

export async function addCollectionAndDocument(collectionKey, objectToAdd) {
  const collectionRef = collection(db, collectionKey);
  /**
   * objectToAdd:
   *  week: id
   *  title: string
   *  image: string (storage url)
   *  name: string
   *  timestamp: Date
   */
  await addDoc(collectionRef, objectToAdd);
}

export async function getCollectionAndDocuments(collectionKey, weekId) {
  const collectionRef = collection(db, collectionKey);
  let q;
  if (weekId) {
    q = query(collectionRef, where("week", "==", weekId));
  } else {
    q = query(collectionRef);
  }

  const querySnapshot = await getDocs(q);
  const objectMapping = querySnapshot.docs.reduce((acc, docSnapshot) => {
    acc.push(docSnapshot.data());
    return acc;
  }, []);
  return objectMapping;
}
