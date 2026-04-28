import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import Img from "@/components/Img";
import {
  formatBlogDate,
  getBlogPosts,
  getBlogReadingMinutes,
  parseBlogPublishedDate,
} from "@/lib/utils";
import { Metadata } from "next";

// Generate static params at build time for instant navigation
export async function generateStaticParams() {
  return getBlogPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    return {
      title: "Post not found",
      description: "The blog post you're looking for doesn't exist.",
    };
  }

  const published = parseBlogPublishedDate(post.metadata.publishedAt);
  const publishedTime = published ? published.toISOString() : post.metadata.publishedAt;

  return {
    title: post.metadata.title,
    description: post.metadata.description || "Aditya Miskin's blog",
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description || "Aditya Miskin's blog",
      type: "article",
      publishedTime,
      images: post.metadata.image
        ? [
            {
              url: post.metadata.image,
              alt: post.metadata.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metadata.title,
      description: post.metadata.description || "Aditya Miskin's blog",
      images: post.metadata.image ? [post.metadata.image] : [],
    },
  };
}

const components = { Img };

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  const readingMinutes = getBlogReadingMinutes(post.content);

  return (
    <article className="font-body space-y-10">
      <Link
        href="/blog"
        className="inline-block text-base font-medium text-brand hover:text-brand/85 transition-colors"
      >
        ← back
      </Link>

      <header className="space-y-3">
        <h1 className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
          <span
            className="accent-glow shrink-0 text-primary select-none"
            aria-hidden
          >
            *
          </span>
          <span>{post.metadata.title}</span>
        </h1>
        <p className="text-sm font-medium tabular-nums text-muted-foreground">
          {formatBlogDate(post.metadata.publishedAt)} · {readingMinutes}{" "}
          min read
        </p>
      </header>

      <div
        className="blog-post-mdx prose prose-base max-w-none text-foreground prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:text-foreground prose-p:leading-relaxed prose-a:text-brand prose-a:no-underline prose-a:underline-offset-4 prose-a:hover:text-brand/85 dark:prose-invert"
      >
        <MDXRemote source={post.content} components={components} />
      </div>
    </article>
  );
}
