"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const UploadForm = () => {
  const [files, setFiles] = useState<File[] | null>([]);

  async function uploadFile() {
    if (!files) return;
    var formdata = new FormData();
    for (const file of files) {
      formdata.append("files", file);
    }
    var requestOptions = { method: "POST", body: formdata };

    const response = await fetch("/api/upload", requestOptions);
    const result = await response.text();
    console.log(result);
  }

  return (
    <form className="w-3/4" onSubmit={uploadFile}>
      <input
        type="file"
        name="files"
        id="files"
        accept="image/*"
        multiple
        onChange={(e) => setFiles(Array.from(e.target.files))}
      />
      <Button className="w-48 my-8" type="submit">
        Upload
      </Button>
    </form>
  );
};

export default UploadForm;
