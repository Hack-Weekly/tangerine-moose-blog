import { useState } from "react";

const useCreateBlogPost = () => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("not_started");

  const fetchData = async (formData) => {
    console.log("formData: ", formData);
    setStatus("loading");

    try {
      const response = await fetch("/api/createBlogPost/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("data in fetchData: ", data);
      setData(data);
      setStatus("loaded");
    } catch (err) {
      setData(err);
      setStatus("error");
    }
  };

  return [fetchData, status, data];
};

export default useCreateBlogPost;
