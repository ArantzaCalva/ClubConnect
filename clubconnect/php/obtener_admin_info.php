<?php
include "conexion.php";

$sql = "SELECT * FROM admin_info ORDER BY id DESC";
$res = $conn->query($sql);
$rows = [];
while ($r = $res->fetch_assoc()) { $rows[] = $r; }
header('Content-Type: application/json');
echo json_encode($rows);
?>