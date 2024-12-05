const favouritesArray =
  JSON.parse(localStorage.getItem("favourite-games")) || [];
const container = document.querySelector(".favourites-cards");

const createGameCard = (game) => {
  const card = document.createElement("div");
  card.classList.add("game-container");
  card.setAttribute("data-id", game.id);

  const whiteCircle = document.createElement("div");
  whiteCircle.classList.add("white-circle");

  const heartIcon = document.createElement("div");
  heartIcon.id = "active-heart";
  whiteCircle.appendChild(heartIcon);

  const gameImage = document.createElement("img");
  gameImage.classList.add("game-image");
  gameImage.src = `../categories/${game.image1}`;
  gameImage.alt = game.alt;

  const textDescription = document.createElement("div");
  textDescription.classList.add("text-description");

  const title = document.createElement("h1");
  title.textContent = game.name;

  const priceContainer = document.createElement("div");
  priceContainer.classList.add("price");

  const initialPrice = document.createElement("p");
  initialPrice.textContent = game.initialPrice;

  const finalPrice = document.createElement("p");
  finalPrice.textContent = game.finalPrice;

  priceContainer.appendChild(initialPrice);
  priceContainer.appendChild(finalPrice);

  const description = document.createElement("p");
  description.textContent = game.description1;

  const ratingContainer = document.createElement("div");
  ratingContainer.classList.add("rating");

  const starImage = document.createElement("img");
  starImage.src = "../img-general/star.png";
  starImage.alt = "star";

  const ratingText = document.createElement("p");
  ratingText.textContent = game.rating;

  ratingContainer.appendChild(starImage);
  ratingContainer.appendChild(ratingText);

  textDescription.appendChild(title);
  textDescription.appendChild(priceContainer);
  textDescription.appendChild(description);

  card.appendChild(whiteCircle);
  card.appendChild(gameImage);
  card.appendChild(textDescription);
  card.appendChild(ratingContainer);

  return card;
};

favouritesArray.forEach((game) => {
  const card = createGameCard(game);
  container.appendChild(card);
});

document.addEventListener("DOMContentLoaded", () => {
  if (favouritesArray.length === 0) {
    const title = document.createElement("h1");
    title.classList.add("empty-favourites-title");
    title.textContent = "Favourites is empty";
    container.appendChild(title);
  }
});
