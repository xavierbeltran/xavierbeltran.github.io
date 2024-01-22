
  const experiences = [
    {
      title: "Sales Associate",
      company_name: "Foot Locker",
      date: "July 2018 - Nov 2021",
      points: [
        "Provided customers with personalized shopping experiences, catering to their preferences, and assisting with trying on various items, including sneakers and clothing",
        "Efficiently processed customer sales, returns, and exchanges, ensuring a streamlined and hassle-free shopping process",
        "Conducted thorough quarterly inventory checks and audits to uphold precise stock levels, minimize discrepancies, and optimize overall inventory management",
      ],
    },
    {
      title: "Sales Associate",
      company_name: "Sunglass Hut",
      date: "Oct 2020 - Nov 2021",
      points: [
        "Assisted customers with sunglasses and demonstrated organizational skills in a fast-paced environment, typically as the sole associate"
      ],
    },
    {
      title: "Assistant Manager",
      company_name: "Foot Locker",
      date: "Nov 2021 - Present",
      points: [
        "Demonstrate excellence in in-store operations, visual merchandising, and asset protection",
        "Led end-to-end recruitment processes, including phone screenings, interviews, onboarding, and comprehensive training for a diverse team of 30-40 associates, spanning front-end, sales, and stock roles",
        "Successfully spearheaded initiatives that led to over a two-million-dollar growth in sales within the first year as a full-time associate"
      ],
    },
  ];

  const projects = [
    {
      name: "Metaversus",
      description:
        "Created a 3-D website fictionalizing the metaverse and the future of the internet.",
      source_code_link: "https://github.com/xavierbeltran/metaversus",
      long_desc: "\nFollowing a tutorial using a YouTube video to build a 3-D website actualizing the metaverse and the future of the internet. The application was constructed following a Figma file that contained the entire application design. Used React and packages such as framer-motion to display animation. The application is being deployed via GitHub Actions and GitHub Pages.",
      date: "January 2024",
      tools: "React, Next.js, Figma, JavaScript, Visual Studio Code, Git, GitHub and GitHub Pages, Markdown, HTML, CSS, Tailwind CSS, JSX, framer-motion",
      demo_link: "https://xavierbeltran.github.io/metaversus/"
    },
    {
      name: "DALL-E Clone",
      description:
      "Created a DALL-E clone using React and the OpenAI API to generate images based on text input.",
      source_code_link: "https://github.com/xavierbeltran/dall-e_clone",
      long_desc: "\nFollowing a tutorial using a YouTube video to build a DALL-E clone using React and the OpenAI API to generate images based on text input. The application uses a form to take in text input and then sends a request to the OpenAI API to generate an image based on the text input. The image is then displayed on the screen and the user has the option to publish the image to the community gallery. The front-end is deployed using GitHub Pages, while the back-end is deployed using Heroku.",
      date: "January 2024",
      tools: "React, OpenAI API, Cloudinary, JavaScript, Visual Studio Code, Git, GitHub, Markdown, HTML, CSS, Tailwind CSS, JSX, Node.js, NPM, Heroku, MongoDB, Express.js",
      demo_link: "https://xavierbeltran.github.io/dall-e_clone/"
    },
    {
      name: "Information Retrieval System",
      description:
        "Built a basic information system by combining various components of a semester long project, into a final retrieval system that was able to query a corpus full of various information related to academic papers.",
      source_code_link: "https://github.com/xavierbeltran",
      course: "Information Retrieval",
      long_desc: "Collaborated with two other students to build an information retrieval system that has capabilities to query a corpus filled with close to 5000 documents. The system used various different algorithms to train the data and produce a result more similar to the query, and the user has the option to choose which algorithm to be tested.",
      date: "December 2023",
      tools: "Python, PyCharm, Anaconda",
    },
    {
      name: "Maze Game",
      description:
        "Designed and implemented a dynamic maze game in two distinct renditions, replicating a top-view scenario where a mouse navigates toward an exit.",
      source_code_link: "https://github.com/xavierbeltran",
      course: "Computer Graphics",
      long_desc: "Designed and implemented a dynamic maze game in two distinct renditions, replicating a top-view scenario where a mouse navigates toward an exit. The maze that the \"mouse\" is navigating through is generated as a hexadecimal representation where the walls represent the bits in each cell to allow for different versions. \n\tThe first version uses a circle and the arrow keys to move around the maze, and simple translations in WebGL. \n\tThe second version uses a new \"mouse\" and the arrow keys cause for rotations as well as translations to build on the previous version.",
      date: "November 2023",
      tools: "JavaScript, Visual Studio Code, WebGL"
    },
    {
      name: "Dyslexia Simulation",
      description:
        "Designed a game with another student that simulated a classroom environment and the experiences that a student with dyslexia may face",
      source_code_link: "https://github.com/xavierbeltran",
      course: "3-D Game Development",
      long_desc: "Worked with another student to build a dyslexia simulation in a classroom environment, using components such as ambient noises, other students voices, as well as the scrambling of words that may be seen to a person that has dyslexia. Research was done to simulate some of the word scrambling and a memory feature was adding to add some more complexity to the game.",
      date: "May 2023",
      tools: "Unity, C#"
    },
    {
      name: "Rails of Justice",
      description:
        "Collaborated with several students to add features to a module in an existing project and modeled each step of the SDLC in the process.",
      source_code_link: "https://github.com/xavierbeltran",
      course: "Software Engineering",
      long_desc: "\nCollaborated with a local non-profit to gather requirements, design, and implement a CSV upload and search feature in an established application, while actively participating in the entire software development life cycle.\nImplemented enhancements within an MVC-structured software, prioritizing modularity, efficiency, scalability, security, and adherence to the Eight Golden Rules of Interface Design.",
      date: "May 2023",
      tools: "Ruby on Rails, HTML, CSS, Ruby, Bootstrap, SSH, Visual Studio Code, Git, GitHub, Markdown, MVC Architecture, UML Diagrams, PostgreSQL"
    },
  ];
  document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("projectsContainer");

    // Iterate through projects and dynamically create cards and modals
    projects.forEach((project, index) => {
        // Create a card element
        const card = document.createElement("div");
        card.setAttribute("class", "col");
        card.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${project.name}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${project.date}</h6>
                    <p class="card-text">${project.description}</p>
                </div>
                <div class="card-footer">
                    <small class="text-body-secondary">
                        <a href=${project.source_code_link} class="card-link"><img
                                    src="../assets/images/github-symbol/github-mark.svg" alt="Bootstrap" width="30"
                                    height="30"></a>
                        <a href="#" class="card-link btn btn-dark" data-bs-toggle="modal" data-bs-target="#projectModal${index}">Request Access</a>
                        <a class="card-link" data-bs-toggle="modal" data-bs-target="#projectModal${index}"><img src="../assets/images/expand.png" alt="Expand to View More" width="50" height="50"></a>
                    </small>
                </div>
            </div>`;

        // Create a modal element
        const modal = document.createElement("div");
        modal.setAttribute("class", "modal fade");
        modal.setAttribute("id", `projectModal${index}`);
        modal.setAttribute("tabindex", "-1");
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-labelledby", "exampleModalLabel");
        modal.setAttribute("aria-hidden", "true");
        modal.innerHTML = `
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">${project.name}</h5>
                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p><strong>Date: </strong>${project.date}</p>
                        <p><strong>Course: </strong>${project.course || ""}</p>
                        <p><strong>Description: </strong>${project.long_desc}</p>
                        <p><strong>Tools and Tech: </strong>${project.tools}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>`;

        // Append both the card and modal to the container
        container.appendChild(card);
        container.appendChild(modal);
    });
});
