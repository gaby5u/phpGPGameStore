export const fetchGames = async () => {
  try {
    const response = await fetch("../getGames.php");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching games:", error);
  }
  throw error;
};
