import { TextScramble } from "@/components/text-scramble";
import { formatBlogDateShort } from "@/lib/utils";
import { getBlogPosts } from "@/lib/blog";
import { pageDescriptions } from "@/lib/seo";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: pageDescriptions.blog,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Aditya Miskin",
    description: pageDescriptions.blog,
    url: "/blog",
  },
};

const Blogs = () => {
  const blogs = getBlogPosts();

  return (
    <main className="font-body">
      <h1 className="mb-8 text-4xl font-bold lowercase text-foreground tracking-wider">
        <span className="accent-glow text-primary mr-2">*</span>
        <TextScramble as="span" className="font-geist-pixel">blog</TextScramble>
      </h1>
      <div className="space-y-8">
      {blogs.map((blog) => (
        <article
          key={blog.slug}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-16"
        >
          <div className="hidden md:block col-span-1 md:col-span-3 mb-2 text-sm font-medium tabular-nums text-muted-foreground lowercase md:mb-0">
            <div>{formatBlogDateShort(blog.metadata.publishedAt)}</div>
          </div>
          <div className="col-span-1 md:col-span-9 space-y-2">
            <div>
              <div className="mb-1 text-sm font-medium tabular-nums text-muted-foreground lowercase md:hidden">
                {formatBlogDateShort(blog.metadata.publishedAt)}
              </div>
              <h2 className="text-base font-semibold leading-snug text-foreground lowercase">
                <Link
                  className="transition-colors hover:text-brand"
                  href={`/blog/${blog.slug}`}
                >
                  {blog.metadata.title}
                </Link>
              </h2>
            </div>
            {blog.metadata.description && (
              <p className="leading-relaxed text-foreground lowercase">
                {blog.metadata.description}
              </p>
            )}
          </div>
        </article>
      ))}
      </div>
    </main>
  );
};

export default Blogs;
