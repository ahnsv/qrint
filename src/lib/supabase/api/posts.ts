import { notFound } from "next/navigation";
import { createClient } from "../server";

export async function getPost(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*, users(email, id)")
    .eq("slug", decodeURIComponent(slug))
    .single();

  if (error) {
    console.error(error);
    return notFound();
  }
  return data;
}
export async function getPosts() {}
