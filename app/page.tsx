import { existsSync } from "node:fs";
import path from "node:path";
import CopyEmailButton from "@/components/CopyEmailButton";
import CopyPhoneButton from "@/components/CopyPhoneButton";
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

const aboutIndex = 1;
const projectsIndex = 2;
const skillsIndex = 3;
const contactIndex = 4;
const experienceIndex = 5;
const certificationsIndex = 6;
const contactPhone = profile.phone.trim();
const localPhone = contactPhone.replace(/^\+251/, "0");
const formattedPhone = localPhone.replace(/^(\d{4})(\d{3})(\d{3})$/, "$1 $2 $3");
const phoneDigits = contactPhone.replace(/\D/g, "");
const internationalPhone = contactPhone.startsWith("+")
  ? `+${phoneDigits}`
  : phoneDigits.startsWith("0")
    ? `+251${phoneDigits.slice(1)}`
    : `+${phoneDigits}`;
const configuredWhatsapp = profile.whatsapp.trim().replace(/\D/g, "");
const whatsappNumber = configuredWhatsapp.startsWith("0")
  ? `251${configuredWhatsapp.slice(1)}`
  : configuredWhatsapp || internationalPhone.replace(/\D/g, "");
const telegramUsername = profile.telegram.trim().replace(/^@/, "");

