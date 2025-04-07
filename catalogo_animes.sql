-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-04-2025 a las 19:03:17
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `catalogo_animes`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `animes`
--

CREATE TABLE `animes` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `sinopsis` text NOT NULL,
  `ano_lanzamiento` year(4) NOT NULL,
  `estudio` varchar(100) DEFAULT NULL,
  `calificacion` float DEFAULT 0,
  `url_imagen` varchar(255) DEFAULT NULL,
  `tiene_manga` tinyint(1) DEFAULT 0,
  `fecha_creacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `animes`
--

INSERT INTO `animes` (`id`, `titulo`, `sinopsis`, `ano_lanzamiento`, `estudio`, `calificacion`, `url_imagen`, `tiene_manga`, `fecha_creacion`) VALUES
(1, 'Naruto', 'Nueva sinopsis del anime', '2023', 'Toei Animation', 8.5, 'https://e00-marca.uecdn.es/assets/multimedia/imagenes/2024/01/02/17041981774706.jpg', 0, '2025-01-02 11:50:11'),
(2, 'One Piece', 'La historia de Monkey D. Luffy y su tripulación...', '1999', 'Toei Animation', 4.7, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYNcOqeMvClTAOCLFmK6EjmcE3RSjFFslpnQ&s', 0, '2025-01-02 11:50:11'),
(3, 'Attack on Titan', 'Los humanos luchan por sobrevivir contra gigantes devoradores...', '2013', 'Wit Studio', 4.8, 'https://static.wikia.nocookie.net/shingeki-no-kyojin/images/5/53/Primera_temporada_%28parte_1%29.png/revision/latest?cb=20181015211526&path-prefix=es', 1, '2025-01-02 11:50:11'),
(4, 'My Hero Academia', 'En un mundo donde casi todos tienen superpoderes...', '2016', 'Bones', 4.6, 'https://static.wikia.nocookie.net/bokunoheroacademia/images/6/6b/Poster_del_anime_%282_temp%29.png/revision/latest?cb=20180126225144&path-prefix=es', 1, '2025-01-02 11:50:11'),
(6, 'Akatsuki no Yona', 'Una princesa debe recuperar su reino tras un golpe de estado', '2014', 'Pierrot', 8.5, 'https://www.normaeditorial.com/upload/media/albumes/0001/07/thumb_6479_albumes_big.jpeg', 0, '2025-03-08 15:53:18'),
(7, 'la que se', 'Nueva sinopsis del anime', '2023', 'NuevoEstudio', 8.5, 'nueva_imagen.jpg', 0, '2025-03-08 16:01:31'),
(8, 'vegas altas', 'Nueva sinopsis del anime', '2023', 'NuevoEstudio', 8.5, 'nueva_imagen.jpg', 0, '2025-03-08 16:04:23'),
(10, 'dfasfasdfs', 'rwge', '0000', 'sgwgwr', 23423, '', 0, '2025-03-08 16:22:12'),
(12, 'batido de fresa', '', '0000', 'dfsfsa', 3, '', 0, '2025-03-08 16:39:49'),
(16, 'prueba de insertar/modificar version2 anime0', 'esto es vegas altas', '0000', 'vegas', 3, '', 0, '2025-03-11 15:32:11'),
(18, 'olivesnza', '', '0000', '', 32432, '', 0, '2025-03-26 20:03:12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `anime_generos`
--

CREATE TABLE `anime_generos` (
  `id_anime` int(11) NOT NULL,
  `id_genero` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `anime_generos`
--

INSERT INTO `anime_generos` (`id_anime`, `id_genero`) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 3),
(3, 1),
(3, 4),
(4, 1),
(4, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritos`
--

CREATE TABLE `favoritos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_anime` int(11) NOT NULL,
  `fecha_favorito` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `favoritos`
--

INSERT INTO `favoritos` (`id`, `id_usuario`, `id_anime`, `fecha_favorito`) VALUES
(1, 19, 3, '2025-03-02 15:27:17'),
(16, 19, 4, '2025-03-03 16:36:27'),
(17, 19, 1, '2025-03-03 16:53:04'),
(18, 19, 2, '2025-03-03 16:53:07');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `generos`
--

CREATE TABLE `generos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `generos`
--

INSERT INTO `generos` (`id`, `nombre`) VALUES
(1, 'Acción'),
(2, 'Comedia'),
(3, 'Aventura'),
(4, 'Drama'),
(5, 'Fantasía');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes`
--

