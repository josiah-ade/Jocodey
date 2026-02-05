"use client";

import { useCurrentUrl } from "@/lib/url";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

interface BlogMainProps {
  post: {
    title: string;
    author: string;
    contents: string;
    category: string;
    coverImage: string;
  };
}

export default function BlogMain({ post }: BlogMainProps) {
  const url = useCurrentUrl();

  return (
    <div className="lg:col-span-8 col-span-12">
      <div className="blog-details-desc">
        <div className="article-content">
          <h3>{post.title}</h3>
          <div className="entry-meta">
            <ul>
              <li>
                <span>Category:</span> <a href="#">{post.category}</a>
              </li>
              <li>
                <span>Posted By:</span> <a href="#">{post.author}</a>
              </li>
            </ul>
          </div>
          <div className="w-full mb-5">
            <img src={post.coverImage} alt="Cover Image" className="w-full" />
          </div>

          {/* Social Share */}
          <div className="article-hed">
            <div className="article-share">
              <ul className="social flex items-center gap-4">
                <li>
                  <span>Share:</span>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      url
                    )}`}
                    className="text-blue-600 hover:text-blue-800 !flex !items-center !justify-center"
                  >
                    <FaFacebookF className="w-5 h-5" />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      url
                    )}&text=${encodeURIComponent(post.title)}`}
                    className="text-sky-500 hover:text-sky-700 !flex !items-center !justify-center"
                  >
                    <FaTwitter className="w-5 h-5" />
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                      url
                    )}`}
                    className="text-blue-700 hover:text-blue-900 !flex !items-center !justify-center"
                  >
                    <FaLinkedinIn className="w-5 h-5" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Post contents */}
          <div dangerouslySetInnerHTML={{ __html: post.contents }} />
        </div>

        {/* Footer: Tags + Share */}
        <div className="article-footer">
          {/* <div className="article-tags">
            <span>Tag:</span>
            {tags.map((tag, i) => (
              <Link key={i} href={`/blog/tags?filter=${tag.toLowerCase()}`}>
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </Link>
            ))}
          </div> */}

          <div className="article-share">
            <ul className="social flex items-center gap-4">
              <li>
                <span>Share:</span>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    url
                  )}`}
                  className="text-blue-600 hover:text-blue-800 !flex !items-center !justify-center"
                >
                  <FaFacebookF className="w-5 h-5" />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    url
                  )}&text=${encodeURIComponent(post.title)}`}
                  className="text-sky-500 hover:text-sky-700 !flex !items-center !justify-center"
                >
                  <FaTwitter className="w-5 h-5" />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    url
                  )}`}
                  className="text-blue-700 hover:text-blue-900 !flex !items-center !justify-center"
                >
                  <FaLinkedinIn className="w-5 h-5" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
