import { getBlogPosts, formatDate } from "@/lib/utils";
import Link from "next/link";

const Blogs = () => {
  const blogs = getBlogPosts();

  return (
    <div className="space-y-8">
      {blogs.map((blog) => (
        <article
          key={blog.slug}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-16"
        >
          <div className="col-span-1 md:col-span-3 text-muted-foreground text-sm font-medium mb-2 md:mb-0">
            <div>{formatDate(blog.metadata.publishedAt)}</div>
          </div>
          <div className="col-span-1 md:col-span-9">
            <h2 className="text-foreground font-medium mb-2">
              <Link
                className="hover:underline underline-offset-4"
                href={`/blog/${blog.slug}`}
              >
                {blog.metadata.title}
              </Link>
            </h2>
            {blog.metadata.description && (
              <p className="text-muted-foreground leading-relaxed">
                {blog.metadata.description}
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
};

export default Blogs;
