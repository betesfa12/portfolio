import ThemeToggle from "@/components/ThemeToggle";
import { profile, projects, skills, experience } from "@/lib/data";

export default function Home() {
  return (
    <>
      <header className="bar">
        <a href="#top" className="mark">{profile.name}</a>
        <nav aria-label="ዋና ማውጫ">
          <a href="#work">ሥራዎች</a>
          <a href="#about">ስለ እኔ</a>
          <a href="#contact">አግኙኝ</a>
          <ThemeToggle />
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <p className="role">{profile.title}</p>
          <h1 className="name">{profile.name}</h1>
          <p className="tagline">{profile.tagline}</p>
          <div className="actions">
            <a className="btn primary" href="#work">ሥራዬን ተመልከት</a>
            <a className="btn" href={profile.cv} download>CV አውርድ</a>
          </div>
        </section>

        <section id="work" className="section">
          <h2>ሥራዎች</h2>
          <ul className="projects">
            {projects.map((p) => (
              <li key={p.title}>
                <details>
                  <summary>
                    <span className="year">{p.year}</span>
                    <span className="ptitle">{p.title}</span>
                    <span className="prole">{p.role}</span>
                  </summary>
                  <dl className="detail">
                    <div><dt>ችግሩ</dt><dd>{p.problem}</dd></div>
                    <div><dt>ውጤቱ</dt><dd>{p.result}</dd></div>
                    <div><dt>መሣሪያዎች</dt><dd>{p.tools.join("፣ ")}</dd></div>
                    {p.link && <div><dt>ሊንክ</dt><dd><a href={p.link} target="_blank" rel="noreferrer">ፕሮጀክቱን ክፈት</a></dd></div>}
                  </dl>
                </details>
              </li>
            ))}
          </ul>
        </section>

        <section id="about" className="section two">
          <h2>ስለ እኔ</h2>
          <div>
            <p className="lead">{profile.about}</p>
            <h3>ክህሎቶች</h3>
            <p className="skills">{skills.join("፣ ")}</p>
            <h3>ልምድ</h3>
            <ul className="xp">
              {experience.map((e) => (
                <li key={e.period}><span>{e.period}</span><span><strong>{e.place}</strong> — {e.what}</span></li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contact" className="section contact">
          <h2>አብረን እንሥራ</h2>
          <a className="mail" href={`mailto:${profile.email}`}>{profile.email}</a>
          <p className="socials">
            {profile.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
            ))}
          </p>
        </section>
      </main>

      <footer className="foot">© {new Date().getFullYear()} {profile.name}</footer>
    </>
  );
}
