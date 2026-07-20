import type { ComponentType } from "react";

type BlogModule = {
  default: ComponentType;
};

const postModules = import.meta.glob<BlogModule>("/posts/*.mdx", {
  eager: true,
});

function slugFromModulePath(modulePath: string) {
  return modulePath
    .split("/")
    .at(-1)
    ?.replace(/\.mdx$/, "");
}

export function getBlogPostComponent(slug: string): ComponentType | undefined {
  const entry = Object.entries(postModules).find(
    ([modulePath]) => slugFromModulePath(modulePath) === slug,
  );

  return entry?.[1].default;
}
