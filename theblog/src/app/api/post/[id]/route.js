import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { posts } from "@/lib/db/schema";

export async function GET(req, { params }) {
  try {
    const postbyid = await db.query.posts.findFirst({
      where: (post, { eq }) => eq(post.id, params.id),
    });
    console.log(params.id);
    return NextResponse.json({ data: postbyid });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}

export async function POST(req, { params }) {
  try {
    const body = await req.json();
    console.log(body);
    await db.delete(posts).where(eq(posts.id, params.id));

    return NextResponse.json({ data: {} });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
