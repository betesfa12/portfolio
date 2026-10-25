import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { Project } from "@/lib/data";

function availableScreenshots(screenshots: string[] = []) {
  return screenshots.filter((src) => {
    if (!src.startsWith("/projects/") || src.includes("..")) return false;
    return existsSync(path.join(process.cwd(), "public", src.slice(1)));
  });
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const screenshots = availableScreenshots(project.screenshots);
  const overview = project.overview ?? project.problem;
  const links = [
    project.liveUrl && { label: "Visit project", href: project.liveUrl },
    project.link && { label: "Visit project", href: project.link },
    project.repo && { label: "View repository", href: project.repo },
  ].filter((link): link is { label: string; href: string } => Boolean(link));

  return (
    <article className="project-card" data-reveal>
      <div className="project-topline">
        <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
        <span>{project.year}</span>
      </div>
      <h3>{project.title}</h3>

      {overview && (
        <section className="case-study-block" aria-label={`${project.title} overview`}>
          <h4>Overview</h4>
          <p className="project-description">{overview}</p>
          {project.result && <p className="project-description">{project.result}</p>}
        </section>
      )}

      <section className="case-study-block role-block" aria-label="My role">
        <h4>My role</h4>
        <p className="project-description">{project.role}</p>
      </section>

      {project.features && project.features.length > 0 && (
        <section className="case-study-block" aria-label="Key features">
          <h4>Key features</h4>
          <ul className="project-features">
            {project.features.map((feature) => <li key={feature}>{feature}</li>)}
          </ul>
        </section>
      )}

      {project.tools && project.tools.length > 0 && (
        <section className="case-study-block">
          <h4>Tech stack</h4>
          <ul className="tool-list" aria-label="Technologies">
            {project.tools.map((tool) => <li key={tool}>{tool}</li>)}
          </ul>
        </section>
      )}

      {screenshots.length > 0 && (
        <div className="project-gallery" aria-label={`${project.title} screenshots`}>
          {screenshots.map((src) => (
            <Image key={src} src={src} alt={`${project.title} application screenshot`} width={960} height={600} />
          ))}
        </div>
      )}

      {links.length > 0 && (
        <section className="case-study-block">
          <h4>Links</h4>
          <div className="project-links">
            {links.map(({ label, href }) => (
              <a href={href} key={`${label}-${href}`} target="_blank" rel="noreferrer">
                {label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
