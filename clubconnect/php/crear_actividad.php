<?php
include "conexion.php";

$titulo = $_POST['titulo'] ?? '';
$descripcion = $_POST['descripcion'] ?? '';
$fecha = $_POST['fecha'] ?? null;
$creado_por = $_POST['admin_id'] ?? null;

if (!$titulo) {
    echo "error: faltan datos";
    exit;
}

$stmt = $conn->prepare("INSERT INTO actividades (titulo, descripcion, fecha, creado_por) VALUES (?, ?, ?, ?)");
$stmt->bind_param('sssi', $titulo, $descripcion, $fecha, $creado_por);
echo $stmt->execute() ? "success" : "error: " . $conn->error;
?>