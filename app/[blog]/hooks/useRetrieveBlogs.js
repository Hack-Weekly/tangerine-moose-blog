import { BASE_URL } from "@/app/constants";

const useRetrieveBlogs = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/retrieveBlogs`, {
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data.result;
  } catch (err) {
    return err;
  }
};

export default useRetrieveBlogs;
