"use client";

import { createPost } from "@/app/api/posts/actions";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const UploadForm = () => {
  const [user, setUser] = useState<User | null>(null);
  // TODO: move to parent
  useEffect(() => {
    const anonymousSignIn = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInAnonymously();
      if (error) {
        console.error(error);
        return;
      }
      setUser(data.user);
    };
    anonymousSignIn();
  }, []);
  const [slug, setSlug] = useState<string>("");
  const [files, setFiles] = useState<File[] | null>([]);
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  async function uploadFile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!files) return;
    const formdata = new FormData();
    for (const file of files) {
      formdata.append("files", file);
    }
    const requestOptions = { method: "POST", body: formdata };

    const response = await fetch("/api/upload", requestOptions);
    const result = await response.json();

    if (result.status !== "success") {
      console.error("Failed to upload files");
      return;
    }

    const { data, error } = await createPost(
      slug,
      result.data.paths,
      user?.id as string,
    );
    if (error) {
      console.error(error);
      return;
    }
    toast.success("Uploaded successfully");

    formRef.current?.reset();
    router.push(`/${slug}`);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
  }

  return (
    <form className="flex flex-col h-4/6" onSubmit={uploadFile} ref={formRef}>
      <div className="form-content flex-1 flex flex-col space-y-4">
        <div className="title">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            placeholder="Title"
            className="border-0"
            id="title"
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>
        <input
          type="file"
          name="files"
          id="files"
          accept="image/*, application/pdf"
          multiple
          onChange={handleInputChange}
        />
      </div>
      <Button className="w-48 my-8 self-end" type="submit">
        Upload
      </Button>
    </form>
  );
};

export default UploadForm;
