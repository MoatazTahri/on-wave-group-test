document.addEventListener("DOMContentLoaded", function () {
    let cards = document.querySelectorAll(".card");

    let observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        {threshold: 0.3}
    );
    cards.forEach(card => observer.observe(card));
});