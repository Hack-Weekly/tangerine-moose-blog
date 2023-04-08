import { collection, getDocs, query, where } from "firebase/firestore";

import { firestore as db } from "@/firebase/firebase";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const blogName = searchParams.get("blog");
  const slug = searchParams.get("slug");

  const q = query(collection(db, "posts"), where("blogName", "==", blogName), where("slug", "==", slug));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return new Response(JSON.stringify({ status: "error", message: "post not found" }));
  } else {
    const data = querySnapshot.docs[0].data();
    return new Response(JSON.stringify({ status: "success", result: data }));
  }
}
