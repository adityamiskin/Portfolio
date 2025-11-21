import portfolio from "@/data/portfolio.json";

export default function UsesPage() {
  const { uses } = portfolio;

  return (
    <div className="space-y-12">
      {Object.entries(uses).map(([key, value]) => {
        // Handle Peripherals array separately
        if (Array.isArray(value)) {
          return (
            <div
              key={key}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-16"
            >
              <div className="col-span-1 md:col-span-3 text-muted-foreground text-sm font-medium mb-2 md:mb-0">
                {key}
              </div>
              <div className="col-span-1 md:col-span-9">
                <div className="space-y-4">
                  {value.map((peripheral, index) => (
                    <div key={index}>
                      <div className="text-foreground font-medium mb-2">
                        {peripheral.title}
                      </div>
                      <div className="text-muted-foreground">
                        {peripheral.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        // Handle objects with title and specs
        return (
          <div
            key={key}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-16"
          >
            <div className="col-span-1 md:col-span-3 text-muted-foreground text-sm font-medium mb-2 md:mb-0">
              {key}
            </div>
            <div className="col-span-1 md:col-span-9">
              <div className="text-foreground font-medium mb-2">
                {value.title}
              </div>
              <div className="text-muted-foreground">
                {Array.isArray(value.specs) && value.specs.length > 0
                  ? value.specs.map((spec, index) => {
                      const isLast = index === value.specs.length - 1;
                      if (typeof spec === "string") {
                        return (
                          <span key={index}>
                            {spec}
                            {!isLast && ", "}
                          </span>
                        );
                      }
                      // Handle object with text and url
                      return (
                        <span key={index}>
                          <a
                            href={spec.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-foreground transition-colors"
                          >
                            {spec.text}
                          </a>
                          {!isLast && ", "}
                        </span>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
