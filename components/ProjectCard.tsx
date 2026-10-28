import { existsSync } from "node:fs";
import path from "node:path";
import type { Project } from "@/lib/data";
import ProjectGallery from "@/components/ProjectGallery";

function availableScreenshots(project: Project) {
  return (project.screenshots ?? []).filter(({ src }) => {
    if (!src.startsWith("/projects/") || src.includes("..")) return false;
    return existsSync(path.join(process.cwd(), "public", src.slice(1)));
  });
}

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const screenshots = availableScreenshots(project);
  const overview = project.overview ?? project.problem;
  const details = [
    { label: "Year", value: project.year },
    { label: "Role", value: project.role },
    { label: "Status", value: project.status },
  ].filter(({ value }) => value?.trim());
  const links: { label: string; href: string }[] = [];
  if (project.liveUrl?.trim()) links.push({ label: "Visit project", href: project.liveUrl.trim() });
  if (project.link?.trim()) links.push({ label: "Visit project", href: project.link.trim() });
  if (project.repo?.trim()) links.push({ label: "View repository", href: project.repo.trim() });

  return (
    <article className="project-card" data-reveal>
      <div className="project-topline">
        <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
        <span>{project.year}</span>
      </div>
      <h3>{project.title}</h3>

      <div className="project-content-grid">
        <div className="project-main-details">
          {overview && (
            <section className="case-study-block" aria-label={`${project.title} overview`}>
              <h4>Overview</h4>
              <p className="project-description">{overview}</p>
              {project.result && <p className="project-description">{project.result}</p>}
            </section>
          )}

          {project.role && (
            <section className="case-study-block role-block" aria-label="My role">
              <h4>My role</h4>
              <p className="project-description">{project.role}</p>
            </section>
          )}

          {project.features && project.features.length > 0 && (
            <section className="case-study-block" aria-label="Key features">
              <h4>Key features</h4>
              <ul className="project-features">
                {project.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
            </section>
          )}
        </div>

        {project.tools && project.tools.length > 0 && (
          <section className="case-study-block project-tech-stack">
            <h4>Tech stack</h4>
            <ul className="tool-list" aria-label="Technologies">
              {project.tools.map((tool) => <li key={tool}>{tool}</li>)}
            </ul>
            {details.length > 0 && (
              <section className="project-details" aria-label={`${project.title} details`}>
                <h4>Details</h4>
                <dl>
                  {details.map(({ label, value }) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
          </section>
        )}
      </div>

      {screenshots.length > 0 && (
        <ProjectGallery projectTitle={project.title} screenshots={screenshots} />
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
