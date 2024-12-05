//----------------------------header-on-slide--------------------------------------

// import { filterGames } from "./searched-results/sarched-results";/

const header = document.querySelector(".navbar");
const placeholder = document.querySelector(".navbar-placeholder");

window.onscroll = () => {
  const top = window.scrollY;
  if (top >= 100) {
    header.classList.add("active-navbar");
    placeholder.style.height = header.offsetHeight + "px";
  } else {
    header.classList.remove("active-navbar");
    placeholder.style.height = 0;
  }
};

//------------------------------------toggle-menu----------------------------------

const burgerMenu = document.querySelector(".burger-menu");
const navLinks = document.querySelector(".center-nav-bar");
const closeButton = document.querySelector(".close-button-menu-toggle");

const menuToggle = () => {
  while (burgerMenu.classList.toggle("active")) {
    navLinks.classList.toggle("active");
    closeButton.classList.toggle("active");
  }
};

burgerMenu.addEventListener("click", menuToggle);
closeButton.addEventListener("click", menuToggle);

//--------------------------reference-to-searched-results--------------------------

const searchBar = document.querySelector(".input-container input");
const magnifyingGlass = document.querySelector(".input-container img");
let searchTerm = "";
const newUrl = `searched-results/searched-results.html`;

// console.log(newUrl);

searchBar.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchTerm = event.target.value.toLowerCase();
    localStorage.setItem("searchTerm", searchTerm);
    if (!window.location.href.includes(newUrl)) {
      changeReference();
    }
  }
});

magnifyingGlass.addEventListener("click", () => {
  searchTerm = searchBar.value.toLowerCase();
  localStorage.setItem("searchTerm", searchTerm);
  if (!window.location.href.includes(newUrl)) {
    changeReference();
  }
});

// const changeReference = () => {
//   window.location.href = newUrl;
//   console.log(window.location.href);
//   // filterGames(searchTerm);
//   // console.log(`URL-ul de acum: ${activeURL}`);
// };

const changeReference = () => {
  const baseUrl = window.location.href.split("/").slice(0, -1).join("/");
  console.log(baseUrl);
  window.location.href = `${baseUrl}/${newUrl}`;
};
