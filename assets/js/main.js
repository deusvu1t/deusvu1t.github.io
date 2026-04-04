const modal = document.getElementById("certificate-modal");
const modalContent = document.getElementById("certificate-modal-content");
const certificateLinks = document.querySelectorAll("[data-cert-src]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const sections = document.querySelectorAll("section[id], footer[id]");

if (modal && modalContent && certificateLinks.length > 0) {
    const closeModal = () => {
        modal.close();
        modalContent.innerHTML = "";
        document.body.style.overflow = "";
    };

    const openModal = (src, type) => {
        modalContent.innerHTML =
            type === "image"
                ? `<img src="${src}" alt="Certificate preview" class="certificate-modal__image">`
                : `<iframe src="${src}" title="Certificate preview" class="certificate-modal__frame"></iframe>`;
        modal.showModal();
        document.body.style.overflow = "hidden";
    };

    certificateLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            openModal(link.dataset.certSrc, link.dataset.certType);
        });
    });

    modal.addEventListener("click", (event) => {
        if (event.target instanceof HTMLElement && event.target.dataset.modalClose !== undefined) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.open) {
            closeModal();
        }
    });
}

if (navLinks.length > 0 && sections.length > 0) {
    const setActiveLink = (id) => {
        navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
        });
    };

    const observer = new IntersectionObserver(
        (entries) => {
            const visibleEntry = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (visibleEntry?.target?.id) {
                setActiveLink(visibleEntry.target.id);
            }
        },
        {
            rootMargin: "-25% 0px -55% 0px",
            threshold: [0.2, 0.4, 0.6],
        }
    );

    sections.forEach((section) => observer.observe(section));
}
