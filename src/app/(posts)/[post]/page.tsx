import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PrintButton from "@/components/ui/print-button";
import { getPost } from "@/lib/supabase/api/posts";
import { getPublicURLs } from "@/lib/supabase/storage";
import Image from "next/image";

export default async function Post({
  params: { post },
}: {
  params: { post: string };
}) {
  const { slug, file_urls, user_id, updated_at, created_at, users } =
    await getPost(post);

  const publicURLs = await getPublicURLs(file_urls as string[]);

  return (
    <div>
      <Card className="flex flex-col space-y-2">
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
        <CardFooter className="flex justify-end">
          <PrintButton assets={publicURLs} />
        </CardFooter>
      </Card>
    </div>
  );
}
