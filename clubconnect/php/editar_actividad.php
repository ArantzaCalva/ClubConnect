<?php
include "conexion.php";

$id = intval($_POST['id'] ?? 0);
$titulo = $_POST['titulo'] ?? '';
$descripcion = $_POST['descripcion'] ?? '';
$fecha = $_POST['fecha'] ?? null;

if (!$id || !$titulo) { echo "error"; exit; }

$stmt = $conn->prepare("UPDATE actividades SET titulo = ?, descripcion = ?, fecha = ? WHERE id = ?");
$stmt->bind_param('sssi', $titulo, $descripcion, $fecha, $id);
echo $stmt->execute() ? "success" : "error: " . $conn->error;
?>