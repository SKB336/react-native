export const ModernTemplate = /*html*/`
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
    /*   background-color: #ccc; */
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
    font-weight: bold
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

    /* .flex-li div {
        margin-left: 0.3em;
    } */

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

        <div class="item">
        <img src="https://media.licdn.com/dms/image/v2/D4D03AQGA0ZwG6N0hzw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1714055182590?e=2147483647&v=beta&t=tgIyITAqBS2JViyxf3ejqfvlSThqEDw5JTLbf3m-lNs" alt="Profile Photo" class="profile-picture">
        <h2 id="name">Arsalan Ahmed</h2>
        <h3 id="current-position">Systems Engineer</h3>
        </div>

        <div id="contact" class="item">
        <h3 class="left-header">Contact Details</h3>
        <div><i class="fas fa-envelope"></i> arsalanahmed336@gmail.com</div>
        <div><i class="fas fa-phone"></i> 03171189811</div>
        <div><i class="fas fa-globe"></i> portfolio.arsalanahmed.com</div>
        <div><i class="fas fa-link"></i> linkedin.com/in/arsalanahmed</div>
        </div>

        <div id="skill" class="item">
        <h3 class="left-header">Core Skills</h3>
        <ul>
            <li class="text-left">AWS</li>
            <li class="text-left">Docker</li>
            <li class="text-left">Kubernetes</li>
            <li class="text-left">Jenkins</li>
            <li class="text-left">Git</li>
            <li class="text-left">Jira</li>
        </ul>
        </div>
    </div>

    <div class="column">

        <div class="item">
        <h2 class="text-center section-header">Professional Profile</h2>
        <div>
            Experienced Systems Engineer with a strong background in cloud computing, containerization, and DevOps practices. Skilled in AWS, Docker, Kubernetes, and CI/CD pipelines, with a proven track record of delivering scalable and efficient solutions.
        </div>
        </div>

        <div class="item">
        <h2 class="text-center section-header">Career Summary</h2>
        <div class="mt-40"> 
            <div class="flex experience-header">
            <div class="flex-1" style="flex-grow:0.6">Feb 2024 - Present</div>
            <div class="flex-1" >
                <div>Microsoft, Washington</div>
                <div>Senior Systems Engineer</div>
            </div>
            </div>
            <div class="mt-20">As a Junior Software Engineer at Microsoft, I contributed to the development of internal web applications using React and Node.js. I worked closely with cross-functional teams in an Agile environment, helping to implement new features and resolve technical issues. My efforts in optimizing CI/CD pipelines led to a 25% reduction in deployment times. I also participated in code reviews, debugging, and documentation, gaining hands-on experience in scalable frontend and backend systems.</div>
        </div>
        <div class="mt-40"> 
            <div class="flex experience-header">
            <div class="flex-1" style="flex-grow:0.6">Feb 2024 - Present</div>
            <div class="flex-1" >
                <div>Amazon, New York</div>
                <div>Senior Systems Engineer</div>
            </div>
            </div>
            <div class="mt-20">As a Senior Systems Engineer at Amazon, I was responsible for managing and maintaining the company's cloud infrastructure. I worked closely with cross-functional teams in an Agile environment, helping to implement new features and resolve technical issues. My efforts in optimizing CI/CD pipelines led to a 25% reduction in deployment times. I also participated in code reviews, debugging, and documentation, gaining hands-on experience in scalable frontend and backend systems.
            </div>
        </div>
        </div>

        <div class="item">
            <h2 class="text-center section-header">Education</h2>
            <ul class="arrow-bullets">
                <li>
                    <strong>Bachelor of Science in Computer Science</strong> | University of Washington | 2020 - 2024
                </li>
                <li>
                    <strong>FSc Pre-Medical</strong> | Board of Intermediate Education Karachi | 2020 - 2024
                </li>
            </ul>
        </div>

        <div id="references" class="item">
            <h2 class="text-center section-header">References</h2>
            <ul style="padding: 0; list-style-type: none;">
                <li class="flex-li">
                    <div><strong>David Marston</strong> (Google)
                    <br>
                    Senior Technical Lead, +1 123 456 789
                    <br>
                    davidmarston79@gmail.com
                    </div>
                </li>
                <li class="flex-li">
                    <div><strong>Abigail Smith (Visa)</strong>
                    <br>
                    HR Manager, +1 451 456 789
                    <br>
                    abigailsmith32@gmail.com</div>
                </li>
                <li class="flex-li">
                    <div><strong>John Doe (Accenture)</strong>
                    <br>
                    Project Manager, +1 789 456 789
                    <br>
                    johndoe32@gmail.com</div>
                </li>
            </ul>
        </div>
    </div>
    </div>
</body>
</html>
`