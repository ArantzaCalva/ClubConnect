<?php
include "conexion.php";

$titulo = $_POST['titulo'] ?? '';
$contenido = $_POST['contenido'] ?? '';

if (!$titulo) { echo "error"; exit; }

$stmt = $conn->prepare("INSERT INTO admin_info (titulo, contenido) VALUES (?, ?)");
$stmt->bind_param('ss', $titulo, $contenido);
echo $stmt->execute() ? "success" : "error: " . $conn->error;
?>