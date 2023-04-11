import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";

import { firestore } from "@/firebase/firebase";

export const docToTag = (doc) => {
  const data = doc.data();
  return {
    id: doc.id,
    name: data.name,
    ...data,
  };
};

export const tagCollection = collection(firestore, "tags");

export const createTag = async (data) => {
  await addDoc(tagCollection, { ...data });
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
