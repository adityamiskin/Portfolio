import portfolioData from "@/data/portfolio.json";
import { Contributions } from "@/components/contributions";
import { Activity } from "@/components/kibo-ui/contribution-graph";

interface SectionProps {
  title: string;
  children?: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-16">
      <div className="col-span-1 md:col-span-3 text-muted-foreground text-sm font-medium mb-2 md:mb-0">
        {title}
      </div>
      <div className="col-span-1 md:col-span-9">{children}</div>
    </div>
  );
}

const username = "adityamiskin";
const getCachedContributions = async () => {
  const url = new URL(
    `/v4/${username}`,
    "https://github-contributions-api.jogruber.de"
  );
  const response = await fetch(url);
  const data = (await response.json()) as {
    total: { [year: string]: number };
    contributions: Activity[];
  };
  const total = data.total[new Date().getFullYear()];
  const TOTAL_SQUARES = 417;

  const sortedData = data.contributions.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return { contributions: sortedData.slice(0, TOTAL_SQUARES), total };
};

export default async function Home() {
  const { contributions, total } = await getCachedContributions();
  return (
    <main>
      <div className="space-y-12">
        <Section title="About">
          <p className="text-muted-foreground">{portfolioData.about}</p>
        </Section>

        <Section title="Recent GitHub Activity">
          <Contributions data={contributions} />
        </Section>

        <Section title="Experience">
          <div className="space-y-8">
            {portfolioData.experience.map((exp, index) => (
              <div key={index}>
                <div className="mb-3">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground font-medium underline underline-offset-4 hover:text-muted-foreground transition-colors"
                    href={exp.url}
                  >
                    {exp.company}
                  </a>
                  <span className="text-muted-foreground ml-2">{exp.role}</span>
                </div>
                <div className="text-muted-foreground leading-relaxed mb-3">
                  {exp.description}
                </div>
                <div className="text-muted-foreground text-xs">
                  {exp.period} — {exp.location}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Education">
          <div className="flex justify-between">
            <div>
              <div className="mb-2">
                <span className="text-foreground font-medium">
                  {portfolioData.education.school}
                </span>
              </div>
              <div className="text-muted-foreground">
                {portfolioData.education.degree}
              </div>
            </div>
            <div className="text-muted-foreground">
              {portfolioData.education.period}
            </div>
          </div>
        </Section>

        <Section title="Skills">
          <div className="text-muted-foreground leading-relaxed">
            {portfolioData.skills.join("; ")}
          </div>
        </Section>

        <Section title="Interests">
          <div className="text-muted-foreground leading-relaxed">
            {portfolioData.interests.join("; ")}
          </div>
        </Section>
      </div>
    </main>
  );
}
