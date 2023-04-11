import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

import { firestore } from "@/firebase/firebase";

export const docToPost = (doc) => {
  const data = doc.data();
  if (!data) return null;

  return {
    id: doc.id,
    title: data.title,
    text: data.text,
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

export const createPost = async (blogId, userId, data) => {
  return await addDoc(postCollection, {
    ...data,
    blogId: blogId,
    userId: userId,
    comments: [],
    reactions: {},
    views: 0,
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  });
};

// update post by id
export const updatePost = async (id, data) => {
  const postRef = doc(postCollection, id);
  delete data.createdAt; // don't update createdAt
  delete data.blogId; // don't update blogId
  delete data.userId; // don't update userId
  await updateDoc(postRef, { ...data, updatedAt: serverTimestamp() });
};

// check whether post exists by id
export const isExistingPost = async (id) => {
  const postRef = doc(postCollection, id);
  const post = await getDoc(postRef);

  return post.exists();
};
