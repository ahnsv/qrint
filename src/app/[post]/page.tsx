import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function Post({
  params: { post },
}: {
  params: { post: string };
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*, users(email, id)")
    .eq("slug", decodeURIComponent(post))
    .single();

  if (error) {
    console.error(error);
    return notFound();
  }

  const { slug, file_urls, user_id, updated_at, created_at, users } = data;

  const publicURLs = (file_urls as string[])?.map(
    (url) =>
      supabase.storage
        .from(process.env.SUPABASE_BUCKET_ID! as string)
        .getPublicUrl(url).data.publicUrl,
  );

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{slug}</CardTitle>
          <CardDescription className="grid grid-cols-6">
            <div className="author col-span-4">
              <p className="text-sm">{users?.email ?? "Anonymous User"}</p>
              {!users?.email && <p className="text-xs">{user_id}</p>}
            </div>
            <div className="timestamps col-span-2 text-right">
              <p className="text-xs">
                Created: {new Date(created_at).toLocaleString()}
              </p>
              <p className="text-xs">
                Updated: {new Date(updated_at).toLocaleString()}
              </p>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-2 max-h-96 overflow-y-scroll">
          {publicURLs.map((url, idx) => (
            <div className="file-display w-full" key={idx}>
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={decodeURIComponent(url)}
                  alt="Image"
                  className="rounded-md object-cover"
                  layout="fill"
                  objectFit="contain"
                />
              </AspectRatio>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
