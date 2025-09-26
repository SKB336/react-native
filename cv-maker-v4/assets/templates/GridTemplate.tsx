import { TemplateDataType } from "~/types/forms";
import { File } from "expo-file-system";

export default async function GridTemplate(data: TemplateDataType) {
  const {
    personal_form,
    objective_form,
    experience_entries,
    education_entries,
    skill_entries,
    reference_entries,
    project_entries,
    language_entries,
    certification_entries,
    award_entries,
    interest_entries,
  } = data as any;

  let photo = "";
  if (personal_form?.photo) {
    try {
      const file = new File(personal_form?.photo, "");
      photo = await file.base64();
    } catch (error) {
      console.log(error);
    }
  }

  const contactEmail = personal_form?.email;
  const contactPhone = personal_form?.phone;
  const contactLocation = personal_form?.address || personal_form?.city || "";
  const contactLinkedIn = personal_form?.linkedIn;
  const contactWebsite = personal_form?.website;
  const contactGithub = personal_form?.github;

  return /* html */ `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Flexible CV Template</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="index,follow">
  <meta name="generator" content="GrapesJS Studio">
  <meta name="theme-color" content="#0ea5e9" />
  <style>
${css}
  </style>
</head>
<body class="gjs-t-body">
  <main class="page-container">
    <header class="header-section">
      <div class="header-top-row">
        <div class="identity-block">
          <h1 class="gjs-t-h1 candidate-name">${personal_form?.fullName || ""}</h1>
          ${personal_form?.currentPosition ? `<p class="professional-title">${personal_form.currentPosition}</p>` : ""}
        </div>
      </div>
      ${objective_form?.objective ? `
      <section class="professional-summary-section">
        <div class="gjs-t-border summary-card">
          <h2 class="gjs-t-h2 summary-heading">Professional Summary</h2>
          <p class="summary-text">${objective_form.objective.replace(/\n/g, '<br>')}</p>
        </div>
      </section>` : ""}
    </header>

    <div class="main-grid">
      <div class="left-column">
        ${skill_entries?.length ? `
        <section class="gjs-t-border skills-section">
          <h2 class="gjs-t-h2 skills-heading">Skills</h2>
          <div class="skills-tags-wrapper">
            ${skill_entries.map((s: any) => `<span class="skill-tag">${s.skill || s.name || s}</span>`).join('')}
          </div>
        </section>` : ""}

        ${(contactEmail || contactPhone || contactLocation || contactLinkedIn || contactGithub || contactWebsite) ? `
        <section class="gjs-t-border contact-section">
          <h2 class="gjs-t-h2 contact-heading">Contact</h2>
          <ul class="contact-details-list">
            ${contactEmail ? `<li class="contact-detail-item"><img src="https://api.iconify.design/lucide-mail.svg" alt="Email" loading="lazy" width="18" height="18" class="icon-email-item" /><a href="mailto:${contactEmail}" class="gjs-t-link">${contactEmail}</a></li>` : ''}
            ${contactPhone ? `<li class="contact-detail-item"><img src="https://api.iconify.design/lucide-phone.svg" alt="Phone" loading="lazy" width="18" height="18" class="icon-phone-item" /><a href="tel:${contactPhone}" class="gjs-t-link">${contactPhone}</a></li>` : ''}
            ${contactLocation ? `<li class="contact-detail-item"><img src="https://api.iconify.design/lucide-map-pin.svg" alt="Location" loading="lazy" width="18" height="18" class="icon-location-item" /><span>${contactLocation}</span></li>` : ''}
            ${contactLinkedIn ? `<li class="contact-detail-item"><img src="https://api.iconify.design/lucide-linkedin.svg" alt="LinkedIn" loading="lazy" width="18" height="18" class="icon-linkedin-item" /><a href="${contactLinkedIn}" target="_blank" rel="noopener noreferrer" class="gjs-t-link">${contactLinkedIn}</a></li>` : ''}
            ${contactGithub ? `<li class="contact-detail-item"><img src="https://api.iconify.design/lucide-github.svg" alt="GitHub" loading="lazy" width="18" height="18" class="icon-github-item" /><a href="${contactGithub}" target="_blank" rel="noopener noreferrer" class="gjs-t-link">${contactGithub.replace(/^https?:\/\//, "")}</a></li>` : ''}
            ${contactWebsite ? `<li class="contact-detail-item"><img src="https://api.iconify.design/lucide-globe.svg" alt="Website" loading="lazy" width="18" height="18" class="icon-website-item" /><a href="${contactWebsite}" target="_blank" rel="noopener noreferrer" class="gjs-t-link">${contactWebsite.replace(/^https?:\/\//, "")}</a></li>` : ''}
          </ul>
        </section>` : ""}

        ${language_entries?.length ? `
        <section class="gjs-t-border languages-section">
          <h2 class="gjs-t-h2 languages-heading">Languages</h2>
          <ul class="languages-list">
            ${language_entries.map((l: any) => `<li class="language-item"><span>${l.language || l.name}</span><span class="language-proficiency">${l.level || l.proficiency || ''}</span></li>`).join('')}
          </ul>
        </section>` : ""}

        ${certification_entries?.length ? `
        <section class="gjs-t-border certifications-section">
          <h2 class="gjs-t-h2 certifications-heading">Certifications</h2>
          <ul class="certifications-list">
            ${certification_entries.map((c: any) => `<li class="certification-item"><strong class="certification-title">${c.title || c.name}</strong>${(c.org || c.organization || c.by || c.year || c.id) ? `<small class="certification-meta">${[c.org || c.organization || c.by, c.year, c.id ? `Credential ID: ${c.id}` : ''].filter(Boolean).join(' • ')}</small>` : ''}</li>`).join('')}
          </ul>
        </section>` : ""}

        ${interest_entries?.length ? `
        <section class="gjs-t-border interests-section">
          <h2 class="gjs-t-h2 interests-heading">Interests</h2>
          <p class="interests-text">${interest_entries.map((i: any) => i.name || i.interest || i).join(', ')}</p>
        </section>` : ""}
      </div>

      <div class="right-column">
        ${experience_entries?.length ? `
        <section class="gjs-t-border experience-section">
          <h2 class="gjs-t-h2 experience-heading">Work Experience</h2>
          <div class="experience-list">
            ${experience_entries.map((e: any) => `
            <article class="experience-item">
              <div class="experience-header">
                <div class="experience-title-block">
                  <h3 class="job-title">${e.position || e.title || ''}</h3>
                  ${e.company ? `<span class="gjs-t-link company-name">${e.company}</span>` : ''}
                </div>
                <div class="experience-dates">${[e.dateFrom, e.dateTo, e.location].filter(Boolean).join(' — ')}</div>
              </div>
              ${e.details 
                ? `<ul class="experience-bullets">${
                    e.details
                      .split('\n')
                      .filter(Boolean)
                      .map((d: string) => `<li>${d.replace(/^\s*-\s*/, '')}</li>`)
                      .join('')
                  }</ul>` 
                : ''
              }
              ${e.skills?.length ? `<div class="experience-skills-wrapper">${e.skills.map((sk: string) => `<span class="experience-skill-tag">${sk}</span>`).join('')}</div>` : ''}
            </article>`).join('')}
          </div>
        </section>` : ""}

        ${project_entries?.length ? `
        <section class="gjs-t-border projects-section">
          <h2 class="gjs-t-h2 projects-heading">Selected Projects</h2>
          <div class="projects-list">
            ${project_entries.map((p: any) => `
            <article class="project-item">
              <div class="project-title-row">
                ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener noreferrer" class="gjs-t-link project-title-link">${p.name || p.title}</a>` : `<span class="project-title-link">${p.name || p.title}</span>`}
                <span class="project-meta">${[p.year, p.type].filter(Boolean).join(' • ')}</span>
              </div>
              ${p.description ? `<p class="project-description">${p.description}</p>` : ''}
              ${p.highlights?.length ? `<ul class="project-highlights">${p.highlights.map((h: string) => `<li>${h}</li>`).join('')}</ul>` : ''}
              ${p.tags?.length ? `<div class="project-tags-wrapper">${p.tags.map((t: string) => `<span class="project-tag">${t}</span>`).join('')}</div>` : ''}
            </article>`).join('')}
          </div>
        </section>` : ""}

        ${education_entries?.length ? `
        <section class="gjs-t-border education-section">
          <h2 class="gjs-t-h2 education-heading">Education</h2>
          <div class="education-list">
            ${education_entries.map((ed: any) => `
            <article class="education-item">
              <div class="education-header">
                <strong class="degree-title">${ed.course || ed.degree || ''}</strong>
                <span class="education-dates">${[ed.dateFrom, ed.dateTo].filter(Boolean).join(' — ')}</span>
              </div>
              <div class="education-meta-row">
                ${ed.institution ? `<span>${ed.institution}</span>` : ''}
                ${ed.location ? `<span class="education-location">${ed.location}</span>` : ''}
              </div>
              ${ed.details ? `<ul class="education-highlights">${ed.details.split('\n').filter(Boolean).map((d: string) => `<li>${d}</li>`).join('')}</ul>` : ''}
            </article>`).join('')}
          </div>
        </section>` : ""}

        ${award_entries?.length ? `
        <section class="gjs-t-border awards-section">
          <h2 class="gjs-t-h2 awards-heading">Awards</h2>
          <ul class="awards-list">
            ${award_entries.map((a: any) => `<li class="award-item"><strong class="award-title">${a.title || a.name}</strong>${(a.org || a.organization || a.year) ? `<small class="award-meta">${[a.org || a.organization, a.year].filter(Boolean).join(' • ')}</small>` : ''}</li>`).join('')}
          </ul>
        </section>` : ""}

        ${reference_entries?.length ? `
        <section class="gjs-t-border references-section">
          <h2 class="gjs-t-h2 references-heading">References</h2>
          <div class="references-text">
            <ul style="list-style: none; padding-left: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.5rem;">
            ${reference_entries.map((r: any) => `<li><strong>${r.refName || r.name}</strong>${r.company ? ` (${r.company})` : ''}<br>${[r.position, r.phone].filter(Boolean).join(', ')}<br>${r.email || ''}</li>`).join('')}
            </ul>
          </div>
        </section>` : ""}
      </div>
    </div>
  </main>
</body>
</html>`;
}

const css = /* css */`
  /* Utility Classes */
  .border { border: 1px solid black; }
  @page {
    margin: 7mm 7mm; /* adjust — adds margin on *every* page */
    background-color: #f8fafc;
  }

  * { box-sizing: border-box; }
  body { margin: 0; }
  :root {
    --gjs-t-color-primary: #0ea5e9;
    --gjs-t-color-secondary: #0f172a;
    --gjs-t-color-accent: #22c55e;
    --gjs-t-color-success: #16a34a;
    --gjs-t-color-warning: #f59e0b;
    --gjs-t-color-error: #ef4444;
  }
  .gjs-t-body { background-color: #f8fafc; color: var(--gjs-t-color-secondary); font-size: 16px; line-height: 1.6; font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif; }
  .gjs-t-h1 { color: var(--gjs-t-color-secondary); font-size: 40px; line-height: 1.15; font-family: 'Sora', ui-sans-serif, system-ui; }
  .gjs-t-h2 { color: var(--gjs-t-color-secondary); font-size: 20px; line-height: 1.3; font-family: 'Sora', ui-sans-serif, system-ui; }
  .gjs-t-button { background-color: var(--gjs-t-color-primary); color: #ffffff; border-radius: 12px; }
  .gjs-t-link { color: var(--gjs-t-color-primary); text-decoration: underline; }
  .gjs-t-border { border-radius: 14px; border-color: #e2e8f0; border: 1px solid #e2e8f0; }
  *, ::before, ::after { box-sizing: border-box; border-width: 0; border-style: solid; border-color: #e5e7eb; }
  html, :host { line-height: 1.5; -webkit-text-size-adjust: 100%; -moz-tab-size: 4; tab-size: 4; font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; font-feature-settings: normal; font-variation-settings: normal; -webkit-tap-highlight-color: transparent; }
  body { margin: 0; line-height: inherit; }
  hr { height: 0; color: inherit; border-top-width: 1px; }
  h1, h2, h3, h4, h5, h6 { font-size: inherit; font-weight: inherit; }
  a { color: inherit; text-decoration: inherit; }
  b, strong { font-weight: bolder; }
  code, kbd, samp, pre { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-feature-settings: normal; font-variation-settings: normal; font-size: 1em; }
  small { font-size: 80%; }
  sub { bottom: -0.25em; }
  sup { top: -0.5em; }
  table { text-indent: 0; border-color: inherit; border-collapse: collapse; }
  button, input, optgroup, select, textarea { font-family: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 100%; font-weight: inherit; line-height: inherit; letter-spacing: inherit; color: inherit; margin: 0; padding: 0; }
  button, select { text-transform: none; }
  button, input[type='button'], input[type='reset'], input[type='submit'] { -webkit-appearance: button; appearance: button; background-color: transparent; background-image: none; }
  :-moz-focusring { outline: auto; }
  :-moz-ui-invalid { box-shadow: none; }
  progress { vertical-align: baseline; }
  ::-webkit-inner-spin-button, ::-webkit-outer-spin-button { height: auto; }
  [type='search'] { -webkit-appearance: textfield; appearance: textfield; outline-offset: -2px; }
  ::-webkit-search-decoration { -webkit-appearance: none; }
  ::-webkit-file-upload-button { -webkit-appearance: button; appearance: button; font: inherit; }
  summary { display: list-item; }
  blockquote, dl, dd, h1, h2, h3, h4, h5, h6, hr, figure, p, pre { margin: 0; }
  fieldset { margin: 0; padding: 0; }
  legend { padding: 0; }
  ol, ul, menu { list-style: none; margin: 0; padding: 0; }
  dialog { padding: 0; }
  textarea { resize: vertical; }
  input::placeholder, textarea::placeholder { opacity: 1; color: #9ca3af; }
  button, [role="button"] { cursor: pointer; }
  :disabled { cursor: default; }
  img, svg, video, canvas, audio, iframe, embed, object { display: block; }
  img, video { max-width: 100%; height: auto; }
  [hidden] { display: none; }
  .page-container { margin-left: auto; margin-right: auto; max-width: 64rem; }
  .header-section { margin-bottom: 2rem; padding-top: 4mm; }
  .header-top-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 1.5rem; }
  .identity-block { display: flex; flex-direction: column; gap: 0.5rem; }
  .candidate-name { font-weight: 600; letter-spacing: -0.025em; }
  .professional-title { color: rgb(71 85 105 / 1); font-size: 1.125rem; line-height: 1.75rem; }
  .contact-list { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem; font-size: 0.875rem; line-height: 1.25rem; color: rgb(51 65 85 / 1); }
  .contact-email, .contact-phone, .contact-location, .contact-linkedin, .contact-website, .contact-github { display: inline-flex; align-items: center; gap: 0.5rem; }
  .icon-email, .icon-phone, .icon-location, .icon-linkedin, .icon-github, .icon-website { opacity: 0.8; }
  .professional-summary-section { margin-top: 1.5rem; }
  .summary-card { border-width: 1px; background-color: rgb(255 255 255 / 1); padding: 1.5rem; box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05); }
  .summary-heading { margin-bottom: 0.75rem; font-weight: 600; }
  .summary-text { color: rgb(51 65 85 / 1); }
  .main-grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 1.5rem; }
  .left-column { grid-column: span 4 / span 4; display: flex; flex-direction: column; gap: 1.5rem; }
  .skills-section, .contact-section, .languages-section, .certifications-section, .interests-section { border-width: 1px; background-color: rgb(255 255 255 / 1); padding: 1.5rem; box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05); }
  .skills-heading { margin-bottom: 1rem; font-weight: 600; }
  .skills-tags-wrapper { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .skill-tag { display: inline-flex; align-items: center; border-radius: 0.375rem; border-width: 1px; border-color: rgb(226 232 240 / 1); background-color: rgb(248 250 252 / 1); padding: 0.25rem 0.75rem; font-size: 0.875rem; line-height: 1.25rem; color: rgb(30 41 59 / 1); }
  .contact-heading, .languages-heading, .certifications-heading, .interests-heading { margin-bottom: 1rem; font-weight: 600; }
  .contact-details-list { display: flex; flex-direction: column; gap: 0.5rem; color: rgb(51 65 85 / 1); }
  .contact-detail-item { display: flex; align-items: center; gap: 0.75rem; min-width: 0; }
  .contact-detail-item a,
  .contact-detail-item span {
    word-break: break-word;     /* ✅ wrap long words/URLs */
    overflow-wrap: anywhere;    /* ✅ extra safety for very long strings */
    flex: 1;                    /* ✅ let the text take remaining space */
    min-width: 0;
  }
  .languages-list { display: flex; flex-direction: column; gap: 0.5rem; color: rgb(51 65 85 / 1); }
  .language-item { display: flex; align-items: center; justify-content: space-between; }
  .language-proficiency { color: rgb(100 116 139 / 1); }
  .certifications-list { display: flex; flex-direction: column; gap: 0.75rem; color: rgb(51 65 85 / 1); }
  .certification-item { display: flex; flex-direction: column; }
  .certification-title { font-weight: 500; }
  .certification-meta { color: rgb(100 116 139 / 1); }
  .interests-text { color: rgb(51 65 85 / 1); }
  .right-column { grid-column: span 8 / span 8; display: flex; flex-direction: column; gap: 1.5rem; }
  .experience-section, .projects-section, .education-section, .awards-section, .references-section { border-width: 1px; background-color: rgb(255 255 255 / 1); padding: 1.5rem; box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05); }
  .experience-heading, .projects-heading, .education-heading, .awards-heading, .references-heading { margin-bottom: 1rem; font-weight: 600; }
  .experience-list { display: flex; flex-direction: column; gap: 1.5rem; }
  .experience-item { display: flex; flex-direction: column; gap: 0.75rem; }
  .experience-header { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 0.5rem; }
  .experience-title-block { display: flex; flex-direction: column; }
  .job-title { font-weight: 600; font-size: 1.125rem; line-height: 1.75rem; }
  .company-name { color: rgb(51 65 85 / 1); }
  .experience-dates { color: rgb(100 116 139 / 1); font-size: 0.875rem; line-height: 1.25rem; }
  .experience-bullets { display: flex; flex-direction: column; gap: 0.5rem; list-style-type: disc; padding-left: 1.25rem; color: rgb(51 65 85 / 1); }
  .experience-skills-wrapper { display: flex; flex-wrap: wrap; gap: 0.5rem; padding-top: 0.25rem; }
  .experience-skill-tag { display: inline-flex; align-items: center; border-radius: 0.375rem; border-width: 1px; border-color: rgb(226 232 240 / 1); background-color: rgb(248 250 252 / 1); padding: 0.25rem 0.625rem; font-size: 0.75rem; line-height: 1rem; color: rgb(51 65 85 / 1); }
  .projects-list { display: flex; flex-direction: column; gap: 1.25rem; }
  .project-item { display: flex; flex-direction: column; gap: 0.5rem; }
  .project-title-row { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 0.5rem; }
  .project-title-link { font-weight: 500; font-size: 1.125rem; line-height: 1.75rem; }
  .project-meta { color: rgb(100 116 139 / 1); font-size: 0.875rem; line-height: 1.25rem; }
  .project-description { color: rgb(51 65 85 / 1); }
  .project-highlights { display: flex; flex-direction: column; gap: 0.375rem; list-style-type: disc; padding-left: 1.25rem; color: rgb(51 65 85 / 1); }
  .project-tags-wrapper { display: flex; flex-wrap: wrap; gap: 0.5rem; padding-top: 0.25rem; }
  .project-tag { display: inline-flex; align-items: center; border-radius: 0.375rem; border-width: 1px; border-color: rgb(226 232 240 / 1); background-color: rgb(248 250 252 / 1); padding: 0.25rem 0.625rem; font-size: 0.75rem; line-height: 1rem; color: rgb(51 65 85 / 1); }
  .education-list { display: flex; flex-direction: column; gap: 1.25rem; }
  .education-item { display: flex; flex-direction: column; }
  .education-header { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 0.5rem; }
  .degree-title { font-weight: 500; }
  .education-dates { color: rgb(100 116 139 / 1); font-size: 0.875rem; line-height: 1.25rem; }
  .education-meta-row { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; color: rgb(51 65 85 / 1); }
  .education-location { color: rgb(100 116 139 / 1); }
  .education-highlights { margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.25rem; list-style-type: disc; padding-left: 1.25rem; color: rgb(51 65 85 / 1); }
  .awards-list { display: flex; flex-direction: column; gap: 0.5rem; color: rgb(51 65 85 / 1); }
  .award-item { display: flex; flex-direction: column; }
  .award-title { font-weight: 500; }
  .award-meta { color: rgb(100 116 139 / 1); }
  .footer-section { margin-top: 2.5rem; text-align: center; font-size: 0.875rem; line-height: 1.25rem; color: rgb(100 116 139 / 1); }
  @media (max-width: 992px) {
    .header-top-row { flex-direction: column; align-items: flex-start; }
    .summary-card { padding: 1.25rem; }
    .left-column { grid-column: span 12 / span 12; }
    .skills-section, .contact-section, .languages-section, .certifications-section, .interests-section { padding: 1.25rem; }
    .right-column { grid-column: span 12 / span 12; }
    .experience-section, .projects-section, .education-section, .awards-section, .references-section { padding: 1.25rem; }
  }
  @media (max-width: 480px) {
    .summary-card, .skills-section, .contact-section, .languages-section, .certifications-section, .interests-section, .experience-section, .projects-section, .education-section, .awards-section, .references-section { padding: 1rem; }
  }
  @media print {
    /* Ensure the two-column layout is maintained for printing */
    .left-column {
      grid-column: span 4 / span 4;
    }
    .right-column {
      grid-column: span 8 / span 8;
    }
  }

`;
