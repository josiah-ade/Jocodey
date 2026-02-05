"use client";

import Link from "next/link";

interface BlogCardProps {
  slug: string;
  image: string;
  category: string;
  title: string;
  author: string;
}

export default function BlogCard({
  slug,
  image,
  category,
  title,
  author,
}: BlogCardProps) {
  return (
    <Link href={`blog/details/${slug}`} className="blog-link-single">
      <div className="blog-single-item">
        <div className="blog-image">
          <img src={image} alt={title} className="w-full h-auto" />
        </div>
        <div className="blog-description">
          <div className="blog-info">
            <h6>{category}</h6>
            {/* <p>{date}</p> */}
          </div>
          <div className="blog-text">
            <h3>{title}</h3>
          </div>
          <div className="blog-author">
            <h6>
              <span>by</span> {author}
            </h6>
          </div>
        </div>
      </div>
    </Link>
  );
}
