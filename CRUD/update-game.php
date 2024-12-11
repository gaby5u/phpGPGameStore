<?php
include('../db-connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $gameId = $_GET['game_id'];

    $fetchQuery = "SELECT * FROM games WHERE id = ?";
    $stmt = $connection->prepare($fetchQuery);
    $stmt->bind_param("i", $gameId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $game = $result->fetch_assoc();
        echo "<form method='post' action='save-updated-game.php'>
                <input type='hidden' name='game_id' value='" . $game['id'] . "' />
                Name: <input type='text' name='name' value='" . $game['name'] . "' /><br>
                Initial Price: <input type='text' name='initialPrice' value='" . $game['initialPrice'] . "' /><br>
                Final Price: <input type='text' name='finalPrice' value='" . $game['finalPrice'] . "' /><br>
                Rating: <input type='text' name='rating' value='" . $game['finalPrice'] . "' /><br>
                Reviews: <input type='text' name='reviews' value='" . $game['reviews'] . "' /><br>
                Description 1: <input type='text' name='description1' value='" . htmlspecialchars($game['description1']) . "' </textarea><br>
                Description 2: <input type='text' name='description2' value='" . htmlspecialchars($game['description2']) . "' </textarea><br>
                Genre: <input type='text' name='genre' value='" . $game['genre'] . "' /><br>
                Tags: <input type='text' name='tags' value='" . $game['tags'] . "' /><br>
                Release Date: <input type='text' name='releaseDate' value='" . $game['releaseDate'] . "' /><br>
                Developer: <input type='text' name='developer' value='" . $game['developer'] . "' /><br>
                <button type='submit'>Save Changes</button>
              </form>";
    } else {
        echo "Game not found!";
    }

    $stmt->close();
    $connection->close();
}
?>
