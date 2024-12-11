<?php
include('../db-connect.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $initialPrice = $_POST['initialPrice'];
    $finalPrice = $_POST['finalPrice'];
    $rating = $_POST['rating'];
    $reviews = $_POST['reviews'];
    $description1 = $_POST['description1'];
    $description2 = $_POST['description2'];
    $genre = $_POST['genre'];
    $tags = $_POST['tags'];
    $releaseDate = $_POST['releaseDate'];
    $developer = $_POST['developer'];

    $insertQuery = "INSERT INTO games (name, initialPrice, finalPrice, rating, reviews, description1, description2, genre, tags, releaseDate, developer) 
                    VALUES ('$name', '$initialPrice', '$finalPrice', '$rating', '$reviews', '$description1', '$description2', '$genre', '$tags', '$releaseDate', '$developer')";

    if ($connection->query($insertQuery) === TRUE) {
        echo "<script>
            alert('Game added successfully!');
            window.location.href = 'CRUD.php';
        </script>";
        echo "<br><a href='CRUD.php'>Go back to games list</a>";
    } else {
        echo "Error: " . $insertQuery . "<br>" . $connection->error;
    }
    $connection->close();
} else {
?>
<form method="post" action="insert-game.php">
    <label for="name">Name:</label><input type="text" name="name" required><br>
    <label for="initialPrice">Initial Price:</label><input type="text" name="initialPrice" required><br>
    <label for="finalPrice">Final Price:</label><input type="text" name="finalPrice" required><br>
    <label for="rating">Rating:</label><input type="text" name="rating" required><br>
    <label for="reviews">Reviews:</label><input type="text" name="reviews" required><br>
    <label for="description1">Description 1:</label><input type="text" name="description1" required><br>
    <label for="description2">Description 2:</label><input type="text" name="description2" required><br>
    <label for="genre">Genre:</label><input type="text" name="genre" required><br>
    <label for="tags">Tags:</label><input type="text" name="tags" required><br>
    <label for="releaseDate">Release Date:</label><input type="date" name="releaseDate" required><br>
    <label for="developer">Developer:</label><input type="text" name="developer" required><br>
    <button type="submit">Add Game</button>
    </form>
<?php
}
?>