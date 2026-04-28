import ReactMarkdown from "react-markdown";
import Link from "next/link";

interface MarkdownProps {
  children: string;
  className?: string;
}

export function Markdown({ children, className = "" }: MarkdownProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        components={{
          p: ({ children }) => (
            <p className="whitespace-pre-line mb-4 last:mb-0">{children}</p>
          ),
          a: ({ href, children }) => (
            <Link
              href={href || "#"}
              className="text-foreground hover:text-brand transition-colors"
            >
              {children}
            </Link>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
