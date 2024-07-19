import PrintAssets from "@/components/ui/print-assets";
import { getPost } from "@/lib/supabase/api/posts";
import { getPublicURLs } from "@/lib/supabase/storage";
import Image from "next/image";

export default async function PrintPage({
  params: { post },
}: {
  params: {
    post: string;
  };
}) {
  const { file_urls: fileURLs } = await getPost(post);
  const publicURLs = await getPublicURLs(fileURLs as string[]);

  return <PrintAssets assets={publicURLs} />;
}
