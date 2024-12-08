<?php
// $servername = getenv('DB_HOST');
// $username = getenv('DB_USER');
// $password = getenv('DB_PASS');
// $dbname = getenv('DB_NAME');
$servername = "localhost";
$username = "root";
$password = "Gabi.22117*(2005)";
$dbname = "ecommerce";

$connection=mysqli_connect($servername, $username, $password, $dbname) or die ("Nu mă pot conecta la baza de date");
mysqli_select_db($connection, $dbname) or die ("Nu găsesc baza de date");

// $query = "SELECT * FROM games";
// $result = mysqli_query($connection, $query);
// echo $result;

// $mysqli = new mysqli($servername, $username, $password, $dbname);

// if ($mysqli->connect_error) {
//     die("Connection failed: " . $mysqli->connect_error);
// }

// $stmt = $mysqli->prepare("SELECT * FROM games WHERE id = ?");
// $stmt->bind_param("i", $gameId);  // "i" is for integer
// $stmt->execute();
// $result = $stmt->get_result();
// $game = $result->fetch_assoc();

// echo $game['name'];

// $stmt->close();
// $mysqli->close();

?>