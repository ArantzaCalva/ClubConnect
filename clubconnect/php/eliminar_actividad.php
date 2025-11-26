<?php
include "conexion.php";

$id = intval($_POST['id'] ?? 0);
if (!$id) { echo "error"; exit; }

$stmt = $conn->prepare("DELETE FROM actividades WHERE id = ?");
$stmt->bind_param('i', $id);
echo $stmt->execute() ? "success" : "error: " . $conn->error;
?>