// import { games } from "../object.js";

// const listGames = document.querySelectorAll(".game-carousel"),
//   activeImage = document.querySelector(".active-img img"),
//   nameActiveImage = document.querySelector(".info-game h2"),
//   ratingActiveImage = document.querySelector(".rating-latest-games p"),
//   priceActiveImage = document.querySelector(".active-img-price");

// listGames.forEach((game) => {
//   game.addEventListener("click", (event) => {
//     const gameId = event.currentTarget.dataset.id;
//     listGames.forEach((game) => game.classList.remove("active-little-img"));
//     game.classList.add("active-little-img");

//     games.forEach((genGame) => {
//       if (gameId == genGame.id) {
//         activeImage.setAttribute(
//           "src",
//           `homepage/img/list-carousel/${genGame.alt}.png`
//         );
//         activeImage.setAttribute("alt", `${genGame.alt}`);
//         nameActiveImage.textContent = genGame.name;
//         ratingActiveImage.textContent = genGame.rating;
//         priceActiveImage.innerHTML = `&dollar;${genGame.finalPrice}`;
//       }
//     });
//   });
// });

// Function to fetch games from the PHP backend
async function fetchGames() {
  const response = await fetch("getGames.php");
  const games = await response.json();

  // Assuming you already have a way to display games in the slider
  updateSlider(games);
}

// Update the slider with fetched games
function updateSlider(games) {
  const listGames = document.querySelectorAll(".game-carousel");

  listGames.forEach((gameElement) => {
    const gameId = gameElement.dataset.id;

    const gameData = games.find((game) => game.id == gameId);

    if (gameData) {
      gameElement.addEventListener("click", (event) => {
        const activeImage = document.querySelector(".active-img img");
        const nameActiveImage = document.querySelector(".info-game h2");
        const ratingActiveImage = document.querySelector(
          ".rating-latest-games p"
        );
        const priceActiveImage = document.querySelector(".active-img-price");

        // Highlight the selected game in the carousel
        listGames.forEach((game) => game.classList.remove("active-little-img"));
        gameElement.classList.add("active-little-img");

        // Update active game details
        activeImage.setAttribute(
          "src",
          `homepage/img/list-carousel/${gameData.alt}.png`
        );
        activeImage.setAttribute("alt", `${gameData.alt}`);
        nameActiveImage.textContent = gameData.name;
        ratingActiveImage.textContent = gameData.rating;
        priceActiveImage.innerHTML = `&dollar;${gameData.finalPrice}`;
      });
    }
  });
}

// Call fetchGames to load the data when the page loads
fetchGames();
