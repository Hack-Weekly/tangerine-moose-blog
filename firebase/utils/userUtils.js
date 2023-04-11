import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

import { firestore } from "@/firebase/firebase";

// convert firebase doc to user object
export const docToUser = (doc) => {
  const data = doc.data();
  if (!data) return null;

  return {
    uid: doc.id,
    displayName: data.name,
    photoURL: data.photoURL,
    description: data.description,
    isOnboarded: data.isOnboarded,
    blog: data.blog,
    blogId: data.blogId,
    blogSlug: data.blogSlug,
    blogDescription: data.blogDescription,
    createdAt: data.createdAt,
    ...data,
  };
};

export const userCollection = collection(firestore, "users");

export const createUser = async (id, data) => {
  await addDoc(userCollection, { ...data, isOnboarded: false, createdAt: serverTimestamp() });
};

export const createUserWithId = async (id, data) => {
  const userRef = doc(userCollection, id);
  await setDoc(userRef, { ...data, isOnboarded: false, createdAt: serverTimestamp() });
};

// update user by id
export const updateUser = async (id, data) => {
  const userRef = doc(userCollection, id);
  delete data.createdAt; // don't update createdAt
  await updateDoc(userRef, data);
};

// check if user exists by id
export const isExistingUser = async (id) => {
  const userRef = doc(userCollection, id);
  const user = await getDoc(userRef);

  return user.exists();
};
