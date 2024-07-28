import { createClient } from "./server";

export async function getPublicURLs(keys: string[]) {
  const supabase = createClient();
  return keys.map(
    (url) =>
      supabase.storage
        .from(process.env.SUPABASE_BUCKET_ID! as string)
        .getPublicUrl(url).data.publicUrl,
  );
}
