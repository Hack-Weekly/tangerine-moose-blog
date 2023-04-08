import { BASE_URL } from "@/app/constants";

const getPost = async ({ blogName, postSlug }) => {
  try {
    const response = await fetch(`${BASE_URL}/api/getPost?blog=${blogName}&slug=${postSlug}`, {
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (data.status == "success") return data.result;
  } catch (err) {
    return err;
  }
};

export default getPost;
