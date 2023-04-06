// helper functions for querying collections

import { collection } from "firebase/firestore";

import { firestore } from "@/firebase/firebase";

// better way to declare collection names?
export const Collections = Object.freeze({
  Blogs: "blogs",
  Posts: "posts",
  Users: "users",
  Tags: "tags",
});

/*
 * get a collection
 * param {collection} one of the Collections
 * return the collection
 */
export const getCollection = (name) => {
  return collection(firestore, name);
};