CREATE TABLE `solicitudes` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `nombre_anime` varchar(255) NOT NULL,
  `fecha_solicitud` datetime DEFAULT current_timestamp(),
  `comentarios` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `solicitudes`
--

INSERT INTO `solicitudes` (`id`, `id_usuario`, `nombre_anime`, `fecha_solicitud`, `comentarios`) VALUES
(1, 1, 'Naruto', '2025-01-02 11:50:11', 'Estoy esperando que añadan más temporadas a la plataforma.'),
(2, 2, 'Attack on Titan', '2025-01-02 11:50:11', 'Excelente anime, me encanta la trama.'),
(3, 3, 'One Piece', '2025-01-02 11:50:11', 'Me gustaría que lo tradujeran en más idiomas.'),
(6, 19, 'Esto es una prueba', '2025-03-02 15:20:33', 'Efdafasdf'),
(7, 19, 'Esto esta hecho desde un usuario normal', '2025-03-11 16:07:07', 'Esto es una prueba del deia 11/03-20..2'),
(8, 19, 'tolo', '2025-03-16 12:23:00', 'hoya ha estado poniendo los amortiguadores'),
(9, 19, 'Esto es una prueba despues de hacer varios archivos', '2025-03-26 19:44:43', 'dsfasfsafasfas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `tipo` varchar(255) DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre_usuario`, `correo`, `contrasena`, `fecha_creacion`, `tipo`) VALUES
(1, 'juan123', 'juan@example.com', 'contraseñaSegura1', '2025-01-02 11:50:11', 'admin'),
(2, 'maria456', 'maria@example.com', 'contraseñaSegura2', '2025-01-02 11:50:11', 'user'),
(3, 'pedro789', 'pedro@example.com', 'contraseñaSegura3', '2025-01-02 11:50:11', 'user'),
(4, 'Carlos', 'marymanueal@gmail.com', '$2y$10$4N2BrGj/kTELFYOZL58AmetWQnbaTotVG35SQUROu3w1Gel.WwA72', '2025-01-02 12:41:25', 'user'),
(5, 'fdf', 'dsfas@gmail.com', '$2y$10$XHwX2iVH7npCszcQizAAmeLvU0iVFt.JFHVDOl6QZS9B5twbftx9e', '2025-01-02 12:53:32', 'user'),
(6, 'fdf', 'mar@goutl.com', '$2y$10$2xXGOx2.jWcCr/GH6bfMCuaYtOXmzF.JaZUZJIyEV6OoGZu2IYrXO', '2025-01-09 18:57:36', 'user'),
(7, 'Paco Mateo', 'Paquito@goutl.com', '$2y$10$mkCaCApjzmG7KR0ipZ3uIuPte4oFYKS7AWBbKiBfomHjSfz5MWi0O', '2025-01-09 18:58:35', 'user'),
(8, 'paco2', 'paco@outlook.com', '$2y$10$kTq62nrxLz0abpWznvlh3.Otl1hZsb79hlaAJBAOIo7EFnZ9jbhtO', '2025-01-09 19:01:58', 'user'),
(9, 'paco3', 'pa@fdfd.com', '$2y$10$N.EvNiE/Nx9bXc4ZvvwUHOilhFrcZPDkRlXHNXlUzdhvEKtVSAJf.', '2025-01-09 19:04:16', 'user'),
(12, 'paco3', 'mdfasf@fdfosd.com', '$2y$10$Pef1QvXw9N5ZrDmLveQaV.jOvGasQavQbSfu8tCdSi1H7TlHGatcK', '2025-01-09 19:06:01', 'user'),
(13, 'Cristo', 'Cristo@outlook.com', '$2y$10$a8gOK3XPAn13BW5Zqf2i/uqmdWDXyWofd3zVlgSzOPx4cP/jJ6wKi', '2025-01-09 19:14:58', 'user'),
(14, 'cristo', 'cristoff2@gdfgfg.com', '$2y$10$Qm8gBPbfAVPbasax20OKAOa6AcELzVnHUOj3MHS9bfdwFTPOQg5ui', '2025-01-09 19:20:04', 'user'),
(15, 'cristo3', 'fdfdf@gaasgasg', '$2y$10$dve9YBLcqk2Nn4qW8AmzmuCDYXFDqX4ZG907nysbe8TLJebZLea4S', '2025-01-09 19:23:17', 'user'),
(16, 'Coto', 'lahora@gmail.com', '$2y$10$R9vJ6k2sX85KH.m3DtEQzu4AVjzaCUgtbIWN1ZiCdTUSIIEE1sdB.', '2025-01-21 15:42:25', 'user'),
(17, 'Coto3', 'coto@gmail.com', '$2y$10$AXOelPi8h4d0fuB93JccXOFYUnN2EABFgeSuPjJsL7J6ePaCgd7Ea', '2025-01-21 16:04:47', 'user'),
(18, 'cristo', 'correo@ejemplo.com', '$2y$10$q0UznnqM3u2sVi8L/2JLL.Rv5qwgtElE44lBslwYLHwNtU0xb9Npy', '2025-01-21 16:22:57', 'user'),
(19, 'barto', 'barto@gmail.com', '$2y$10$oyk8hliwUMJake8rofu8QuYUgmHrgbgHZHSA4Uhw40hXUlGYt47LK', '2025-01-21 16:26:57', 'user'),
(20, 'admin', 'admin@admin.com', '$2y$10$0YaS25BB8KVedLVJUpoSEOeQrY6xYDCSEMSbx5tUMQ0sp7/BEKG/O', '2025-02-15 13:25:16', 'user'),
(21, 'qwert', 'qwert@qwer.com', '$2y$10$r.U66XC1VdEAeWi6KK179OdtTf4kvAICU48XuiXUhZg4uA0nkw38i', '2025-02-15 13:31:05', 'user'),
(22, 'barto', 'barto4@gmail.com', '$2y$10$.7mbhjXeiRLMiiQTAicZ8eZf1N38r3oj/GDJDCXuXNh5JO5681luC', '2025-02-15 13:57:02', 'user'),
(23, 'barto', 'barto7@gmail.com', '$2y$10$9A.fVAgLOsSM5bZ1KhlQY.0H88huuzd5Mu9HXFtzumvuGaYWTdR8i', '2025-02-15 14:00:49', 'user'),
(24, 'barto', 'barto111@gmail.com', '$2y$10$4Tvh.1/hv07mgnI28wfGSOGgdebGrfAqTR7ioxFWjzH1Xq2xPcLBS', '2025-02-15 14:01:00', 'user'),
(25, 'barto', 'barto222@gmail.com', '$2y$10$cjh.TRE4LoYLkFOXipX23uTH/EQYW6KBAk8qrBgfNZAz41vPq99S6', '2025-02-15 15:01:54', 'user'),
(26, 'Cristoffer', 'cristoffer@gmail.com', '$2y$10$idupiQjk/Q/5pSE.5VDPYuTIhh2xkuxZzs6/4WRyxhecj4gFViIEO', '2025-02-15 15:02:24', 'user'),
(27, 'cristoffer', 'cristoffe44r@gmail.com', '$2y$10$DwmXPPI79DrcI6cFaipPTeDoNklYMD3ZLF9sEqtcaUnc45qpQznXu', '2025-02-15 15:05:53', 'user'),
(28, 'barto', 'bartfo@gmail.com', '$2y$10$VEcT8RSBg0o3g2DTmJNVrOe2LCOcc0DNTym33Bac3PiCf9.gE1BqW', '2025-02-15 15:23:04', 'user'),
(29, 'admin', 'admin@gmail.com', '$2y$10$wESJQY4v3gvMUPxtSvd2WOHhLx4U3l2G3lHlGdseKBVJ.UJyx0.t6', '2025-02-23 17:25:55', 'admin'),
(30, 'admiinistradorPrubea', 'adminprueba@gmail.com', '$2y$10$Nxyv29jBaDwSnrD4f.4E8.AZd0xfsjyqXebNqSE24i4aeyZxE17Bm', '2025-03-20 16:36:54', 'admin');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `animes`
--
ALTER TABLE `animes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `anime_generos`
--
ALTER TABLE `anime_generos`
  ADD PRIMARY KEY (`id_anime`,`id_genero`),
  ADD KEY `id_genero` (`id_genero`);

--
-- Indices de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`,`id_anime`),
  ADD KEY `id_anime` (`id_anime`);

--
-- Indices de la tabla `generos`
--
ALTER TABLE `generos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `animes`
--
ALTER TABLE `animes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `generos`
--
ALTER TABLE `generos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `anime_generos`
--
ALTER TABLE `anime_generos`
  ADD CONSTRAINT `anime_generos_ibfk_1` FOREIGN KEY (`id_anime`) REFERENCES `animes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `anime_generos_ibfk_2` FOREIGN KEY (`id_genero`) REFERENCES `generos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`id_anime`) REFERENCES `animes` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD CONSTRAINT `solicitudes_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
