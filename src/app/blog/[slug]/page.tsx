import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import Img from "@/components/Img";
import TwitterEmbed from "@/components/TwitterEmbed";
import { formatDate, getBlogPosts } from "@/lib/utils";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";
import { ViewTransition } from "react";

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
    <div className="space-y-8">
      <div className="text-muted-foreground text-sm font-medium">
        <Link href="/blog" className="hover:text-foreground transition-colors">
          ← back
        </Link>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <ViewTransition name={`blog-${post.metadata.title}`}>
            <h1 className="text-foreground font-medium text-lg">
              {post.metadata.title}
            </h1>
          </ViewTransition>
          <div className="text-muted-foreground text-sm">
            {formatDate(post.metadata.publishedAt)}
          </div>

          {post.metadata.tags && (
            <div className="flex flex-wrap gap-2 items-center">
              <Tag className="w-4 h-4" />
              {post.metadata.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <div className="prose prose-base max-w-none text-muted-foreground space-y-6 dark:prose-invert">
          <MDXRemote source={post.content} components={components} />
        </div>
      </div>
    </div>
  );
}
