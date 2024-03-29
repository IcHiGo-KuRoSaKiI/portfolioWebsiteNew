var md = window.markdownit();



let pages;
let about;
let projects;
// Update the URL to your JSON file
const jsonUrl = 'pages.json';

// Fetch the JSON file
fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
        // Now 'data' contains the array of pages
        // Update your existing code to use 'data' instead of 'pages'
        pages = data.work.items;
        about = data.basics;
        projects = data.projects.items;
        // ... (rest of your code)
    })
    .catch(error => console.error('Error fetching JSON:', error));



function showabout() {
    $("#about_container").css("display", "inherit");
    $("#about_container").addClass("animated slideInLeft");
    setTimeout(function () {
        $("#about_container").removeClass("animated slideInLeft");
        const aboutContainer = $("#about_content");
        aboutContainer.empty();
        aboutContainer.append(generateAboutSection(about));
    }, 800);
}
function closeabout() {
    $("#about_container").addClass("animated slideOutLeft");
    setTimeout(function () {
        $("#about_container").removeClass("animated slideOutLeft");
        $("#about_container").css("display", "none");
    }, 800);
}

function showwork() {
    $("#work_container").css("display", "inherit");
    $("#work_container").addClass("animated slideInRight");
    $("#nav_buttons").css("display", "block"); // Show navigation bar

    setTimeout(function () {
        $("#work_container").removeClass("animated slideInRight");
        // Determine the first page dynamically
        const firstPageId = pages.length > 0 ? pages[0].id : null;

        // Initial page load
        changePage(firstPageId);

    }, 800);
}

function closework() {
    $("#work_container").addClass("animated slideOutRight");
    setTimeout(function () {
        $("#work_container").removeClass("animated slideOutRight");
        $("#work_container").css("display", "none");
        $("#nav_buttons").css("display", "none"); // Hide navigation bar
    }, 800);
}

function showcontact() {
    $("#contact_container").css("display", "inherit");
    $("#contact_container").addClass("animated slideInUp");
    // $(document).one('keydown', function(e) {        
    //     if (e.keyCode == 27) {
    //         closecontact();
    //     }
    // });
    setTimeout(function () {
        $("#contact_container").removeClass("animated slideInUp");
    }, 800);

}
function closecontact() {
    $("#contact_container").addClass("animated slideOutDown");
    setTimeout(function () {
        $("#contact_container").removeClass("animated slideOutDown");
        $("#contact_container").css("display", "none");
    }, 800);
}


$(document).ready(function () {
    //$(".pages").hide();
    $("#nav_buttons a").click(function (e) {
        e.preventDefault();
        var item = this.href.split("#")[1];
        $(".pages:visible").slideUp(function () {
            $("#" + item).slideDown();
        });
    });
    $("#home").show();
});


setTimeout(function () {
    $("#loading").addClass("animated fadeOut");
    setTimeout(function () {
        $("#loading").removeClass("animated fadeOut");
        $("#loading").css("display", "none");
        $("#box").css("display", "none");
        $("#about").removeClass("animated fadeIn");
        $("#contact").removeClass("animated fadeIn");
        $("#work").removeClass("animated fadeIn");
    }, 1000);
}, 1500);
var origin = 0.00;
setInterval(function () {
    document.querySelector("#distance").innerHTML = Math.ceil(origin);
    origin += 1.9;
}, 100)

// For the Work Section
// Declare changePage globally
function changePage(pageId) {
    const page = pages.find(p => p.id === pageId);
    if (page) {
        // Dynamically generate content
        const contentHtml = `
            <section id="${page.id}" class="pages">
                <h2>${page.title}</h2>
                <p>${md.render(page.content)}</p>
                <div id="used">
                    ${page.technologies.map(tech => `<div><i class="fas fa-circle"></i>&nbsp;${tech}</div>`).join('')}
                </div>
            </section>
        `;

        // Update content container
        const contentContainer = $("#content-container");
        contentContainer.empty();
        contentContainer.append(contentHtml);

        // Update navigation buttons
        const navButtonsContainer = $("#nav_buttons");
        navButtonsContainer.empty();
        navButtonsContainer.append(generateNavButtons(pageId));
    }
}

// Function to generate navigation buttons dynamically with styling
function generateNavButtons(currentPageId) {
    const buttons = pages.reduce((acc, page) => {
        const pageButtons = page.buttons.map(button => {
            const activeClass = button.class === 'btn_one' && page.id === currentPageId ? 'active' : '';
            return `<button class="${activeClass} ${button.class}" onclick='changePage("${page.id}")'>${button.text}</button>`;
        });
        return acc.concat(pageButtons);
    }, []);

    return buttons.join('');
}


// Function to render about section
function generateAboutSection(basics) {
    return `
        <section id="${basics.id}" class="pages">
            <p>${md.render(basics.headline)}</p>
            <p>${md.render(basics.summary)}</p>
            <div id="used">
                ${basics.profiles.map(profile => `
                    <div onclick="window.open('${profile.url}', '_blank'); return false;">
                        <i class="fab fa-${profile.network.toLowerCase()}"></i>&nbsp;${profile.username}
                    </div>`).join('')}
            </div>
        </section>
    `;
}


// // Function to generate Projects section dynamically
// function generateProjectsSection(projects) {
//     return `
//         <section id="${projects.id}" class="pages">
//             <h2>${projects.name}</h2>
//             ${projects.items.map(project => `
//                 <div class="project">
//                     <h3>${project.name}</h3>
//                     <p>${md.render(project.summary)}</p>
//                     <p><strong>Start Date:</strong> ${project.date.start}</p>
//                     <p><strong>End Date:</strong> ${project.date.end || 'Present'}</p>
//                     <p><strong>Description:</strong> ${md.render(project.description)}</p>
//                     ${project.keywords.length > 0 ? `<p><strong>Keywords:</strong> ${project.keywords.join(', ')}</p>` : ''}
//                 </div>
//             `).join('')}
//         </section>
//     `;
// }
