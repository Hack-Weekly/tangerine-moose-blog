import { collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

import { firestore } from "@/firebase/firebase";

export const userCollection = collection(firestore, "users");

export const createUser = async (id, data) => {
  const userRef = doc(userCollection, id);
  await setDoc(userRef, { ...data, isOnboarded: false, createdAt: serverTimestamp() });
};

// update user by id
export const updateUser = async (id, data) => {
  const userRef = doc(userCollection, id);
  await updateDoc(userRef, data);
};

// check if user exists by id
export const isExistingUser = async (id) => {
  const userRef = doc(userCollection, id);
  const user = await getDoc(userRef);

  return user.exists();
};
