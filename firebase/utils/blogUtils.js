import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";

import { firestore } from "@/firebase/firebase";

export const docToBlog = (doc) => {
  const data = doc.data();
  if (!data) return null;

  return {
    id: doc.id,
    slug: data.slug,
    name: data.name,
    description: data.description,
    totalPosts: data.totalPosts,
    userId: data.user,
    createdAt: data.createdAt,
    ...data,
  };
};

export const blogCollection = collection(firestore, "blogs");

export const createBlog = async (data) => {
  return await addDoc(blogCollection, { ...data, totalPost: 0, createdAt: serverTimestamp() });
};

// update blog by id
export const updateBlog = async (id, data) => {
  const blogRef = doc(blogCollection, id);
  delete data.createdAt; // don't allow createdAt to be updated
  await updateDoc(blogRef, data);
};

// check if blog exists by id
export const isExistingBlog = async (id) => {
  const blogRef = doc(blogCollection, id);
  const blog = await getDoc(blogRef);

  return blog.exists();
};
