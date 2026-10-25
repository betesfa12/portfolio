# Betesfa Mengesh — Portfolio

A personal portfolio built with Next.js, React, TypeScript, and CSS. It presents profile information, selected work, skills, education, and contact links.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Edit the content

Update the profile, project descriptions and links, grouped skills, and education in `lib/data.ts`. Project descriptions and feature lists should only include details verified in the project source. Optional project screenshots belong in `public/projects/`; optional portrait and CV files are `public/photo.jpg` and `public/cv.pdf`.

Set `NEXT_PUBLIC_SITE_URL` to the deployed site's canonical origin (for example, `https://your-domain.example`) in the hosting environment to enable canonical metadata and absolute Open Graph and sitemap URLs.

## Deploy

Push the repository to your Git hosting provider and import it into Vercel, or use another Next.js-compatible host. Configure `NEXT_PUBLIC_SITE_URL` with the public site origin before deployment.
