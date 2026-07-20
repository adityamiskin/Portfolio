import portfolio from "@/data/portfolio.json";
import { EmailCard, GitHubCard, LinkedInCard, XCard } from "@/components/social-cards";

export function Footer() {
  return (
    <footer className="border-t border-border pt-10 mt-4 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <nav
          className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
          aria-label="Footer links"
        >
          <EmailCard />
          <XCard />
          <GitHubCard />
          <LinkedInCard />
          {portfolio.bookingUrl ? (
            <a
              href={portfolio.bookingUrl}
              className="hover:text-brand transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              book a call
            </a>
          ) : null}
        </nav>
        <p className="text-sm text-muted-foreground shrink-0 font-geist-pixel">
          © {new Date().getFullYear()} {portfolio.name}
        </p>
      </div>
    </footer>
  );
}
