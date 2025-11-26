<?php
include "conexion.php";

$sql = "SELECT a.*, u.username AS creador_nombre FROM actividades a LEFT JOIN admins u ON a.creado_por = u.id ORDER BY fecha DESC, a.id DESC";
$result = $conn->query($sql);

$actividades = [];
while ($row = $result->fetch_assoc()) {
    $actividades[] = $row;
}
header('Content-Type: application/json');
echo json_encode($actividades);
?>