<?php
session_start();
include('../db-connect.php');

if (!isset($_SESSION['email'])) {
  echo "<script>
          alert('You need to log in to access this page.');
          window.location.href = '../login/login.php';
        </script>";
  exit;
}

$isAdmin = $_SESSION['email'] === 'admin@gmail.com';

echo "<style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f9f9f9;
            color: #333;
        }
        h1{
        text-align: center;
}
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        table th, table td {
            padding: 10px;
            text-align: left;
        }
        table th {
            background-color: #4CAF50;
            color: white;
        }
        table tr {
            background-color: #f2f2f2;
        }
        table td {
            border: 1px solid #ddd;
        }
        form {
            margin: 0;
        }
        button {
            margin-top: 12px;
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 8px 12px;
            cursor: pointer;
            border-radius: 4px;
        }
        button:last:child {
        background-color: orange;
}
        button:hover {
            background-color: #45a049;
        }
        .insert-button-container {
            display: flex;
            justify-content: end;
            margin-bottom: 20px;
        }
    </style>";

echo "<br><br> <h1>CRUD</h1>";
if ($isAdmin) {
  echo "<form method='get' action='insert-game.php' style='display:flex; justify-content: end;'>
          <button type='submit'>Insert New Game</button>
        </form>";
} else {
  echo "<p style='text-align: right; font-size: 14px; color: gray;'>* Only admin can add new games</p>";
}

$selectAllQuery = "SELECT * FROM games";

if ($result = $connection->query($selectAllQuery)) {
    if ($result->num_rows > 0) {
        echo "<table cellpadding=10 cellspacing=0 border=1>";
        echo "<tr><td>Id</td><td>Name</td><td>Initial Price</td><td>Final Price</td><td>Rating</td><td>Reviews</td><td>Description 1</td><td>Description 2</td><td>Genre</td><td>Tags</td><td>Release Date</td><td>Developer</td><td>Actions</td></tr>";
        while ($row = $result->fetch_assoc()) {
            echo "<tr>";
            echo "<td>" . htmlspecialchars($row['id']) . "</td>";
            echo "<td>" . htmlspecialchars($row['name']) . "</td>";
            echo "<td>" . htmlspecialchars($row['initialPrice']) . "</td>";
            echo "<td>" . htmlspecialchars($row['finalPrice']) . "</td>";
            echo "<td>" . htmlspecialchars($row['rating']) . "</td>";
            echo "<td>" . htmlspecialchars($row['reviews']) . "</td>";
            echo "<td>" . htmlspecialchars($row['description1']) . "</td>";
            echo "<td>" . htmlspecialchars($row['description2']) . "</td>";
            echo "<td>" . htmlspecialchars($row['genre']) . "</td>";
            echo "<td>" . htmlspecialchars($row['tags']) . "</td>";
            echo "<td>" . htmlspecialchars($row['releaseDate']) . "</td>";
            echo "<td>" . htmlspecialchars($row['developer']) . "</td>";
            if ($isAdmin) {
              echo "<td>
                        <form method='post' style='display:inline;' action='delete-game.php'>
                            <input type='hidden' name='game_id' value='" . $row['id'] . "' />
                            <button type='submit' onclick=\"return confirm('Are you sure you want to delete this game?');\">Delete</button>
                        </form>
                        <form method='get' style='display:inline;' action='update-game.php'>
                            <input type='hidden' name='game_id' value='" . $row['id'] . "' />
                            <button type='submit'>Update</button>
                        </form>
                    </td>";
            } else {
              echo "<td>
                          <button disabled>Delete</button>
                          <button disabled>Update</button>
                      </td>";
            }
            echo "</tr>";
        }
        echo "</table>";
    } else {
        echo "No rows found!";
    }
    $result->free();
} else {
    echo "SQL query error: $selectAllQuery. " . $connection->error;
}

$connection->close();
?>
