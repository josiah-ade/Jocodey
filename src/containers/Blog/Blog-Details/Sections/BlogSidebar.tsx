"use client";

import Link from "next/link";

interface BlogSidebarProps {
  similarPosts: {
    title: string;
    slug: string;
    category: string;
    author: string;
    coverImage: string;
  }[];
}

export default function BlogSidebar({ similarPosts }: BlogSidebarProps) {
  return (
    <div className="lg:col-span-4 col-span-12 mt-8">
      <aside className="widget-area" id="secondary">
        <section className="widget widget_techvio_posts_thumb">
          <h3 className="widget-title">Similar Posts</h3>
          <div className="grid grid-cols-1 gap-2 mt-6">
            {similarPosts.map((row, index) => (
              <div key={index} className="w-full">
                <Link
                  href={`/blog/details/${row.slug}`}
                  className="blog-link-single"
                >
                  <div className="blog-single-item !mb-0">
                    <div className="blog-s-image">
                      <img src={row.coverImage} alt="image" />
                    </div>
                    <div className="blog-description">
                      <div className="blog-info">
                        <h6>{row.category}</h6>
                        {/* <p>{row.date}</p> */}
                      </div>
                      <div className="blog-text">
                        <h3>{row.title}</h3>
                      </div>
                      {/* <div className="blog-author">
                        <h6>
                          <span>by</span> {row.author}
                        </h6>
                      </div> */}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}
