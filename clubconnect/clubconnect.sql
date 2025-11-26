
-- SQL para crear la base de datos y tablas para ClubConnect
CREATE DATABASE IF NOT EXISTS clubconnect CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE clubconnect;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS actividades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT,
    fecha DATE,
    creado_por INT,
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (creado_por) REFERENCES admins(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS admin_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150),
    contenido TEXT,
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserta un admin por defecto: usa el script PHP create_admin.php para crear el hash y guardar el admin
-- INSERT INTO admins (username, password) VALUES ('admin', '<HASH_AQUI>');
