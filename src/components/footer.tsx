import portfolio from "@/data/portfolio.json";

export function Footer() {
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
    <footer className="border-t border-border pt-10 mt-4 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <nav
          className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
          aria-label="Footer links"
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
        <p className="text-sm text-muted-foreground shrink-0">
          © {new Date().getFullYear()} {portfolio.name}
        </p>
      </div>
    </footer>
  );
}
