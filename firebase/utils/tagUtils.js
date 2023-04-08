import { collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

import { firestore } from "@/firebase/firebase";

export const tagCollection = collection(firestore, "tags");

export const createTag = async (data) => {
  const tagRef = doc(tagCollection);
  await setDoc(tagRef, { ...data, createdAt: serverTimestamp() });
};

// update tag by id
export const updateTag = async (id, data) => {
  const tagRef = doc(tagCollection, id);
  await updateDoc(tagRef, data);
};

// check if tag exists by id
export const isExistingTag = async (id) => {
  const tagRef = doc(tagCollection, id);
  const tag = await getDoc(tagRef);

  return tag.exists();
};
