"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function CreatePost() {
  const router = useRouter();
  async function onSubmit(event) {
    // console.log("aaaaaaaa");
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData);
    console.log(payload);
    await fetch("api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then(() => router.push("/"));
  }
  return (
    <div className="Body">
      <div className="Header">
        <nav className="navbar">
          <Link href={`/`} type="button" className="navLogo">
            TheBlog
          </Link>
          <div className="navbar-list">
            <Link href={"/create-post"}>Add Post</Link>
            <a href="#">Blog</a>
            <a href="#">Projects</a>
            <a href="#">About</a>
            <a href="#">Newsletter</a>
          </div>
        </nav>
      </div>
      <div className="Section_Content">
        <form className="Create_Form" onSubmit={onSubmit}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="Title"
            placeholder="Your Blog Title"
          ></input>
          <label>Image</label>
          <input
            type="text"
            name="image"
            className="Thumbnail"
            placeholder="Paste Link Unsplash"
          ></input>
          <label>Artikel</label>
          <textarea
            className="Description"
            name="deskripsi"
            placeholder="Your Article Blog"
          ></textarea>
          <label>Tags</label>
          <input
            type="text"
            className="Tags"
            name="tag"
            placeholder="Adds Article Tags"
          ></input>
          <label>Password</label>
          <input
            type="password"
            className="Password"
            name="password"
            placeholder="Adds Article Password"
          ></input>
          <button type="submit" className="Button" name="button_submit">
            Submit Your Article
          </button>
        </form>
      </div>
    </div>
  );
}
