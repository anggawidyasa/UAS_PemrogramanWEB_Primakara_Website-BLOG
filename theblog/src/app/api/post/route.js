import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { posts } from "../../../lib/db/schema";
import { count } from "drizzle-orm";

export async function GET(req, res) {
  try {
    const qs = getQSParamFromURL("page", req.url);
    console.log(qs);
    const listPosts = await db.select().from(posts).limit(3).offset(qs);
    const totalPost = await db.select({ value: count() }).from(posts);

    console.log(totalPost);
    const numberPosts = totalPost[0].value;
    const totalPagination = Math.ceil(numberPosts / 3);
    console.log(totalPagination);

    const pagination = [];
    for (let i = 0; i < totalPagination; i++) {
      pagination.push(i);
    }
    console.log(pagination);
    return NextResponse.json({ data: listPosts, pagination: pagination });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}

export async function POST(req, res) {
  try {
    const body = await req.json();
    console.log(body);
    const createPost = await db
      .insert(posts)
      .values([
        {
          title: body.title,
          image: body.image,
          deskripsi: body.deskripsi,
          tag: body.tag,
          password: body.password,
        },
      ])
      .returning();
    return NextResponse.json({ data: createPost });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}

export function getQSParamFromURL(key, url) {
  if (!url) return "";
  const search = new URL(url).search;
  const urlParams = new URLSearchParams(search);
  return urlParams.get(key);
}
