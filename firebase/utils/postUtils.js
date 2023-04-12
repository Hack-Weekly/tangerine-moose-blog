import { addDoc, collection, doc, getDoc, increment, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

import { firestore } from "@/firebase/firebase";

export const docToPost = (doc) => {
  const data = doc.data();
  if (!data) return null;

  return {
    id: doc.id,
    title: data.title,
    text: data.text,
    slug: data.slug,
    imageURL: data.imageURL,
    blogId: data.blog,
    userId: data.userId,
    tags: data.tags,
    reactions: data.reactions,
    views: data.views,
    updatedAt: data.updatedAt,
    createdAt: data.createdAt,
    ...data,
  };
};

export const docToComment = (doc) => {
  const data = doc.data();
  if (!data) return null;

  return {
    id: doc.id,
    userId: data.userId,
    text: data.text,
    createdAt: data.createdAt,
    ...data,
  };
};

export const postCollection = collection(firestore, "posts");
export const commentCollection = (postId) => collection(firestore, "posts", postId, "comments");

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

export const bumpViews = async (id) => {
  const postRef = doc(postCollection, id);
  await updateDoc(postRef, { views: increment(1) });
};

// check whether post exists by id
export const isExistingPost = async (id) => {
  const postRef = doc(postCollection, id);
  const post = await getDoc(postRef);

  return post.exists();
};

export const addComment = async (id, userId, text) => {
  return await addDoc(commentCollection(id), {
    userId: userId,
    text: text.trim(),
    createdAt: serverTimestamp(),
  });
};
