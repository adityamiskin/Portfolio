import { Badge } from "@/components/ui/badge";
import { getBlogPosts, formatDate } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "react";

export const metadata: Metadata = {
  title: "Aditya Miskin - Blog",
  description: "Blog posts by Aditya Miskin",
};

const Blogs = () => {
  const blogs = getBlogPosts();

  return (
    <div className="space-y-8">
      {blogs.map((blog) => (
        <article
          key={blog.slug}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-16"
        >
          <div className="hidden md:block col-span-1 md:col-span-3 text-muted-foreground text-sm font-medium mb-2 md:mb-0">
            <div>{formatDate(blog.metadata.publishedAt)}</div>
          </div>
          <div className="col-span-1 md:col-span-9 space-y-2">
            <div>
              <ViewTransition name={`blog-${blog.metadata.title}`}>
                <h2 className="text-foreground font-medium text-lg md:text-sm">
                  <Link
                    className="hover:underline underline-offset-4"
                    href={`/blog/${blog.slug}`}
                  >
                    {blog.metadata.title}
                  </Link>
                </h2>
              </ViewTransition>
              <div className="md:hidden text-muted-foreground text-sm font-medium mt-1">
                {formatDate(blog.metadata.publishedAt)}
              </div>
            </div>
            {blog.metadata.description && (
              <p className="text-muted-foreground leading-relaxed">
                {blog.metadata.description}
              </p>
            )}
            {blog.metadata.tags && (
              <div className="flex flex-wrap gap-2">
                {blog.metadata.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
};

export default Blogs;
