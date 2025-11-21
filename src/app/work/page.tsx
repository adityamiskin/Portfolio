import Image from "next/image";
import { LuArrowUpRight } from "react-icons/lu";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

const ProjectListItem = ({ project }) => {
  const projectLink = project.link || project.github;
  const placeholderImage = `https://picsum.photos/seed/${project.title}/1200/800`;

  const content = (
    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-md">
      <Image
        src={placeholderImage}
        alt={`${project.title} preview`}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 100vw"
      />
      <ProgressiveBlur position="bottom" height="30%" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
      <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 z-20">
        <h2 className="text-white font-medium mb-2 text-xl md:text-2xl drop-shadow-lg inline-flex items-center gap-2">
          {project.title}
          {projectLink && (
            <LuArrowUpRight size={18} className="text-white/80" />
          )}
        </h2>
        <p className="text-white drop-shadow-lg leading-relaxed">
          {project.description}
        </p>
      </div>
    </div>
  );

  return (
    <article className="group">
      {projectLink ? (
        <a
          href={projectLink}
          target="_blank"
          rel="noreferrer"
          className="block"
        >
          {content}
        </a>
      ) : (
        <div>{content}</div>
      )}
    </article>
  );
};

const Work = () => {
  const projects = [
    {
      title: "Auditoor",
      description:
        "An AI tool for quickly understanding large Web3 codebases and identifying issues for rapid bug fixes.",
      link: "https://auditoor.xyz/",
    },
    {
      title: "Saastify",
      description:
        "End-to-End boilerplate specifically for startups to ship products quickly.",
      link: "https://saastify.vercel.app/",
    },
    {
      title: "ML Preprocessor CLI",
      description: "A CLI for preprocessing machine learning datasets.",
      github: "https://github.com/adityamiskin/ML-preprocessor-CLI",
    },
    {
      title: "Image Compressor",
      description: "An in-browser image compressor and resizer.",
      github: "https://github.com/adityamiskin/image-compressor",
    },
  ];

  return (
    <div className="space-y-8">
      {projects.map((project, index) => (
        <ProjectListItem key={index} project={project} />
      ))}
    </div>
  );
};

export default Work;
