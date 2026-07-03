import { Link, createFileRoute } from "@tanstack/react-router";
import {
  absoluteUrl,
  buildSeoHead,
  siteName,
} from "@/lib/seo";
import {
  formatBlogDate,
  getBlogPostComponent,
  getBlogPosts,
  getBlogReadingMinutes,
  parseBlogPublishedDate,
} from "@/lib/utils";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => getBlogPosts().find((post) => post.slug === params.slug) ?? null,
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return buildSeoHead({
        title: "Post not found",
        description: "The blog post you're looking for doesn't exist.",
        path: `/blog/${params.slug}`,
      });
    }

    const published = parseBlogPublishedDate(loaderData.metadata.publishedAt);
    const publishedTime = published
      ? published.toISOString()
      : loaderData.metadata.publishedAt;

    return buildSeoHead({
      title: `${loaderData.metadata.title} | ${siteName}`,
      description: loaderData.metadata.description || `${siteName}'s blog`,
      path: `/blog/${loaderData.slug}`,
      image: loaderData.metadata.image,
      type: "article",
      publishedTime,
    });
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const post = Route.useLoaderData();

  if (!post) {
    return <div>Post not found</div>;
  }

  const readingMinutes = getBlogReadingMinutes(post.content);
  const published = parseBlogPublishedDate(post.metadata.publishedAt);
  const publishedTime = published ? published.toISOString() : post.metadata.publishedAt;
  const MdxBody = getBlogPostComponent(post.slug);

  return (
    <article className="font-body space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            description: post.metadata.description,
            image: post.metadata.image ? [post.metadata.image] : undefined,
            datePublished: publishedTime,
            dateModified: publishedTime,
            author: {
              "@type": "Person",
              name: siteName,
              url: absoluteUrl("/"),
            },
            publisher: {
              "@type": "Person",
              name: siteName,
              url: absoluteUrl("/"),
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": absoluteUrl(`/blog/${post.slug}`),
            },
          }),
        }}
      />
      <Link
        to="/blog"
        className="inline-block text-base font-medium text-brand hover:text-brand/85 transition-colors"
      >
        ← back
      </Link>

      <header className="space-y-3">
        <h1 className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-3xl font-medium leading-tight tracking-tight text-foreground md:text-4xl">
          <span
            className="accent-glow shrink-0 text-primary select-none"
            aria-hidden
          >
            *
          </span>
          <span>{post.metadata.title}</span>
        </h1>
        <p className="text-sm font-medium tabular-nums text-muted-foreground">
          {formatBlogDate(post.metadata.publishedAt)} · {readingMinutes} min read
        </p>
      </header>

      <div className="blog-post-mdx prose prose-base max-w-none text-foreground prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:text-foreground prose-p:leading-relaxed prose-a:text-brand prose-a:no-underline prose-a:underline-offset-4 prose-a:hover:text-brand/85 dark:prose-invert prose-figure:my-8 prose-img:mx-auto prose-img:max-w-full prose-img:rounded-md [&_figure_img]:w-full [&_figcaption]:mt-2 [&_figcaption]:block [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:leading-relaxed [&_figcaption]:text-muted-foreground">
        {MdxBody ? <MdxBody /> : <div>Post not found</div>}
      </div>
    </article>
  );
}
