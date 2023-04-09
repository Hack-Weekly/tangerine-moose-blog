import { NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";

import { createBlog, updateBlog } from "@/firebase/utils/blogUtils";
import { docToUser, updateUser, userCollection } from "@/firebase/utils/userUtils";
import { verifyAuthSSR } from "@/lib/authSSR";
import { slugify } from "@/lib/utils";

// POST create new blog
export async function POST(request) {
  const verifiedUid = await verifyAuthSSR(request);
  const { uid, name, description } = await request.json();

  // check if user is authenticated
  if (uid !== verifiedUid) {
    console.log("not auth");
    return NextResponse.json({ status: "error", message: "Not authenticated." }, { status: 401 });
  }

  const userRef = doc(userCollection, uid);
  const userSnap = await getDoc(userRef);

  // check if user exists
  if (!userSnap.exists()) {
    console.log("user doesn't exist");
    return NextResponse.json({ status: "error", message: "user doesn't exist." }, { status: 400 });
  }

  // check if user already has a blog
  const user = docToUser(userSnap);
  if (user.blogId) {
    return NextResponse.json({ status: "success", message: "user already has blog" }, { status: 200 });
  }

  try {
    // add new blog to blogs collection
    console.log("creating blog");
    const blogRef = await createBlog({
      name: name.trim(),
      description: description.trim(),
      user: user.id,
    });

    // add slug to blog
    await updateBlog(blogRef.id, {
      slug: slugify(`${name}-${blogRef.id.substring(0, 5)}`),
    });
    // add blog id to user
    await updateUser(uid, {
      blogId: blogRef.id,
    });

    return new Response(JSON.stringify({ status: "success", blogId: blogRef.id }));
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: "error", message: "Something went wrong." }, { status: 500 });
  }
}
