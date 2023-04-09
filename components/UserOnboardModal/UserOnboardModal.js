"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Modal from "@/components/Modal/Modal";
import useFetch from "@/hooks/useFetch";
import { useAuth } from "@/providers/AuthProvider";
import styles from "./UserOnboardModal.module.css";

export default function UserOnboardModal() {
  const { user } = useAuth();
  const path = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { post, errors: createError } = useFetch("/api/createBlog/", {
    onSuccess: (data) => {
      console.log("Success: ", data);
      setIsModalOpen(false);
    },
    onError: (error) => {
      console.log("Error: ", error);
    },
  });

  useEffect(() => {
    if (user && !user.blogId) {
      setName(`${user.displayName}'s Blog`);
      setIsModalOpen(true);
    }
  }, [user, path]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await post({ body: JSON.stringify({ uid: user.uid, name, description }) });
  };

  return (
    <Modal open={isModalOpen} closeOnOutsideClick={false}>
      <h2 className={styles.title}>Create your blog</h2>
      <form className={styles.body} onSubmit={handleSubmit}>
        <div>
          <label className={styles.label} htmlFor="name">
            Blog Name
          </label>
          <Input required name={"name"} type={"text"} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className={styles.label} htmlFor="description">
            Description (Optional)
          </label>
          <Input
            name={"description"}
            type={"text"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {createError && <div className={styles.error}>{createError.message}</div>}
        <Button type="submit" className={styles.button} disabled={name.length === 0}>
          Start Blogging
        </Button>
      </form>
    </Modal>
  );
}
