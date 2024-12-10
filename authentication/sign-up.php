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

$checkSql = "SELECT * FROM users WHERE email = ? OR username = ?";
$stmt = $connection->prepare($checkSql);
$stmt->bind_param("ss", $email, $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
  echo "<script>alert('User is already signed up. Try to Log-in or Sign-up with a new account!');
  window.location.href = window.location.origin+'/GPGameStore/sign-up/sing-up.html';
  </script>";
  $stmt->close();
  $connection->close();
  exit;
}

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
$sql = "INSERT INTO users (name, username, phone, email, password) VALUES (?, ?, ?, ?, ?)";
$stmt = $connection->prepare($sql);
$stmt->bind_param("sssss", $name, $username, $phone, $email, $hashedPassword);

if ($stmt->execute()) {
  echo "<script>
alert('Sign-up successful!');
window.location.href = window.location.origin+'/GPGameStore/index.html'
</script>";
  
  echo "<script>window.location.href = window.location.origin+'/GPGameStore/index.html'</script>";
} else {
  echo "Error: " . $sql . "<br>" . $stmt->error;
}

$stmt->close();
$connection->close();

?>