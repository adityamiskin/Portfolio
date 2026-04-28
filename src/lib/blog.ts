import { getBlogPosts } from "@/lib/utils";

/** Published MDX posts, newest first (same source as the blog index). */
export function getPublishedPosts() {
  return getBlogPosts();
}
