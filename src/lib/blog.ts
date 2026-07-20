import { allPosts } from "content-collections";
import { parseBlogPublishedDate } from "@/lib/utils";

export const blogPosts = [...allPosts].sort(
  (a, b) =>
    (parseBlogPublishedDate(b.publishedAt)?.getTime() ?? 0) -
    (parseBlogPublishedDate(a.publishedAt)?.getTime() ?? 0),
);
