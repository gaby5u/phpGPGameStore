<?php
include('db-connect.php'); 

$sql = "SELECT * FROM games";
$result = mysqli_query($connection, $sql);

if (!$result) {
    echo json_encode(['error' => mysqli_error($connection)]);
    exit();
}
$games = [];

while ($row = mysqli_fetch_assoc($result)) {
    $games[] = $row;
}
echo json_encode($games);
mysqli_close($connection);
?>
