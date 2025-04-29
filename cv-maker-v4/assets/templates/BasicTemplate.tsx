export const BasicTemplate = /*html*/`
    <!DOCTYPE html>
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
        <h1 id="fullName">{{fullName}}</h1>
        <div class="contact-info">
            <span>Email: {{email}}</span>
            <span>Phone: {{phone}}</span>
            <!-- <span>Location: Your City, Country</span> -->
            <span>LinkedIn: {{linkedIn}}</span>
        </div>

        <div class="section">
            <h2 class="section-title">Profile</h2>
            <p>{{objective}}</p>
        </div>

        <div class="section">
            <h2 class="section-title">Education</h2>
            <ul>
                {{education_entries}}
            </ul>
        </div>

        <div class="section">
            <h2 class="section-title">Experience</h2>
            <ul>
                {{experience_entries}}
            </ul>
        </div>

        <div id="skill_entries" class="section">
            <h2 class="section-title">Skills</h2>
            <ul>
                {{skill_entries}}
            </ul>
        </div>

        <div class="section">
            <h2 class="section-title">Projects</h2>
            <ul>
                <li>
                <strong>Project Name</strong> - Brief description about what the project does and your role.
                </li>
                <li>
                <strong>Another Project</strong> - Short description here.
                </li>
            </ul>
        </div>
    </div>
    </body>
    </html>
`

export const EducationInjection = /*html*/`
<li>
    <strong>{{course}}</strong> - {{institution}} ({{year}})
    <br>
    Description or achievements related to your study.
</li>
`

export const ExperienceInjection = /*html*/`
<li>
    <strong>{{position}}</strong> - {{company}} ({{dateFrom}} - {{dateTo}})
    <br>
    <p>{{details}}</p>
</li>
`

export const SkillsInjection = /*html*/`
<li>{{skill}}</li>
`