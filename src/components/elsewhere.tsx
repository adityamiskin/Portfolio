import portfolio from "@/data/portfolio.json";

export function Elsewhere() {
  const core: { label: string; href: string; external?: boolean }[] = [
    { label: "email", href: `mailto:${portfolio.email}` },
    { label: "x.com", href: portfolio.twitterUrl, external: true },
    { label: "github", href: portfolio.githubUrl, external: true },
    { label: "linkedin", href: portfolio.linkedinUrl, external: true },
  ];

  const links =
    portfolio.bookingUrl && portfolio.bookingUrl.length > 0
      ? [...core, { label: "book a call", href: portfolio.bookingUrl, external: true }]
      : core;

  return (
    <section className="border-t border-border/50 pt-8">
      <h2 className="mb-4 text-sm font-bold lowercase text-foreground font-body">
        <span className="text-primary">*</span>
        <span className="text-foreground"> elsewhere</span>
      </h2>
      <nav
        className="flex flex-wrap items-center gap-x-6 gap-y-2 font-body text-sm font-normal lowercase text-muted-foreground"
        aria-label="Elsewhere links"
      >
        {links.map(({ label, href, external }) => (
          <a
            key={label}
            href={href}
            className="hover:text-brand transition-colors"
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {label}
          </a>
        ))}
      </nav>
    </section>
  );
}
