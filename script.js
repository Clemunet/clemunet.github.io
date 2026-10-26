const themeButton = document.querySelector(".theme-toggle");
const themeMeta = document.querySelector('meta[name="theme-color"]');
const videoDialog = document.querySelector(".video-dialog");
const player = videoDialog.querySelector("video");
const error = videoDialog.querySelector(".dialog-error");

function setTheme(dark) {
  document.body.classList.toggle("dark", dark);
  themeButton.setAttribute("aria-pressed", String(dark));
  themeButton.setAttribute(
    "aria-label",
    dark ? "Activer le thème clair" : "Activer le thème sombre",
  );
  themeMeta.content = dark ? "#191919" : "#ece9e2";
  try {
    localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
  } catch (_) {
    /* Storage can be disabled. */
  }
}

try {
  setTheme(localStorage.getItem("portfolio-theme") === "dark");
} catch (_) {
  setTheme(false);
}
themeButton.addEventListener("click", () =>
  setTheme(!document.body.classList.contains("dark")),
);
document.querySelector("#year").textContent = new Date().getFullYear();

const portrait = document.querySelector(".about-photo img");
const portraitFallback = document.querySelector(".portrait-fallback");
function showPortrait() {
  if (!portrait.naturalWidth) return;
  portrait.hidden = false;
  portraitFallback.hidden = true;
}
portrait.addEventListener("load", showPortrait);
if (portrait.complete) showPortrait();

document.querySelectorAll("[data-video]").forEach((button) => {
  button.addEventListener("click", () => {
    error.hidden = true;
    player.hidden = false;
    player.src = button.dataset.video;
    videoDialog.querySelector(".dialog-title").textContent =
      button.dataset.title;
    videoDialog.showModal();
    player.play().catch(() => {
      /* Browser may require a second click. */
    });
  });
});

player.addEventListener("error", () => {
  player.hidden = true;
  error.hidden = false;
});

function closeVideo() {
  player.pause();
  player.removeAttribute("src");
  player.load();
  videoDialog.close();
}

videoDialog
  .querySelector(".dialog-close")
  .addEventListener("click", closeVideo);
videoDialog.addEventListener("click", (event) => {
  if (event.target === videoDialog) closeVideo();
});
videoDialog.addEventListener("close", () => {
  player.pause();
  player.removeAttribute("src");
  player.load();
});

const projectDetails = {
  famillyhub: {
    title: "FamillyHub",
    description:
      "Une application pour organiser le quotidien d’une famille : foyers, post-it, listes de courses, inventaire et agenda. Une interface Vue communique avec une API sécurisée.",
    technologies: ["Vue 3", "TypeScript", "Java 21", "Spring Boot", "H2"],
  },
  "relic-games": {
    title: "Relic Games",
    description:
      "Une plateforme de jeux de plateau en ligne : morpion, puissance 4 et taquin. L’interface permet de se connecter, de lancer une partie et de la reprendre grâce aux API dédiées aux comptes et aux jeux.",
    technologies: ["Java 21", "Spring Boot", "Thymeleaf", "API REST", "H2"],
  },
  "java-star": {
    title: "Java Star",
    description:
      "Un jeu de tir spatial dans le navigateur, avec plusieurs niveaux, des ennemis, des bonus, de la musique et la prise en charge d’une manette.",
    technologies: ["JavaScript", "HTML5 Canvas", "CSS", "Web Audio API"],
  },
};

const detailsDialog = document.querySelector(".details-dialog");
document.querySelectorAll("[data-details]").forEach((button) => {
  button.addEventListener("click", () => {
    const details = projectDetails[button.dataset.details];
    if (!details) return;
    detailsDialog.querySelector("#details-title").textContent = details.title;
    detailsDialog.querySelector(".details-description").textContent =
      details.description;
    detailsDialog.querySelector(".details-tech").replaceChildren(
      ...details.technologies.map((name) => {
        const item = document.createElement("li");
        item.textContent = name;
        return item;
      }),
    );
    detailsDialog.showModal();
  });
});
detailsDialog
  .querySelector(".details-close")
  .addEventListener("click", () => detailsDialog.close());
detailsDialog.addEventListener("click", (event) => {
  if (event.target === detailsDialog) detailsDialog.close();
});

const cvDialog = document.querySelector(".cv-dialog");
document
  .querySelector(".cv-preview")
  .addEventListener("click", () => cvDialog.showModal());
cvDialog
  .querySelector(".cv-dialog-close")
  .addEventListener("click", () => cvDialog.close());
cvDialog.addEventListener("click", (event) => {
  if (event.target === cvDialog) cvDialog.close();
});