export default function Home() {
  const nameParts = profile.name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");
  const marqueeSkills = [...new Set(Object.values(skills).flat())];

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <RevealObserver />
      <SiteHeader />

      <main id="main-content">
        <section id="top" className="hero container" data-reveal>
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" />{profile.title}</p>
            <h1 className="hero-name">
              <span className="hero-name-line"><span>{firstName}{!lastName && <span className="name-period" aria-hidden="true" />}</span></span>
              {lastName && <span className="hero-name-line"><span>{lastName}<span className="name-period" aria-hidden="true" /></span></span>}
            </h1>
            <p className="tagline">{profile.tagline}</p>
            {profile.location && <p className="location">{profile.location}</p>}
            <div className="actions">
              <a className="btn primary" href={projects.length > 0 ? "#work" : "#about"}>
                {projects.length > 0 ? "View my work" : "About me"} <span aria-hidden="true">↘</span>
              </a>
              <a className="text-link" href={`mailto:${profile.email}`}>Get in touch <span aria-hidden="true">↗</span></a>
              {profile.cv?.trim() && <a className="btn" href={profile.cv.trim()} download>Download CV <span aria-hidden="true">↓</span></a>}
            </div>
          </div>
          <div className="hero-art">
            <ProfilePortrait photoAvailable={photoAvailable} />
          </div>
          <a href={projects.length > 0 ? "#work" : "#about"} className="scroll-cue"><span aria-hidden="true" />Scroll to explore</a>
        </section>

        {marqueeSkills.length > 0 && (
          <section className="skill-marquee container" aria-label="Technology skills">
            <div className="skill-marquee-window">
              <div className="skill-marquee-track">
                <ul className="skill-marquee-list">
                  {marqueeSkills.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
                <ul className="skill-marquee-list" aria-hidden="true">
                  {marqueeSkills.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
              </div>
            </div>
          </section>
        )}

        <section id="about" className="section about-section container" data-reveal>
          <div className="section-heading">
            <p className="section-index">{String(aboutIndex).padStart(2, "0")} / A little about me</p>
            <h2><span className="section-heading-clip"><span>About<span className="name-period" aria-hidden="true" /></span></span></h2>
          </div>
          <div className="about-bento">
            <article className="about-card about-card-intro" data-reveal>
              <p className="about-copy">{profile.about}</p>
            </article>
            {education.length > 0 && (
              <article className="about-card about-card-education" data-reveal>
                <h3>Education</h3>
                <ol className="education-timeline">
                  {education.map((item) => (
                    <li key={`${item.institution}-${item.qualification}`}>
                      <strong>{item.qualification}</strong>
                      <span>{item.institution}</span>
                    </li>
                  ))}
                </ol>
              </article>
            )}
          </div>
        </section>

        {projects.length > 0 && (
          <section id="work" className="section work-section container" data-reveal>
            <div className="section-heading">
              <p className="section-index">{String(projectsIndex).padStart(2, "0")} / Selected work</p>
              <h2><span className="section-heading-clip"><span>Projects<span className="name-period" aria-hidden="true" /></span></span></h2>
              <p className="section-intro">A selection of things I have been building.</p>
            </div>
            <div className="projects">
              {projects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
              ))}
            </div>
          </section>
        )}

        {Object.values(skills).some((items) => items.length > 0) && (
          <section id="skills" className="section skills-section container" data-reveal>
            <div className="section-heading">
              <p className="section-index">{String(skillsIndex).padStart(2, "0")} / Skills</p>
              <h2><span className="section-heading-clip"><span>Skills<span className="name-period" aria-hidden="true" /></span></span></h2>
            </div>
            <div className="skills-grid">
              {Object.entries(skills).filter(([, items]) => items.length > 0).map(([category, items]) => (
                <article className="about-card skill-card" data-reveal key={category}>
                  <h3>{category}</h3>
                  <ul className="skill-list">
                    {items.map((skill) => <li key={skill}>{skill}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        )}

        {experience.length > 0 && (
          <section id="experience" className="section container" data-reveal>
            <div className="section-heading">
              <p className="section-index">{String(experienceIndex).padStart(2, "0")} / Practical experience</p>
              <h2><span className="section-heading-clip"><span>Experience<span className="name-period" aria-hidden="true" /></span></span></h2>
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
          <section id="certifications" className="section container" data-reveal>
            <div className="section-heading">
              <p className="section-index">{String(certificationsIndex).padStart(2, "0")} / Verified credentials</p>
              <h2><span className="section-heading-clip"><span>Certifications<span className="name-period" aria-hidden="true" /></span></span></h2>
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

        <section id="contact" className="contact-section container" data-reveal>
          <div className="contact-content">
            <span className="contact-blob contact-blob-one" aria-hidden="true" />
            <span className="contact-blob contact-blob-two" aria-hidden="true" />
            <span className="contact-ring" aria-hidden="true">
              <span className="contact-ring-inner" />
              <span className="contact-ring-outer" />
              <span className="contact-ring-orbit"><span /></span>
              <span className="contact-ring-orb" aria-hidden="true">BM</span>
            </span>
            <p className="section-index">{String(contactIndex).padStart(2, "0")} / Get in touch</p>
            <h2>Let&apos;s work<br />together<span className="name-period" aria-hidden="true" /></h2>
            {profile.availability.trim() && <p className="availability">{profile.availability}</p>}
            <div className="contact-options">
              <div className="contact-details">
              {profile.email && (
                <div className="contact-row">
                  <span className="contact-email">{profile.email}</span>
                  <CopyEmailButton email={profile.email} />
                </div>
              )}
              {contactPhone && (
                <div className="contact-row">
                  <span className="contact-phone">{formattedPhone}</span>
                  <CopyPhoneButton phone={localPhone} />
                </div>
              )}
              </div>
              <div className="contact-actions">
              {profile.email && (
                <a className="contact-link" href={`mailto:${profile.email}`}>
                  Email me <span aria-hidden="true">↗</span>
                </a>
              )}
              {contactPhone && (
                <>
                  <a className="contact-link" href={`tel:${internationalPhone}`} aria-label={`Call Betesfa Mengesha at ${internationalPhone}`}>
                    Call <span aria-hidden="true">↗</span>
                  </a>
                  <a className="contact-link" href={`sms:${internationalPhone}`} aria-label={`Send an SMS to Betesfa Mengesha at ${internationalPhone}`}>
                    SMS <span aria-hidden="true">↗</span>
                  </a>
                </>
              )}
              {whatsappNumber && (
                <a className="contact-link" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" aria-label="Message Betesfa Mengesha on WhatsApp">
                  WhatsApp <span aria-hidden="true">↗</span>
                </a>
              )}
              {telegramUsername && (
                <a className="contact-link" href={`https://t.me/${telegramUsername}`} target="_blank" rel="noopener noreferrer" aria-label="Message Betesfa Mengesha on Telegram">
                  Telegram <span aria-hidden="true">↗</span>
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
            </div>
            {(profile.location || profile.mapUrl) && (
              <div className="location-details">
                {profile.location && <span>{profile.location}</span>}
                {profile.mapUrl && <a href={profile.mapUrl} target="_blank" rel="noreferrer">View on map <span aria-hidden="true">↗</span></a>}
              </div>
            )}
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
      </main>

      <footer className="foot container">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
