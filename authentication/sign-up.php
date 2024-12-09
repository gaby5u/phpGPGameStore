<?php

include('../db-connect.php');

$name = trim($_POST['name']);
$username = trim($_POST['username']);
$phone = trim($_POST['phone']);
$email = trim($_POST['email']);
$password = trim($_POST['password']);

$errors = [];

if (empty($name)) {
  $errors[] = "Name is required.";
}
if (empty($username)) {
  $errors[] = "Username is required.";
}
if (empty($phone)) {
  $errors[] = "Phone is required.";
} elseif (!preg_match('/^\d+$/', $phone)) {
  $errors[] = "Phone must contain only digits.";
}
if (empty($email)) {
  $errors[] = "Email is required.";
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  $errors[] = "Invalid email format.";
}
if (empty($password)) {
  $errors[] = "Password is required.";
} elseif (strlen($password) < 6) {
  $errors[] = "Password must be at least 6 characters long.";
}

if (!empty($errors)) {
  foreach ($errors as $error) {
      echo "<p>$error</p>";
  }
  exit;
}

// echo $_POST['name'];
// echo $_POST['username'];
// echo $_POST['phone'];
// echo $_POST['email'];
// echo $_POST['password'];

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
$sql = "INSERT INTO users (name, username, phone, email, password) VALUES ('$name', '$username', '$phone', '$email', '$hashedPassword')";

$stmt = $connection->prepare($sql);

if ($connection->query($sql) === TRUE) {
  echo "User registered successfully!";
} else {
  echo "Error: " . $sql . "<br>" . $connection->error;
}

$connection->close();

?>