import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  children: string;
  className?: string;
}

export function Markdown({ children, className = "" }: MarkdownProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="whitespace-pre-line mb-4 last:mb-0">{children}</p>,
          a: ({ href, children }) => (
            <a
              href={href || "#"}
              className="text-foreground underline underline-offset-4 decoration-muted-foreground/60 hover:text-brand hover:decoration-brand transition-colors"
            >
              {children}
            </a>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
