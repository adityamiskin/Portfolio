import ReactMarkdown from "react-markdown";
import { Link } from "@tanstack/react-router";

interface MarkdownProps {
  children: string;
  className?: string;
}

export function Markdown({ children, className = "" }: MarkdownProps) {
  const renderLink = (href: string | undefined, content: React.ReactNode) => {
    if (!href) {
      return <span>{content}</span>;
    }

    if (/^https?:\/\//i.test(href)) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline underline-offset-4 decoration-muted-foreground/60 hover:text-brand hover:decoration-brand transition-colors"
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        to={href}
        className="text-foreground underline underline-offset-4 decoration-muted-foreground/60 hover:text-brand hover:decoration-brand transition-colors"
      >
        {content}
      </Link>
    );
  };

  return (
    <div className={className}>
      <ReactMarkdown
        components={{
          p: ({ children }) => (
            <p className="whitespace-pre-line mb-4 last:mb-0">{children}</p>
          ),
          a: ({ href, children }) => renderLink(href, children),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
