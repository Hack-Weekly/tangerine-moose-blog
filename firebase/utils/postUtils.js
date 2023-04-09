import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

import { firestore } from "@/firebase/firebase";

export const docToPost = (doc) => {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title,
    content: data.content,
    slug: data.slug,
    blogId: data.blog,
    userId: data.userId,
    comments: data.comments,
    tags: data.tags,
    reactions: data.reactions,
    views: data.views,
    updatedAt: data.updatedAt,
    createdAt: data.createdAt,
    ...data,
  };
};

export const postCollection = collection(firestore, "posts");

export const createPost = async (data) => {
  await addDoc(postCollection, { ...data, updatedAt: serverTimestamp(), createdAt: serverTimestamp() });
};

// update post by id
export const updatePost = async (id, data) => {
  const postRef = doc(postCollection, id);
  delete data.createdAt; // don't update createdAt
  await updateDoc(postRef, { ...data, updatedAt: serverTimestamp() });
};

// check whether post exists by id
export const isExistingPost = async (id) => {
  const postRef = doc(postCollection, id);
  const post = await getDoc(postRef);

  return post.exists();
};
