import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export function BlogSection() {
  const posts = blogPosts.slice(0, 4);

  return (
    <section className="mb-12 pt-10 border-t border-border">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="text-2xl font-semibold flex items-center text-foreground tracking-wider">
          <span className="text-brand accent-glow mr-2">*</span>
          <span className="font-geist-pixel">blog</span>
        </h2>
        <Link
          to="/blog"
          className="inline-flex items-center gap-1 text-sm text-brand hover:text-brand/85 transition-colors group"
        >
          all posts{" "}
          <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </div>
      <div className="space-y-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4"
          >
            <span className="text-sm text-muted-foreground sm:w-28 shrink-0 tabular-nums">
              {formatDate(post.publishedAt)}
            </span>
            <span className="text-foreground group-hover:text-brand transition-colors duration-200 lowercase">
              {post.title.toLowerCase()}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
