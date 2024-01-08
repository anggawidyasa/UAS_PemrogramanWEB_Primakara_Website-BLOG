"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  let [posts, setPosts] = useState([]);
  let [inPage, setInPage] = useState(0);
  let [pagination, setpagination] = useState([]);

  useEffect(() => {
    fetch(`/api/post?page=${inPage}`)
      .then((response) => response.json())
      // 4. Setting dogImage to the image url that we received from the response above
      .then((data) => {
        setPosts(data.data);
        setpagination(data.pagination);
      });
  }, [inPage]);

  console.log(posts);
  return (
    /* Body */
    <div className="Body">
      {/* Header */}
      <div className="Header">
        <nav className="navbar">
          <button type="button" className="navLogo">
            TheBlog
          </button>
          <div className="navbar-list">
            <Link href={"/create-post"}>Add Post</Link>
            <a href="#">Blog</a>
            <a href="#">Projects</a>
            <a href="#">About</a>
            <a href="#">Newsletter</a>
          </div>
        </nav>
      </div>
      {/* Header */}
      {/* Section Content */}
      {/* Banner */}
      <div className="Section_Content">
        <div className="banner">
          <a href="#" className="navLogo">
            THE BLOG
          </a>
        </div>
      </div>
      {/* Banner */}
      <main>
        {/* Feature Blog */}
        <div className="feature">
          <div className="topImg">
            <Image
              src="/images/topContent.png"
              width={592}
              height={246}
              alt="Picture of the author"
            />
          </div>
          <div className="topBlog">
            <p className="blogWriter">Olivia Rhye • 1 Jan 2023</p>
            <h2 className="blogTitle">
              Grid System for better Design User Interface
            </h2>
            <p className="blogDesc">
              A grid system is a design tool used to arrange content on a
              webpage. It is a series of vertical and horizontal lines that
              create a matrix of intersecting points,which can be used to align
              and organize page elements. Grid systems are used to create a
              consistent look and feel across a website, and can help to make
              the layout more visually appealing and easier to navigate.
            </p>
            <p2 className="tags" id="purple">
              Design
            </p2>
            <p2 className="tags" id="magenta">
              Interface
            </p2>
          </div>
        </div>
        {/* Feature Blog */}
        {/* Catalog Blog */}
        <div className="Catalog_Container">
          <h1>All Blog Posts</h1>
          <div className="contentWrap">
            {/* Card 1 */}
            {posts &&
              posts?.map((post) => (
                <Link
                  href={`/detail/${post?.id}`}
                  key={post?.id}
                  className="Blog"
                >
                  <div>
                    <Image
                      src={post?.image}
                      width={592}
                      height={246}
                      alt="Picture of the author"
                    />
                  </div>
                  <p className="blogWriter">{post?.createdAt}</p>
                  <h2 className="blogTitle">{post?.title}</h2>
                  <p className="blogDesc">{post?.deskripsi}</p>
                  <p className="tags" id="purple">
                    {post?.tag}
                  </p>
                </Link>
              ))}
          </div>
        </div>
        {/* Catalog Blog */}
      </main>
      <section className="pagination">
        <div>
          {/* <a href="" id="previous">
            <Image src="/arrow-left.svg" width={20} height={20} alt="Icon" />
            Previous
          </a> */}
        </div>
        <div className="pageNumber">
          {pagination &&
            pagination?.map((page) =>
              page === inPage ? (
                <div
                  onClick={() => {
                    setInPage(page);
                  }}
                  key={page}
                  className="selectedNumber"
                >
                  <span>{page + 1}</span>
                </div>
              ) : (
                <div
                  onClick={() => {
                    setInPage(page);
                  }}
                  key={page}
                >
                  {page + 1}
                </div>
              )
            )}
        </div>
        <div>
          {/* <a href="" id="next">
            Next
            <Image src="/arrow-right.svg" width={20} height={20} alt="Icon" />
          </a> */}
        </div>
      </section>
      {/*  Akhir Section Content */}
    </div>
    /* Akhir Body */
  );
}
