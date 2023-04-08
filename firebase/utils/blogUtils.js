import { collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

import { firestore } from "@/firebase/firebase";

export const blogCollection = collection(firestore, "blogs");

export const createBlog = async (data) => {
  const blogRef = doc(blogCollection);
  await setDoc(blogRef, { ...data, createdAt: serverTimestamp() });
};

// update blog by id
export const updateBlog = async (id, data) => {
  const blogRef = doc(blogCollection, id);
  await updateDoc(blogRef, data);
};

// check if blog exists by id
export const isExistingBlog = async (id) => {
  const blogRef = doc(blogCollection, id);
  const blog = await getDoc(blogRef);

  return blog.exists();
};
