"use server";

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase";

export async function POST(req: NextRequest, res: NextResponse) {
  const supabase = createClient();

  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const paths = [];
    for (const file of files) {
      const name = file.name;
      const { data, error } = await supabase.storage
        .from(process.env.SUPABASE_BUCKET_ID! as string)
        .upload(`public/${name}`, file, {
          cacheControl: "3600",
          upsert: true,
        });
      if (error) {
        console.error(error);
        throw error;
      }
      paths.push(data.fullPath);
    }

    return NextResponse.json({
      status: "success",
      data: {
        paths,
      },
    });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
