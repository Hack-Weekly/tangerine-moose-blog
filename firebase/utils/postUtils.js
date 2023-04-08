import { collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

import { firestore } from "@/firebase/firebase";

export const postCollection = collection(firestore, "posts");

export const createPost = async (data) => {
  const postRef = doc(postCollection);
  await setDoc(postRef, { ...data, updatedAt: serverTimestamp(), createdAt: serverTimestamp() });
};

// update post by id
export const updatePost = async (id, data) => {
  const postRef = doc(postCollection, id);
  await updateDoc(postRef, { ...data, updatedAt: serverTimestamp() });
};

// check whether post exists by id
export const isExistingPost = async (id) => {
  const postRef = doc(postCollection, id);
  const post = await getDoc(postRef);

  return post.exists();
};
