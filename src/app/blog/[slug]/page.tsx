import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import Img from "@/components/Img";
import TwitterEmbed from "@/components/TwitterEmbed";
import { formatDate, getBlogPosts } from "@/lib/utils";
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
      title: "Post Not Found",
      description: "The blog post you're looking for doesn't exist.",
    };
  }

  return {
    title: post.metadata.title,
    description: post.metadata.description || "Aditya Miskin's blog",
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description || "Aditya Miskin's blog",
      type: "article",
      publishedTime: post.metadata.publishedAt,
      images: post.metadata.image
        ? [
            {
              url: post.metadata.image,
              alt: post.metadata.title,
            },
          ]
        : [],
      tags: post.metadata.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metadata.title,
      description: post.metadata.description || "Aditya Miskin's blog",
      images: post.metadata.image ? [post.metadata.image] : [],
    },
  };
}

const components = { Img, TwitterEmbed };

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-16">
      <div className="col-span-1 md:col-span-3 text-muted-foreground text-sm font-medium mb-2 md:mb-0">
        <Link href="/blog" className="hover:text-foreground transition-colors">
          ← back to blog
        </Link>
      </div>
      <div className="col-span-1 md:col-span-9">
        <div className="mb-8">
          <h1 className="text-foreground font-medium text-lg mb-2">
            {post.metadata.title}
          </h1>
          <div className="text-muted-foreground text-xs">
            {formatDate(post.metadata.publishedAt)}
          </div>
        </div>
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6 dark:prose-invert">
          <MDXRemote source={post.content} components={components} />
        </div>
      </div>
    </div>
  );
}
