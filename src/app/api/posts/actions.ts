"use server";
import { createClient } from "@/lib/supabase/server";

export async function createPost(
  slug: string,
  fileURLs: string[],
  userID: string,
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("posts")
    .upsert([
      {
        slug,
        file_urls: fileURLs,
        user_id: userID,
      },
    ])
    .select("*");

  if (error) {
    console.error("error", error);
    throw error;
  }

  return {
    data,
    error,
  };
}

export async function deletePost(slug: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("posts")
    .delete()
    .eq("slug", slug);

  if (error) {
    console.error("error", error);
    throw error;
  }

  return {
    data,
    error,
  };
}
