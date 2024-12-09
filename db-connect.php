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

?>