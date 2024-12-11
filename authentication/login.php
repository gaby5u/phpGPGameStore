<?php

include('../db-connect.php');

$email = trim($_POST['email']);
$password = trim($_POST['password']);

$errors = [];

if (empty($email)) {
  $errors[] = "Email is required.";
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  $errors[] = "Invalid email format.";
}
if (empty($password)) {
  $errors[] = "Password is required.";
} elseif (strlen($password) < 8) {
  $errors[] = "Password must be at least 8 characters long.";
}

if (!empty($errors)) {
  foreach ($errors as $error) {
      echo "<p>$error</p>";
  }
  exit;
}

if ($email === "admin@gmail.com" && $password === "gaby-Admin123") {
  session_start();
  $_SESSION['user_role'] = 'admin';
  $_SESSION['email'] = $email;

  echo "<script>
      alert('Welcome Gaby Admin!');
      window.location.href = window.location.origin + '/GPGameStore/CRUD/CRUD.php';
  </script>";
  exit;
}

$sql = "SELECT id, password FROM users WHERE email = ?";
$stmt = $connection->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo "<script>
    alert(Email or password is incorrect.)</script>";
    exit;
}

$user = $result->fetch_assoc();

if (!password_verify($password, $user['password'])) {
    echo "<script>alert('Email or password is incorrect.')</script>";
    exit;
}

session_start();
$_SESSION['user_id'] = $user['id'];
$_SESSION['email'] = $email;

echo "<script>
alert('Login successful!');
window.location.href = window.location.origin+'/GPGameStore/index.html'
</script>";

$stmt->close();
$connection->close();

?>