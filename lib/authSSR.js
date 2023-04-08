import { cookies } from "next/headers";

import { authAdmin } from "@/firebase/firebaseAdmin";

// TODO: would like to make this a HOC for api route, but not sure how to do that with next 13
// returns uid if authenticated, otherwise returns false
export const verifyAuthSSR = async () => {
  try {
    const token = cookies().get("token");
    const claims = await authAdmin.verifyIdToken(token.value);
    return claims.uid;
  } catch (err) {
    return false;
  }
};
