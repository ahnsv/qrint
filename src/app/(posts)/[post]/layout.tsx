import Sidebar from "@/components/ui/sidebar";
import { createClient } from "@/lib/supabase/server";

export default async function NewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const { data, error } = await supabase.from("posts").select("slug, id");
  if (error) {
    console.error(error);
  }

  return (
    <div className="flex w-screen h-screen">
      <Sidebar
        contents={data?.map((post) => ({
          slug: post.slug,
          href: `/${post.slug}`,
          activated: true,
          label: post.slug,
        }))}
      />
      <main className="px-8 py-4 w-5/6 h-full">{children}</main>
      <footer></footer>
    </div>
  );
}
