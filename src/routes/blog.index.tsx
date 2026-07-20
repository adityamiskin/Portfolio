import { Link, createFileRoute } from "@tanstack/react-router";
import { TextScramble } from "@/components/text-scramble";
import { formatBlogDateShort } from "@/lib/utils";
import { blogPosts } from "@/lib/blog";
import { pageDescriptions } from "@/lib/seo";
import { pageHead } from "@/lib/meta";

export const Route = createFileRoute("/blog/")({
  head: () =>
    pageHead({
      title: "Blog",
      description: pageDescriptions.blog,
      path: "/blog",
    }),
  loader: () => blogPosts,
  component: Blogs,
});

function Blogs() {
  const blogs = Route.useLoaderData();

  return (
    <main className="font-body">
      <h1 className="mb-8 text-4xl font-bold lowercase tracking-wider text-foreground">
        <span className="accent-glow mr-2 text-primary">*</span>
        <TextScramble as="span" className="font-geist-pixel">
          blog
        </TextScramble>
      </h1>
      <div className="space-y-8">
        {blogs.map((blog) => (
          <article key={blog.slug} className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-16">
            <div className="col-span-1 mb-2 hidden text-sm font-medium tabular-nums lowercase text-muted-foreground md:col-span-3 md:mb-0 md:block">
              {formatBlogDateShort(blog.publishedAt)}
            </div>
            <div className="col-span-1 space-y-2 md:col-span-9">
              <div>
                <div className="mb-1 text-sm font-medium tabular-nums lowercase text-muted-foreground md:hidden">
                  {formatBlogDateShort(blog.publishedAt)}
                </div>
                <h2 className="text-base font-semibold leading-snug lowercase text-foreground">
                  <Link
                    className="transition-colors hover:text-brand"
                    to="/blog/$slug"
                    params={{ slug: blog.slug }}
                  >
                    {blog.title}
                  </Link>
                </h2>
              </div>
              {blog.description && (
                <p className="leading-relaxed lowercase text-foreground">{blog.description}</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
