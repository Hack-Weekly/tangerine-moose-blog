import { NextResponse } from "next/server";
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";

import { firestore as db } from "@/firebase/firebase";
import { verifyAuthSSR } from "@/lib/authSSR";

// TODO: use db utils when PR is merged
// TODO: rename field names and use serverTimestamp for timestamps

// POST create new blog
export async function POST(request) {
  const verifiedUid = await verifyAuthSSR(request);
  const { uid, blogName } = await request.json();

  if (uid !== verifiedUid) {
    console.log("not auth");
    return NextResponse.json({ status: "error", message: "Not authenticated." }, { status: 401 });
  }

  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const user = userSnap.data();
    console.log("user: ", user);

    // check if user already has a blog
    if (user.blog) {
      return new Response(JSON.stringify({ status: "error", message: "user already has blog" }));
    } else {
      const q = query(collection(db, "blogs"), where("blogName", "==", blogName));

      const querySnapshot = await getDocs(q);
      console.log("querySnapshot.empty: ", querySnapshot.empty);
      // check if blog by that name already exists
      if (querySnapshot.empty) {
        // generate blogId
        const blogId = doc(collection(db, "blogs")).id;
        console.log("blogId: ", blogId);

        // add new blog to blogs collection
        await addDoc(collection(db, "blogs"), {
          id: blogId,
          blogName: blogName,
          authorName: user.displayName,
          dateCreated: new Date().toISOString(),
        });

        // add name of new blog to user
        await updateDoc(userRef, {
          blog: blogName,
        });

        return new Response(JSON.stringify({ status: "success", blogId: blogId }));
      } else {
        // return error if blogName is already taken
        return new Response(JSON.stringify({ status: "error", message: "blog already exists" }));
      }
    }
  } else {
    console.log("user doesn't exist");
    return new Response(JSON.stringify({ status: "error", message: "user not found" }));
  }
}
