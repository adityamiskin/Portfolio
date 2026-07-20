import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { formatBlogDate, parseBlogPublishedDate } from "@/lib/utils";
import { blogPosts } from "@/lib/blog";
import { getBlogPostComponent } from "@/lib/blog-components";
import { absoluteUrl, siteName } from "@/lib/seo";
import { pageHead } from "@/lib/meta";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = blogPosts.find((candidate) => candidate.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return pageHead({
        title: "Post not found",
        description: "The blog post you're looking for doesn't exist.",
        path: `/blog/${params.slug}`,
      });
    }

    const published = parseBlogPublishedDate(loaderData.publishedAt);
    const head = pageHead({
      title: loaderData.title,
      description: loaderData.description ?? "Aditya Miskin's blog",
      path: `/blog/${params.slug}`,
      image: loaderData.image,
      twitterImage: loaderData.image,
      type: "article",
    });

    return {
      ...head,
      meta: [
        ...head.meta,
        {
          property: "article:published_time",
          content: published?.toISOString() ?? loaderData.publishedAt,
        },
        { property: "article:author", content: siteName },
      ],
    };
  },
  component: Post,
});

function Post() {
  const post = Route.useLoaderData();
  const { slug } = Route.useParams();
  const MdxBody = getBlogPostComponent(slug);
  if (!MdxBody) throw notFound();

  const published = parseBlogPublishedDate(post.publishedAt);
  const publishedTime = published?.toISOString() ?? post.publishedAt;

  return (
    <article className="space-y-10 font-body">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            image: post.image ? [post.image] : undefined,
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
              "@id": absoluteUrl(`/blog/${slug}`),
            },
          }),
        }}
      />
      <Link
        to="/blog"
        className="inline-block text-base font-medium text-brand transition-colors hover:text-brand/85"
      >
        ← back
      </Link>

      <header className="space-y-3">
        <h1 className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
          <span className="accent-glow shrink-0 select-none text-primary" aria-hidden>
            *
          </span>
          <span>{post.title}</span>
        </h1>
        <p className="text-sm font-medium tabular-nums text-muted-foreground">
          {formatBlogDate(post.publishedAt)} · {post.readingMinutes} min read
        </p>
      </header>

      <div className="blog-post-mdx prose prose-base max-w-none text-foreground prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:text-foreground prose-p:leading-relaxed prose-a:text-brand prose-a:no-underline prose-a:underline-offset-4 prose-a:hover:text-brand/85 dark:prose-invert prose-figure:my-8 prose-img:mx-auto prose-img:max-w-full prose-img:rounded-md [&_figcaption]:mt-2 [&_figcaption]:block [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:leading-relaxed [&_figcaption]:text-muted-foreground [&_figure_img]:w-full">
        <MdxBody />
      </div>
    </article>
  );
}
