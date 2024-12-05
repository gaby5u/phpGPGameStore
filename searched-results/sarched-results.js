import { games } from "../object.js";

let gamesContainer = document.querySelector(".games-container");
const searchBar = document.querySelector(".input-container input");
const magnifyingGlass = document.querySelector(".input-container img");
const errorMessage = document.querySelector(".error-message");
let searchTerm = "";

document.addEventListener("DOMContentLoaded", () => {
  const searchTerm = localStorage.getItem("searchTerm");
  if (searchTerm) {
    if (searchTerm.trim().length > 0) {
      filterGames(searchTerm);
    }
  } else displayError();
});

const displayError = () => {
  gamesContainer.innerHTML = "";
  errorMessage.innerHTML = `<br> <br> Nothing found :( `;
};

searchBar.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.documentElement.scrollTop = 0;
    searchTerm = event.target.value.toLowerCase().trim();
    if (searchTerm.length > 0) {
      localStorage.setItem("searchTerm", searchTerm);
      filterGames(searchTerm);
    } else displayError();
  }
});

magnifyingGlass.addEventListener("click", () => {
  document.documentElement.scrollTop = 0;
  searchTerm = searchBar.value.toLowerCase().trim();
  if (searchTerm.length > 0) {
    localStorage.setItem("searchTerm", searchTerm);
    filterGames(searchTerm);
  } else displayError();
});

export const filterGames = (searchTerm) => {
  gamesContainer.innerHTML = "";
  let filteredGames = games.filter((game) => {
    return (
      game.tags.some((tag) => tag.toLowerCase().includes(searchTerm.trim())) ||
      game.genre.some((genre) =>
        genre.toLowerCase().includes(searchTerm.trim())
      ) ||
      game.name.toLowerCase().includes(searchTerm.trim())
    );
  });
  displayFilteredGames(filteredGames);
};

const displayFilteredGames = (filteredGames) => {
  errorMessage.innerHTML = "";
  if (filteredGames.length > 0) {
    filteredGames.forEach((game) => {
      const gameContainer = document.createElement("div");
      gameContainer.className = "game-container";
      gameContainer.setAttribute("data-id", game.id);

      const whiteCircle = document.createElement("div");
      whiteCircle.className = "white-circle";

      const div = document.createElement("div");

      const anchor = document.createElement("a");
      anchor.setAttribute("href", "../individual-game/individual-game.html");

      const gameImage = document.createElement("img");
      gameImage.className = "game-image";
      gameImage.setAttribute("src", `../categories/${game.image1}`);

      const textDescription = document.createElement("div");
      textDescription.className = "text-description";

      const gameName = document.createElement("h1");
      gameName.textContent = game.name;

      const gameDescription = document.createElement("p");
      gameDescription.className = "game-description";
      gameDescription.textContent = game.description1;

      const priceWrapper = document.createElement("div");
      priceWrapper.className = "price-wrapper";
      const price = document.createElement("div");
      price.className = "price";
      const initialPrice = document.createElement("p");
      initialPrice.innerHTML = `&dollar; ${game.initialPrice}`;
      const finalPrice = document.createElement("p");
      finalPrice.innerHTML = `&dollar; ${game.finalPrice}`;

      whiteCircle.appendChild(div);

      anchor.appendChild(gameImage);

      price.appendChild(initialPrice);
      price.appendChild(finalPrice);
      priceWrapper.appendChild(price);

      textDescription.appendChild(gameName);
      textDescription.appendChild(gameDescription);
      textDescription.appendChild(priceWrapper);

      gameContainer.appendChild(whiteCircle);
      gameContainer.appendChild(anchor);
      gameContainer.appendChild(textDescription);

      gamesContainer.appendChild(gameContainer);
    });

    updateFavoriteIcons();
  } else {
    displayError();
  }
};

const getFavorites = () => {
  const favorites = localStorage.getItem("favourite-games");
  return favorites ? JSON.parse(favorites) : [];
};

const saveFavorites = (favorites) => {
  localStorage.setItem("favourite-games", JSON.stringify(favorites));
};

const updateFavoriteIcons = () => {
  const favorites = getFavorites();
  document.querySelectorAll(".game-container").forEach((gameContainer) => {
    const gameId = gameContainer.dataset.id;
    const heartIcon = gameContainer.querySelector(".white-circle div");

    if (favorites.some((game) => game.id == gameId)) {
      heartIcon.classList.add("toggled");
    } else {
      heartIcon.classList.remove("toggled");
    }
  });
};

gamesContainer.addEventListener("click", (event) => {
  if (event.target.closest(".game-container")) {
    const gameItem = event.target.closest(".game-container");
    const gameId = gameItem.dataset.id;
    localStorage.setItem("selectedGameId", gameId);
  }

  if (event.target.closest(".white-circle div")) {
    const heartIcon = event.target.closest(".white-circle div");
    heartIcon.classList.toggle("toggled");
    const gameItem = heartIcon.closest(".game-container");
    const gameId = parseInt(gameItem.getAttribute("data-id"), 10);
    const favorites = getFavorites();

    if (heartIcon.classList.contains("toggled")) {
      favorites.push(games[gameId - 1]);
      saveFavorites(favorites);
    } else {
      const updatedFavorites = favorites.filter(
        (game) => game.id !== games[gameId - 1].id
      );
      saveFavorites(updatedFavorites);
    }
  }
});
