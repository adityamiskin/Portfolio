import { MDXRemote } from "next-mdx-remote/rsc";
import Img from "@/components/Img";
import TwitterEmbed from "@/components/TwitterEmbed";
import { formatDate, getBlogPosts } from "@/lib/utils";

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
    <article className="prose dark:prose-invert mx-auto">
      <p className="text-sm font-semibold text-center">
        {formatDate(post.metadata.publishedAt)}
      </p>

      <MDXRemote source={post.content} components={components} />
    </article>
  );
}
