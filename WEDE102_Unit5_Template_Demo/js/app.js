const contentArea =
    document.getElementById("content");


const navigationLinks =
    document.querySelectorAll(".nav-link");

async function loadPage(page) {

    contentArea.innerHTML = `
        <p
            class="loading-message"
            aria-live="polite"
        >
            Loading content...
        </p>
    `;

    try {

        const response =
            await fetch(page);

        if (!response.ok) {
            throw new Error(
                `Could not load ${page}`
            );
        }

        const content =
            await response.text();

        contentArea.innerHTML =
            content;

    }
    catch (error) {

        console.error(error);

        contentArea.innerHTML = `
            <section class="content-section">

                <h2>
                    Content unavailable
                </h2>

                <p>
                    The requested content could
                    not be loaded.
                </p>

            </section>
        `;

    }

}

navigationLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        function (event) {
            event.preventDefault();


            navigationLinks.forEach(
                function (item) {

                    item.classList.remove("active");

                }
            );


            link.classList.add("active");


            const page =
                link.getAttribute("href");


            loadPage(page);

        }
    );

});

document.addEventListener(
    "click",
    function (event) {

        const contentLink =
            event.target.closest(".content-link");


        if (!contentLink) {

            return;

        }


        event.preventDefault();


        const page =
            contentLink.getAttribute("href");


        loadPage(page);

    }
);

const backToTopButton =
    document.getElementById("backToTop");

window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        backToTopButton.classList.add("show");
    }
    else {
        backToTopButton.classList.remove("show");
    }
});


const menuToggle = document.getElementById("menuToggle");

const primaryMenu = document.getElementById("primaryMenu");

menuToggle.addEventListener(
    "click",
    function () {

        const menuIsOpen =
            primaryMenu.classList.toggle("open");


        menuToggle.setAttribute(
            "aria-expanded",
            menuIsOpen
        );


        if (menuIsOpen) {

            menuToggle.textContent =
                "✕ Close";

            menuToggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );

        }
        else {

            menuToggle.textContent =
                "☰ Menu";

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    }
);

function closeMobileMenu() {

    primaryMenu.classList.remove("open");


    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );


    menuToggle.textContent =
        "☰ Menu";


    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

}


loadPage("pages/home.html");