<?php
// Ejecuta este script una vez desde el navegador para crear un admin con contraseña hasheada.
// Ejemplo: acceder a http://localhost/clubconnect/create_admin.php?user=admin&pass=admin123
include "php/conexion.php";
$user = $_GET['user'] ?? null;
$pass = $_GET['pass'] ?? null;
if (!$user || !$pass) { echo "Faltan parametros ?user=...&pass=..."; exit; }
$hash = password_hash($pass, PASSWORD_DEFAULT);
$stmt = $conn->prepare("INSERT INTO admins (username, password) VALUES (?, ?)");
$stmt->bind_param('ss', $user, $hash);
if ($stmt->execute()) echo "Admin creado: " . htmlspecialchars($user);
else echo "Error: " . $conn->error;
?>