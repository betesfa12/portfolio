import { existsSync } from "node:fs";
import path from "node:path";
import CopyEmailButton from "@/components/CopyEmailButton";
import ProfilePortrait from "@/components/ProfilePortrait";
import ProjectCard from "@/components/ProjectCard";
import RevealObserver from "@/components/RevealObserver";
import SiteHeader from "@/components/SiteHeader";
import { certifications, education, experience, profile, projects, skills, SITE_URL } from "@/lib/data";

const photoAvailable = existsSync(path.join(process.cwd(), "public", "photo.jpg"));

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  email: profile.email ? `mailto:${profile.email}` : undefined,
  address: profile.location
    ? { "@type": "PostalAddress", addressLocality: profile.location }
    : undefined,
  url: SITE_URL || undefined,
  sameAs: [...profile.socials.map((social) => social.href), ...(profile.linkedin.trim() ? [profile.linkedin] : [])],
};

const aboutIndex = projects.length > 0 ? 2 : 1;
const experienceIndex = aboutIndex + 1;
const certificationsIndex = experienceIndex + (experience.length > 0 ? 1 : 0);
const contactIndex = certificationsIndex + (certifications.length > 0 ? 1 : 0);

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <RevealObserver />
      <SiteHeader />

      <main id="main-content">
        <section id="top" className="hero" data-reveal>
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" />{profile.title}</p>
            <h1>{profile.name}<span className="name-period">.</span></h1>
            <p className="tagline">{profile.tagline}</p>
            {profile.location && <p className="location">{profile.location}</p>}
            <div className="actions">
              <a className="btn primary" href={projects.length > 0 ? "#work" : "#about"}>
                {projects.length > 0 ? "View my work" : "About me"} <span aria-hidden="true">↘</span>
              </a>
              <a className="text-link" href={`mailto:${profile.email}`}>Get in touch <span aria-hidden="true">↗</span></a>
              {profile.cv && <a className="btn" href={profile.cv} target="_blank" rel="noreferrer">View CV <span aria-hidden="true">↗</span></a>}
            </div>
          </div>
          <div className="hero-art">
            <div className="art-orbit orbit-one" aria-hidden="true" />
            <div className="art-orbit orbit-two" aria-hidden="true" />
            <ProfilePortrait photoAvailable={photoAvailable} />
          </div>
          <a href={projects.length > 0 ? "#work" : "#about"} className="scroll-cue"><span aria-hidden="true" />Scroll to explore</a>
        </section>

        {projects.length > 0 && (
          <section id="work" className="section work-section" data-reveal>
            <div className="section-heading">
              <p className="section-index">01 / Selected work</p>
              <h2>Projects<span className="name-period">.</span></h2>
              <p className="section-intro">A selection of things I have been building.</p>
            </div>
            <div className="projects">
              {projects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} projectCount={projects.length} />
              ))}
            </div>
          </section>
        )}

        <section id="about" className="section about-section" data-reveal>
          <div className="section-heading">
            <p className="section-index">{String(aboutIndex).padStart(2, "0")} / A little about me</p>
            <h2>About<span className="name-period">.</span></h2>
          </div>
          <div className="about-content">
            <p className="about-copy">{profile.about}</p>
            <div className="about-details">
              {Object.values(skills).some((items) => items.length > 0) && (
                <div className="detail-block">
                  <h3>Skills</h3>
                  <div className="skill-groups">
                    {Object.entries(skills).filter(([, items]) => items.length > 0).map(([category, items]) => (
                      <section className="skill-group" key={category} aria-label={`${category} skills`}>
                        <h4>{category}</h4>
                        <ul className="skill-list">
                          {items.map((skill) => <li key={skill}>{skill}</li>)}
                        </ul>
                      </section>
                    ))}
                  </div>
                </div>
              )}
              {education.length > 0 && (
                <div className="detail-block education-block">
                  <h3>Education</h3>
                  <ol className="education-timeline">
                    {education.map((item) => (
                      <li key={`${item.institution}-${item.qualification}`}>
                        <strong>{item.qualification}</strong>
                        <span>{item.institution}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </section>

        {experience.length > 0 && (
          <section id="experience" className="section" data-reveal>
            <div className="section-heading">
              <p className="section-index">{String(experienceIndex).padStart(2, "0")} / Practical experience</p>
              <h2>Experience<span className="name-period">.</span></h2>
            </div>
            <ol className="education-timeline">
              {experience.map((item) => (
                <li key={`${item.place}-${item.period}`}>
                  <span className="education-period">{item.period}</span>
                  <span><strong>{item.place}</strong><br />{item.what}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {certifications.length > 0 && (
          <section id="certifications" className="section" data-reveal>
            <div className="section-heading">
              <p className="section-index">{String(certificationsIndex).padStart(2, "0")} / Verified credentials</p>
              <h2>Certifications<span className="name-period">.</span></h2>
            </div>
            <ul className="education-timeline">
              {certifications.map((certification) => (
                <li key={`${certification.name}-${certification.issuer}`}>
                  <span>
                    <strong>{certification.url ? <a href={certification.url} target="_blank" rel="noreferrer">{certification.name}</a> : certification.name}</strong>
                    <br />{certification.issuer}
                  </span>
                  {certification.year && <span className="education-period">{certification.year}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section id="contact" className="contact-section" data-reveal>
          <p className="section-index">{String(contactIndex).padStart(2, "0")} / Get in touch</p>
          <h2>Let&apos;s work<br />together<span className="name-period">.</span></h2>
          {profile.availability.trim() && <p className="availability">{profile.availability}</p>}
          <div className="contact-options">
            {profile.email && (
              <div className="email-contact">
                <a className="contact-link" href={`mailto:${profile.email}`}>
                  Email me <span aria-hidden="true">↗</span>
                </a>
                <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}</a>
                <CopyEmailButton email={profile.email} />
              </div>
            )}
            {profile.phone && <a className="contact-link" href={`tel:${profile.phone}`}>Call me <span aria-hidden="true">↗</span></a>}
            {profile.whatsapp && (
              <a className="contact-link whatsapp-link" href={`https://wa.me/${profile.whatsapp}?text=Hello%20Betesfa`} target="_blank" rel="noreferrer">
                WhatsApp <span aria-hidden="true">↗</span>
              </a>
            )}
            {profile.socials.map((social) => (
              <a className="contact-link" key={social.label} href={social.href} target="_blank" rel="noreferrer">
                {social.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
            {profile.linkedin.trim() && (
              <a className="contact-link" href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
          {(profile.location || profile.mapUrl) && (
            <div className="location-details">
              {profile.location && <span>{profile.location}</span>}
              {profile.mapUrl && <a href={profile.mapUrl} target="_blank" rel="noreferrer">View on map <span aria-hidden="true">↗</span></a>}
            </div>
          )}
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
      </main>

      <footer className="foot">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
