import { addDoc, collection, doc, getDocs, query, serverTimestamp, where } from "firebase/firestore";

import { firestore as db } from "@/firebase/firebase";

export async function POST(request) {
  const { blogName, authorName, title, slug, text } = await request.json();

  const q = query(collection(db, "blogs"), where("blogName", "==", blogName));
  const querySnapshot = await getDocs(q);

  // check if the blog exists
  if (querySnapshot.empty) return new Response(JSON.stringify({ status: "error", message: "blog doesn't exist" }));
  else {
    // TODO: generate unique slug if there's a collision ('/post-title-is-taken-1')
    // const newSlug = ...

    // generate postId
    const postId = doc(collection(db, "posts")).id;

    // TODO: use db blogUtils
    // add new blog post to posts collection
    await addDoc(collection(db, "posts"), {
      id: postId,
      blogName: blogName,
      authorName: authorName,
      title: title,
      slug: slug,
      text: text,
      createdAt: serverTimestamp(),
    });

    return new Response(JSON.stringify({ status: "success", postSlug: slug }));
  }
}
