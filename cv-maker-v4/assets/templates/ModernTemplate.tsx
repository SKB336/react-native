import { TemplateDataType } from "~/types/forms";
// import { EncodingType, readAsStringAsync } from "expo-file-system";
import { File } from "expo-file-system";

export default async function ModernTemplate(data: TemplateDataType) {
    const {
      personal_form,
      objective_form,
      experience_entries,
      education_entries,
      skill_entries,
      reference_entries
    } = data;

    let photo = '';
    console.log("personal_form?.photo", personal_form?.photo);
    if (personal_form?.photo) {
        try {
            const file = new File(personal_form?.photo, "");
            photo = await file.base64();
        } catch (error) {
            console.log(error);
        }
    }

    return /*html*/`
    <!DOCTYPE html>
    <html>
    <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
        <style>
        @page {
            size: A4;
        }

        body {
            margin: 0;
            padding: 0;
        }

        .grid-container {
            display: grid;
            grid-template-columns: 2fr 5fr; /* 2 equal-width columns */
            gap: 20px; /* Space between columns */
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
        }

        .column {
            display: flex;
            flex-direction: column; /* Column direction inside each column */
            font-size: 14px
        }

        .item {
            padding: 10px;
            margin: 5px;
        }

        .text-center {
            text-align: center;
        }

        .text-left {
            text-align: left;
        }

        .bg-1 {
            background-color: #82AFA7;
            min-height: 100%;
        }

        #name {
            margin-bottom: 0.5em;
            font-weight: bold;
        }

        #current-position {
            margin-top: 10px;
        }

        .left-header {
            text-decoration: underline;
            text-decoration-thickness: 2px;
            text-underline-offset: 4px;   
        }

        #contact div {
            margin-bottom: 0.5em;
        }

        .section-header {
            color: #82AFA7;
        }

        .flex {
            display: flex;
        }

        .flex-1 {
            flex: 1 1 0%;
        }

        .experience-header {
            font-weight: bold;
        }

        .mt-20 {
            margin-top: 1em;
        }

        .mt-40 {
            margin-top: 2em;
        }

        .mb-20 {
            margin-bottom: 1em;
        }

        .mb-40 {
            margin-bottom: 2em;
        }

        .arrow-bullets {
            list-style: none;
            padding-left: 0;
        }

        .arrow-bullets li::before {
            content: "➤"; /* You can also use → or ► */
            color: #82AFA7;
            font-weight: bold;
            display: inline-block;
            width: 1.5em;
        }

        .flex-li {
            display: flex;
            align-items: flex-start;
            margin-bottom: 2em;
        }

        .flex-li li::before {
            content: "";
        }

        .profile-picture {
            border-radius: 50%; 
            object-fit: cover; 
            margin-top: 3.5em;
            margin-bottom: 1em;
            width: 12em;
            height: 12em;
        }

        .grid-container > .column:nth-child(2) > .item:first-child {
            margin-top: 2em;
        }
        </style>
    </head>
    <body>
        <div class="grid-container">
        <div class="column text-center bg-1">
            ${personal_form ? `
            <div class="item">
                ${photo ? `<img src="data:image/jpeg;base64,${photo}" alt="Profile Photo" class="profile-picture">` : ''}
                <h2 id="name">${personal_form.fullName}</h2>
                ${personal_form.currentPosition ? `<h3 id="current-position">${personal_form.currentPosition}</h3>` : ''}
            </div>` : ''}

            ${personal_form ? `
            <div id="contact" class="item">
                <h3 class="left-header">Contact Details</h3>
                <div><i class="fas fa-envelope"></i> ${personal_form.email}</div>
                <div><i class="fas fa-phone"></i> ${personal_form.phone}</div>
                ${personal_form.website ? `<div><i class="fas fa-globe"></i> ${personal_form.website}</div>` : ''}
                ${personal_form.linkedIn ? `<div><i class="fas fa-link"></i> ${personal_form.linkedIn}</div>` : ''}
            </div>` : ''}

            ${skill_entries ? `
            <div id="skill" class="item">
                <h3 class="left-header">Core Skills</h3>
                <ul>
                    ${skill_entries.map((entry: any) => `
                    <li class="text-left">${entry.skill}</li>
                    `).join('')}
                </ul>
            </div>` : ''}
        </div>

        <div class="column">
            ${objective_form ? `
            <div class="item">
                <h2 class="text-center section-header">Professional Profile</h2>
                <div>
                    ${objective_form.objective}
                </div>
            </div>` : ''}

            ${experience_entries ? `
            <div class="item">
                <h2 class="text-center section-header">Career Summary</h2>
                ${experience_entries.map((entry: any) => `
                <div class="mt-40"> 
                    <div class="flex experience-header">
                    <div class="flex-1" style="flex-grow:0.6">${entry.dateFrom} - ${entry.dateTo}</div>
                    <div class="flex-1" >
                        <div>${entry.company}</div>
                        <div>${entry.position}</div>
                    </div>
                    </div>
                    ${entry.details 
                        ? `<ul class="experience-bullets">${
                            entry.details
                            .split('\n')
                            .filter(Boolean)
                            .map((d: string) => `<li>${d.replace(/^\s*-\s*/, '')}</li>`)
                            .join('')
                        }</ul>` 
                        : ''
                    }
                </div>
                `).join('')}
            </div>` : ''}

            ${education_entries ? `
            <div class="item">
                <h2 class="text-center section-header">Education</h2>
                <ul class="arrow-bullets">
                    ${education_entries.map((entry: any) => `
                    <li>
                        <strong>${entry.course}</strong> | ${entry.institution} | ${entry.year}
                    </li>
                    `).join('')}
                </ul>
            </div>` : ''}

            ${reference_entries ? `
            <div id="references" class="item">
                <h2 class="text-center section-header">References</h2>
                <ul style="padding: 0; list-style-type: none;">
                    ${reference_entries.map((entry: any) => `
                    <li class="flex-li">
                        <div><strong>${entry.refName}</strong> (${entry.company})
                        <br>
                        ${entry.position}, ${entry.phone}
                        <br>
                        ${entry.email}
                        </div>
                    </li>
                    `).join('')}
                </ul>
            </div>` : ''}
        </div>
        </div>
    </body>
    </html>
    `;
}
