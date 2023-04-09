import { collection, getDocs } from "firebase/firestore";

import { firestore as db } from "@/firebase/firebase";

export async function GET(request) {
  const querySnapshot = await getDocs(collection(db, "blogs"));

  // TODO: we are pulling all blogs for now
  // TODO: may need to set up different endpoints for filters?
  const blogs = [];
  querySnapshot.forEach((doc) => blogs.push(doc.data()));

  return new Response(JSON.stringify({ status: "success", result: blogs }));
}
