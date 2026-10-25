import ThemeToggle from "@/components/ThemeToggle";
import { experience, profile, projects, skills } from "@/lib/data";

export default function Home() {
  return (
    <>
      <header className="bar">
        <a href="#top" className="brand" aria-label={`${profile.name} home`}>
          <span className="brand-mark">BM</span>
          <span>{profile.name}</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Projects</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <ThemeToggle />
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" />{profile.title}</p>
            <h1>{profile.name}<span className="name-period">.</span></h1>
            <p className="tagline">{profile.tagline}</p>
            <p className="location">{profile.location}</p>
            <div className="actions">
              <a className="btn primary" href="#work">View my work <span aria-hidden="true">↘</span></a>
              <a className="text-link" href={`mailto:${profile.email}`}>Get in touch <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-core">B<span>.</span></div>
            <span className="art-caption">Ideas into impact</span>
          </div>
          <a href="#work" className="scroll-cue"><span />Scroll to explore</a>
        </section>

        <section id="work" className="section work-section">
          <div className="section-heading">
            <p className="section-index">01 / Selected work</p>
            <h2>Projects<span className="name-period">.</span></h2>
            <p className="section-intro">A selection of things I have been building.</p>
          </div>
          <div className="projects">
            {projects.map((project, index) => (
              <article className="project-card" key={project.title}>
                <div className="project-topline">
                  <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
                  <span>{project.year}</span>
                  <span className="project-role">{project.role}</span>
                </div>
                <h3>{project.title}</h3>
                {project.problem && <p className="project-description">{project.problem}</p>}
                {project.result && <p className="project-description">{project.result}</p>}
                {project.tools && project.tools.length > 0 && (
                  <ul className="tool-list" aria-label="Technologies">
                    {project.tools.map((tool) => <li key={tool}>{tool}</li>)}
                  </ul>
                )}
                {(project.link || project.repo) && (
                  <div className="project-links">
                    {project.link && <a href={project.link} target="_blank" rel="noreferrer">Visit project <span aria-hidden="true">↗</span></a>}
                    {project.repo && <a href={project.repo} target="_blank" rel="noreferrer">View repository <span aria-hidden="true">↗</span></a>}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="section-heading">
            <p className="section-index">02 / A little about me</p>
            <h2>About<span className="name-period">.</span></h2>
          </div>
          <div className="about-content">
            <p className="about-copy">{profile.about}</p>
            <div className="about-details">
              <div className="detail-block">
                <h3>Skills</h3>
                <ul className="skill-list">
                  {skills.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
              </div>
              <div className="detail-block">
                <h3>Education</h3>
                <ul className="education-list">
                  {experience.map((item) => (
                    <li key={`${item.place}-${item.period}`}>
                      <span className="education-period">{item.period}</span>
                      <span><strong>{item.place}</strong><br />{item.what}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <p className="section-index">03 / Have a project in mind?</p>
          <h2>Let&apos;s work<br />together<span className="name-period">.</span></h2>
          <div className="contact-options">
            {profile.email && (
              <a className="contact-link" href={`mailto:${profile.email}`}>
                Email me <span aria-hidden="true">↗</span>
              </a>
            )}
            {profile.phone && (
              <a className="contact-link" href={`tel:${profile.phone}`}>
                Call me <span aria-hidden="true">↗</span>
              </a>
            )}
            {profile.whatsapp && (
              <a
                className="contact-link whatsapp-link"
                href={`https://wa.me/${profile.whatsapp}?text=Hello%20Betesfa`}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
          {(profile.location || profile.mapUrl) && (
            <div className="location-details">
              {profile.location && <span>{profile.location}</span>}
              {profile.mapUrl && (
                <a href={profile.mapUrl} target="_blank" rel="noreferrer">
                  View on map <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          )}
          <div className="socials">
            {profile.socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer">{social.label} <span aria-hidden="true">↗</span></a>
            ))}
          </div>
        </section>
      </main>

      {profile.whatsapp && (
        <a
          className="whatsapp-float"
          href={`https://wa.me/${profile.whatsapp}?text=Hello%20Betesfa`}
          target="_blank"
          rel="noreferrer"
          aria-label="Contact Betesfa on WhatsApp"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.2 1.6 6L0 24l6.4-1.7a11.8 11.8 0 0 0 5.7 1.5h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.2-3.5-8.5ZM12.2 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.8 1 1-3.7-.3-.4a9.8 9.8 0 0 1-1.5-5.2c0-5.4 4.4-9.8 9.8-9.8 2.6 0 5.1 1 6.9 2.9a9.7 9.7 0 0 1 2.9 6.9c0 5.5-4.4 9.9-9.7 9.9Zm5.4-7.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.4-2.3-1.4-.9-.8-1.5-1.7-1.7-2-.2-.3 0-.5.1-.6l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6-.1-.2-.7-1.6-.9-2.1-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.6s1.2 3 1.3 3.2c.2.2 2.3 3.5 5.6 4.9.8.3 1.4.5 1.9.6.8.2 1.5.2 2 .1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3Z" />
          </svg>
        </a>
      )}

      <footer className="foot">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
