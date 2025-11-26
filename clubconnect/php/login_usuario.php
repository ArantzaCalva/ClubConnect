<?php
session_start();
include "conexion.php";

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (!$email || !$password) {
    echo "notfound";
    exit;
}

$stmt = $conn->prepare("SELECT id, username, password FROM usuarios WHERE email = ? LIMIT 1");
$stmt->bind_param('s', $email);
$stmt->execute();
$res = $stmt->get_result();

if ($res && $res->num_rows === 1) {
    $user = $res->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        $_SESSION['usuario_id'] = $user['id'];
        $_SESSION['usuario_username'] = $user['username'];
        echo "success";
    } else {
        echo "invalid";
    }
} else {
    echo "notfound";
}
?>