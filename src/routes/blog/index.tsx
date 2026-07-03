import { Link, createFileRoute } from "@tanstack/react-router";
import { TextScramble } from "@/components/text-scramble";
import { buildSeoHead, pageDescriptions, siteName } from "@/lib/seo";
import { formatBlogDateShort, getBlogPosts } from "@/lib/utils";

export const Route = createFileRoute("/blog/")({
  head: () =>
    buildSeoHead({
      title: `Blog | ${siteName}`,
      description: pageDescriptions.blog,
      path: "/blog",
    }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const blogs = getBlogPosts();

  return (
    <main className="font-body">
      <h1 className="mb-8 text-4xl font-medium lowercase text-foreground tracking-wider">
        <span className="accent-glow text-primary mr-2">*</span>
        <TextScramble as="span" className="font-geist-pixel font-medium">
          blog
        </TextScramble>
      </h1>
      <div className="space-y-8">
        {blogs.map((blog) => (
          <article
            key={blog.slug}
            className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-16"
          >
            <div className="hidden mb-2 text-sm font-medium tabular-nums text-muted-foreground lowercase md:col-span-3 md:mb-0 md:block">
              <div>{formatBlogDateShort(blog.metadata.publishedAt)}</div>
            </div>
            <div className="col-span-1 space-y-2 md:col-span-9">
              <div>
                <div className="mb-1 text-sm font-medium tabular-nums text-muted-foreground lowercase md:hidden">
                  {formatBlogDateShort(blog.metadata.publishedAt)}
                </div>
                <h2 className="text-base font-semibold leading-snug text-foreground lowercase">
                  <Link
                    className="transition-colors hover:text-brand"
                    to="/blog/$slug"
                    params={{ slug: blog.slug }}
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
}
