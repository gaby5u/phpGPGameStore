<?php
include('../db-connect.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $gameId = $_POST['game_id'];

    $deleteQuery = "DELETE FROM games WHERE id = ?";
    $stmt = $connection->prepare($deleteQuery);
    $stmt->bind_param("i", $gameId);

    if ($stmt->execute()) {
        echo "<script>
            alert('Game deleted successfully!');
            window.location.href = 'CRUD.php';
        </script>";
    } else {
        echo "<script>
            alert('Failed to delete the game.');
            window.location.href = 'CRUD.php';
        </script>";
    }

    $stmt->close();
    $connection->close();
}
?>
