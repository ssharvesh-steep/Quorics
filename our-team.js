const teamMembers = [
    { name: "Sharvesh", role: "Founder", linkedin: "https://www.linkedin.com/in/s-sharvesh/", instagram: "https://www.instagram.com/_shxrvesh_/" },
    { name: "Sakthivel", role: "Co Founder", linkedin: "https://linkedin.com/in/sakthivel", instagram: "https://instagram.com/sakthivel" },
    { name: "Sreejith", role: "Co Founder", linkedin: "https://linkedin.com/in/sreejith", instagram: "https://instagram.com/sreejith" },
    { name: "Shri Dharshini", role: "Co Founder", linkedin: "https://www.linkedin.com/in/shri-dharshini-velu-85606a2a6/recent-activity/all/", instagram: "https://instagram.com/shridharshinivelu" },
    { name: "SivaDharana", role: "Co Founder", linkedin: "https://linkedin.com/in/sivadharana", instagram: "https://instagram.com/sivadharana" },
];

const cards = document.querySelectorAll(".card");
const dots = document.querySelectorAll(".dot");
const memberName = document.querySelector(".member-name");
const memberRole = document.querySelector(".member-role");
const memberSocial = document.querySelector('.member-social');
const leftArrow = document.querySelector(".nav-arrow.left");
const rightArrow = document.querySelector(".nav-arrow.right");
let currentIndex = 0;
let isAnimating = false;

function updateCarousel(newIndex) {
    if (isAnimating) return;
    isAnimating = true;

    currentIndex = (newIndex + cards.length) % cards.length;

    cards.forEach((card, i) => {
        const offset = (i - currentIndex + cards.length) % cards.length;

        card.classList.remove(
            "center",
            "left-1",
            "left-2",
            "right-1",
            "right-2",
            "hidden"
        );

        if (offset === 0) {
            card.classList.add("center");
        } else if (offset === 1) {
            card.classList.add("right-1");
        } else if (offset === 2) {
            card.classList.add("right-2");
        } else if (offset === cards.length - 1) {
            card.classList.add("left-1");
        } else if (offset === cards.length - 2) {
            card.classList.add("left-2");
        } 
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
    });

    memberName.style.opacity = "0";
    memberRole.style.opacity = "0";

    setTimeout(() => {
        memberName.textContent = teamMembers[currentIndex].name;
        memberRole.textContent = teamMembers[currentIndex].role;
        memberName.style.opacity = "1";
        memberRole.style.opacity = "1";
        if (memberSocial) {
            memberSocial.innerHTML = `
              <a href="${teamMembers[currentIndex].linkedin}" target="_blank" style="display:inline-block; margin-right:10px;">
                <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg" alt="LinkedIn" style="width:22px; height:22px; vertical-align:middle;">
              </a>
              <a href="${teamMembers[currentIndex].instagram}" target="_blank" style="display:inline-block;">
                <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" style="width:22px; height:22px; vertical-align:middle;">
              </a>
            `;
        }
    }, 300);

    setTimeout(() => {
        isAnimating = false;
    }, 800);
}

leftArrow.addEventListener("click", () => {
    updateCarousel(currentIndex - 1);
});

rightArrow.addEventListener("click", () => {
    updateCarousel(currentIndex + 1);
});

dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        updateCarousel(i);
    });
});

cards.forEach((card, i) => {
    card.addEventListener("click", () => {
        updateCarousel(i);
    });
});

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        updateCarousel(currentIndex - 1);
    } else if (e.key === "ArrowRight") {
        updateCarousel(currentIndex + 1);
    }
});

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            updateCarousel(currentIndex + 1);
        } else {
            updateCarousel(currentIndex - 1);
        }
    }
}

updateCarousel(0);
