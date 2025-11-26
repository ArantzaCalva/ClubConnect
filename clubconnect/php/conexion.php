<?php
$host = "localhost";
$user = "root"; // cambia si tu XAMPP usa otro
$pass = "";
$db = "clubconnect1";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>