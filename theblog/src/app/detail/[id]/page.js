"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Detail({ params }) {
  const router = useRouter();
  let [post, setPost] = useState(null);
  useEffect(() => {
    fetch(`/api/post/${params?.id}`)
      .then((response) => response.json())
      // 4. Setting dogImage to the image url that we received from the response above
      .then((data) => {
        setPost(data.data);
      });
  }, []);

  async function onSubmit(event) {
    // console.log("aaaaaaaa");
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData);
    console.log(payload);
    if (payload.password === post?.password) {
      await fetch(`/api/post/${params?.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }).then(() => router.push("/"));
    } else {
      console.log("password salah");
    }
  }

  return (
    <div className="body">
      {/* Header */}
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
      {/* Header Akhir */}
      {/* Main Section */}
      <section className="MainSectionDetail">
        <div className="Detail_Container">
          {post && (
            <div className="Blog_Detail">
              <Image
                src={post?.image}
                width={600}
                height={300}
                alt="Picture of the author"
              />
              <h2>{post?.title}</h2>
              <h3>
                <span>{post?.createdAt}</span>
              </h3>
              <p className="BlogText">{post?.deskripsi}</p>
              {/* <div className="secondImg">
            <Image
              src="/images/blog_photoTwo.png"
              width={400}
              height={250}
              alt="Picture of the author"
            />
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut
              fugit iusto velit, repellat minima adipisci aspernatur?
              <br />
              <br />
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum
              corporis placeat quidem quos natus suscipit animi itaque
              assumenda magni ipsa unde velit facilis consectetur at explicabo
              in aliquid architecto provident modi ab ea, totam!
            </p>
          </div> */}
              <div className="box">
                <p className="boxTags">
                  Tags:
                  <a href="" className="tags">
                    {post?.tag}
                  </a>
                </p>
                <div className="social">
                  <p>Share to:&nbsp;&nbsp;</p>
                  <i className="Social Media">
                    <Image
                      src="/social-media-btn.svg"
                      width={16}
                      height={16}
                      alt="Picture of the author"
                    />
                  </i>
                  <i className="Social Media">
                    <Image
                      src="/social-media-btn-1.svg"
                      width={16}
                      height={16}
                      alt="Picture of the author"
                    />
                  </i>
                  <i className="Social Media">
                    <Image
                      src="/social-media-btn-2.svg"
                      width={16}
                      height={16}
                      alt="Picture of the author"
                    />
                  </i>
                  <i className="Social Media">
                    <Image
                      src="/social-media-btn-3.svg"
                      width={16}
                      height={16}
                      alt="Picture of the author"
                    />
                  </i>
                  <i className="Social Media">
                    <Image
                      src="/social-media-btn-4.svg"
                      width={16}
                      height={16}
                      alt="Picture of the author"
                    />
                  </i>
                </div>
              </div>
            </div>
          )}
        </div>
        <form onSubmit={onSubmit}>
          <label>Delete This Article</label>
          <input
            type="password"
            className="Password"
            name="password"
            placeholder="Password Article"
          ></input>
          <button type="submit" className="Button">
            Delete Article
          </button>
        </form>
      </section>
    </div>
  );
}
