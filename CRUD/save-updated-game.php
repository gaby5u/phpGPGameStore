<?php
include('../db-connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $gameId = $_POST['game_id'];
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

    $updateQuery = "UPDATE games SET name = ?, initialPrice = ?, finalPrice = ?, rating = ?, reviews = ?, description1 = ?, description2 = ?, genre = ?, tags = ?, releaseDate = ?, developer =? WHERE id = ?";
    $stmt = $connection->prepare($updateQuery);
    $stmt->bind_param("sdddissssssi", $name, 
    $initialPrice, 
    $finalPrice, 
    $rating, 
    $reviews, 
    $description1, 
    $description2, 
    $genre, 
    $tags, 
    $releaseDate, 
    $developer, $gameId);

    if ($stmt->execute()) {
        echo "<script>
            alert('Game updated successfully!');
            window.location.replace('CRUD.php');
        </script>";
    } else {
        echo "<script>
            alert('Failed to update the game.');
            window.location.href = 'CRUD.php';
        </script>";
    }

    $stmt->close();
    $connection->close();
}
?>
