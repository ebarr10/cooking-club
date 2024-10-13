import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  query,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from "./config";

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

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

export async function getCollectionAndDocuments(collectionKey) {
  const collectionRef = collection(db, collectionKey);
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const objectMapping = querySnapshot.docs.reduce((acc, docSnapshot) => {
    acc.push(docSnapshot.data());
    return acc;
  }, []);
  return objectMapping;
}
