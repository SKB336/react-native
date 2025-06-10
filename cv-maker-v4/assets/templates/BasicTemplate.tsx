import { TemplateDataType } from "~/types/forms";

export default function BasicTemplate(data: TemplateDataType) {
    const {
      personal_form,
      objective_form,
      experience_entries,
      education_entries,
      skill_entries,
      reference_entries
    } = data;

    console.log("Data", data, skill_entries)
  
    return /*html*/`
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My CV</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            background-color: #f4f4f4;
            color: #333;
        }
        .container {
            max-width: 800px;
            background: white;
            padding: 30px;
            margin: auto;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1, h2, h3 {
            margin-bottom: 10px;
            color: #2c3e50;
        }
        .section {
            margin-bottom: 30px;
        }
        .section-title {
            border-bottom: 2px solid #3498db;
            padding-bottom: 5px;
            margin-bottom: 20px;
            font-size: 24px;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            margin-bottom: 10px;
        }
        .contact-info {
            margin-top: 10px;
            font-size: 14px;
        }
        .contact-info span {
            display: block;
        }
    </style>
    </head>
    <body>
    <div class="container">
        ${personal_form ? `
        <div>
            <h1 id="fullName">${personal_form.fullName}</h1>
            <div class="contact-info">
                <span>Email: ${personal_form.email}</span>
                <span>Phone: ${personal_form.phone}</span>
                ${personal_form.linkedIn ? `<span>LinkedIn: ${personal_form.linkedIn}</span>` : ''}
            </div>
        </div>` : ''}

        ${objective_form ? `
        <div class="section">
            <h2 class="section-title">Profile</h2>
            <p>${objective_form.objective}</p>
        </div>` : ''}

        ${education_entries ? `
        <div class="section">
            <h2 class="section-title">Education</h2>
            <ul>
                ${education_entries.map((entry: any) => `
                <li><strong>${entry.course}</strong> - ${entry.institution} (${entry.year})</li>
                `).join('')}
            </ul>
        </div>` : ''}

        ${experience_entries ? `
        <div class="section">
            <h2 class="section-title">Experience</h2>
            <ul>
                ${experience_entries.map((entry: any) => `
                <li>
                    <strong>${entry.position}</strong> - ${entry.company} (${entry.dateFrom} - ${entry.dateTo})
                    <br>
                    ${entry.details ? `<p>${entry.details}</p>` : ''}
                </li>
                `).join('')}
            </ul>
        </div>` : ''}

        ${skill_entries ? `
        <div class="section">
            <h2 class="section-title">Skills</h2>
            <ul>
                ${skill_entries.map((entry: any) => `
                <li>${entry.skill}</li>
                `).join('')}
            </ul>
        </div>` : ''}

        ${reference_entries ? `
        <div class="section">
            <h2 class="section-title">References</h2>
            <ul>
                ${reference_entries.map((entry: any) => `
                <li>
                    <strong>${entry.refName}</strong> - (${entry.company})
                    <br>
                    ${entry.position}, ${entry.phone}
                    <br>
                    ${entry.email}                    
                </li>
                `).join('')}
            </ul>
        </div>` : ''}
    </div>
    </body>
    </html>
    `;
}
  