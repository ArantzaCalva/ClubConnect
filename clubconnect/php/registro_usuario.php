<?php
include "conexion.php";

$username = $_POST['username'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (!$username || !$email || !$password) {
    echo "error: faltan datos";
    exit;
}

$hash = password_hash($password, PASSWORD_DEFAULT);

$sql = $conn->prepare("INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)");
$sql->bind_param('sss', $username, $email, $hash);

echo $sql->execute() ? "success" : "error: " . $conn->error;
?>