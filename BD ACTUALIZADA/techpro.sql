-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-02-2025 a las 01:06:16
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `techpro`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra`
--

CREATE TABLE `compra` (
  `nombrecompleto` varchar(255) NOT NULL,
  `ciudad` varchar(255) NOT NULL,
  `numerodetelefono` varchar(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `metododeenvio` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `metododepago` varchar(255) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `compra`
--

INSERT INTO `compra` (`nombrecompleto`, `ciudad`, `numerodetelefono`, `email`, `metododeenvio`, `direccion`, `metododepago`, `id`) VALUES
('Mauro Amado', 'Rosario', '09749247', 'mauroamado700@gmail.com', 'envio', 'jose enrique rodo', 'tarjeta', 78),
('pepe lopez', 'Colonia', '$09749247', 'pepelopez@gmail.com', 'local', 'null', 'tarjeta', 79),
('Damian Etcheverrigaray', 'Otra ciudad.', '$5989149305', 'damian.etcheverrigaray@gmail.com', 'envio', 'jose enrique rodo', 'efectivo', 80),
('rrrrrr', 'Colonia', '$5989149305', 'amadomauro260@gmail.com', 'envio', 'jose enrique rodo', 'efectivo', 81),
('mauro amado', 'Colonia', '59891493051', 'mauroamado22@gmail.com', 'local', 'null', 'efectivo', 82),
('mauro amado', 'Rosario', '59891493051', 'mauroamado700@gmail.com', 'local', 'null', 'efectivo', 83),
('Mauro Amado', 'Rosario', '59891493051', 'mauroamado123@gmail.com', 'local', 'null', 'efectivo', 84),
('Mauro Amado', 'Colonia', '59891493051', 'mauroamado700@gmail.com', 'local', 'null', 'tarjeta', 85),
('Mauro Amado', 'Colonia', '59891493051', 'mauroamado700@gmail.com', 'local', 'null', 'tarjeta', 86);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `age` int(11) NOT NULL,
  `position` varchar(50) NOT NULL,
  `hire_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `employees`
--

INSERT INTO `employees` (`id`, `name`, `surname`, `age`, `position`, `hire_date`) VALUES
(2, 'mauro', 'amado', 33, 'empleado', '2025-01-09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagen`
--

CREATE TABLE `imagen` (
  `id` int(11) NOT NULL,
  `extension` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `imagen`
--

INSERT INTO `imagen` (`id`, `extension`) VALUES
(1, 'png'),
(2, 'png'),
(3, 'jpg\r\n'),
(4, 'jpg\r\n'),
(5, 'jpg'),
(6, 'jpg'),
(7, 'jpg'),
(8, 'jpg'),
(9, 'jpg'),
(10, 'jpg'),
(11, 'jpg'),
(12, 'jpg'),
(13, 'jpg'),
(14, 'jpg'),
(15, 'jpg'),
(16, 'jpg'),
(17, 'jpg'),
(18, 'jpg'),
(19, 'jpg'),
(20, 'png'),
(21, 'jpg'),
(26, ''),
(27, ''),
(28, ''),
(29, ''),
(30, ''),
(31, ''),
(32, ''),
(33, ''),
(34, ''),
(35, ''),
(36, ''),
(37, ''),
(38, ''),
(39, ''),
(40, ''),
(41, ''),
(42, ''),
(43, ''),
(44, ''),
(45, ''),
(46, ''),
(47, ''),
(48, ''),
(49, ''),
(50, 'jfif'),
(51, 'jfif'),
(52, 'jfif'),
(53, 'webp'),
(54, ''),
(55, ''),
(56, ''),
(57, ''),
(58, 'jfif'),
(59, ''),
(60, ''),
(61, ''),
(62, ''),
(63, 'jpg'),
(64, 'jfif'),
(65, 'jfif'),
(66, 'jfif'),
(67, 'jfif'),
(68, 'jpg'),
(69, 'jpg'),
(70, 'jfif'),
(71, 'jpg'),
(72, 'jpg'),
(73, 'png'),
(74, 'png'),
(75, 'png'),
(76, 'png'),
(77, 'jpg'),
(78, 'jpg'),
(79, 'jpg'),
(80, 'jpg'),
(81, 'jpg'),
(82, 'jpg'),
(83, 'jpg'),
(84, 'jpg'),
(85, 'jpg'),
(86, 'jpg'),
(87, 'jpg'),
(88, 'jpg'),
(89, 'jpg'),
(90, 'jpg'),
(91, 'jpg'),
(92, 'jpg'),
(93, 'jpg'),
(94, 'jpg'),
(95, 'jpg'),
(96, 'jpg'),
(97, 'jpg'),
(98, 'jpg'),
(99, 'jpg'),
(100, 'jpg'),
(101, 'jpg'),
(102, 'jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `mensaje` text NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mensajes`
--

INSERT INTO `mensajes` (`id`, `nombre`, `correo`, `mensaje`, `fecha`) VALUES
(5, 'mauro amado', 'mauroamado700@gmail.com', 'jijiijoij', '2025-01-29 18:46:02'),
(6, 'mauro amado', 'mauroamado700@gmail.com', 'iijojijiji', '2025-01-29 18:46:10'),
(9, 'mauro amado', 'mauroamado700@gmail.com', 'kkikikiok', '2025-01-29 18:51:18'),
(10, 'mauro amado', 'pepito@gmail.com', 'hola, que tal', '2025-02-06 00:02:42');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oferta`
--

CREATE TABLE `oferta` (
  `id` int(11) NOT NULL,
  `oferta` int(11) NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFin` date NOT NULL,
  `idProducto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `oferta`
--

INSERT INTO `oferta` (`id`, `oferta`, `fechaInicio`, `fechaFin`, `idProducto`) VALUES
(16, 1, '2024-11-13', '2024-11-14', 3),
(35, 20, '2025-01-14', '2025-01-15', 9),
(36, 22, '2025-01-14', '2025-01-31', 3),
(37, 20, '2025-01-14', '2025-01-15', 10),
(38, 60, '2025-01-17', '2025-01-18', 6),
(39, 30, '2025-01-17', '2025-01-25', 5),
(40, 40, '2025-01-25', '2025-01-26', 1),
(41, 50, '2025-02-03', '2025-02-03', 1),
(42, 90, '2025-02-03', '2025-02-03', 2),
(43, 80, '2025-02-03', '2025-02-03', 2),
(44, 79, '2025-02-03', '2025-02-05', 3),
(45, 90, '2025-02-03', '2025-02-04', 1),
(46, 50, '2025-02-03', '2025-02-03', 2),
(47, 90, '2025-02-03', '2025-02-05', 3),
(48, 70, '2025-02-03', '2025-02-12', 3),
(49, 90, '2025-02-03', '2025-02-04', 1),
(50, 90, '2025-02-03', '2025-02-06', 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `precio` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `idImagen` int(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `stock`, `precio`, `nombre`, `idImagen`) VALUES
(1, 499, 77, 'iPhone 16 Pro Max', 89),
(2, 9, 100, 'Apple MacBook Air 13.3\" Core i7 / 8GB / 128G', 86),
(3, 0, 200, 'Xiaomi Huawei Apple Pro Auricular Bluetooth True Wireless', 58),
(4, 0, 250, 'Apple Watch SE ', 4),
(6, 149, 90, 'Teclado inalámbrico M87 Bluetooth de modo dual con sensación mecánica para juegos, juegos, oficina, teclado silencioso', 6),
(7, 70, 90, 'Teclado Mecánico Logitech G413', 7),
(8, 59, 200, 'Auriculares Gamer HyperX Cloud II', 8),
(9, 14, 500, 'Monitor 24\" Full HD Dell', 9),
(64, 99, 10, 'termo', 91),
(65, 99, 8, 'iPhone 16 Pro Max', 92),
(66, 9, 99, 'Xiaomi Huawei Apple Pro Auricular Bluetooth True Wireless', 93),
(67, 99, 8, 'a', 94),
(68, 888, 9, 'iPhone 16 Pro Max', 95),
(69, 9, 88, 'Apple MacBook Air 13.3\" Core i7 / 8GB / 128GB', 96),
(70, 888, 9, 'iiiiiiiiiiiii', 97),
(71, 888, 10, 'llllllllllllppppppppppppppp', 98),
(72, 999, 8, 'uhhuhhu', 99),
(73, 9876, 99, 'lll', 100),
(74, 88765, 99, 'lll', 101),
(75, 777, 88, 'Apple MacBook Air 13.3\" Core i7 / 8GB / 128GB', 102),
(76, 94, 100, 'Producto B', NULL),
(77, 74, 0, 'Producto B', NULL),
(78, 359, 77, 'Producto B', NULL),
(79, 191, 39, 'Producto D', NULL),
(80, 375, 34, 'Producto A', NULL),
(81, 266, 1, 'Producto A', NULL),
(82, 455, 62, 'Producto B', NULL),
(83, 247, 47, 'Producto D', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productocompra`
--

CREATE TABLE `productocompra` (
  `idProducto` int(11) NOT NULL,
  `idCompra` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productocompra`
--

INSERT INTO `productocompra` (`idProducto`, `idCompra`, `cantidad`) VALUES
(1, 81, 2),
(1, 83, 1),
(1, 84, 1),
(1, 85, 1),
(1, 86, 29),
(2, 78, 3),
(2, 79, 1),
(3, 80, 1),
(3, 83, 2),
(4, 83, 7),
(8, 82, 1),
(9, 82, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `isAdmin` tinyint(1) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`isAdmin`, `password`, `nombre`, `email`, `apellido`) VALUES
(0, '$2y$10$vyy7zaj4BPjwCtx3cRmph.7K7.iZkOLu8R10gN8efBnO8azP6HvVy', '', '', ''),
(1, '55719638l', 'admin', 'mauroamado123@gmail.com', '1'),
(0, '$2y$10$yR2nWEZJ2SBFOHmkkIYKke5nAJhpd90z240lStxeMZpxH03N3CzBS', 'mauro', 'mauroamado22@gmail.com', 'amado'),
(0, '122345', 'mauro', 'mauroamado444@gmail.com', 'amado'),
(0, '122345', 'mauro', 'mauroamado44@gmail.com', 'amado'),
(0, '$2y$10$TyvKOjOmc9BZlvEtyB6/ce1bUhkROP.9Kpzw8RC2KgJYWHhgzRzuG', 'rodrigo', 'rodrigoperez@gmail.com', 'perez'),
(0, '$2y$10$uLATCKn9WTZ.Z9T1NqT8.u4m4/pN0unVJqd5c4hoG/qkSGiSfT1Cu', 'mauro', 'tyntec4@gmail.com', 'amado');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `compra`
--
ALTER TABLE `compra`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `imagen`
--
ALTER TABLE `imagen`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `oferta`
--
ALTER TABLE `oferta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idProducto` (`idProducto`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idImagen` (`idImagen`);

--
-- Indices de la tabla `productocompra`
--
ALTER TABLE `productocompra`
  ADD PRIMARY KEY (`idProducto`,`idCompra`),
  ADD KEY `idCompra` (`idCompra`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `compra`
--
ALTER TABLE `compra`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT de la tabla `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `imagen`
--
ALTER TABLE `imagen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `oferta`
--
ALTER TABLE `oferta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`idImagen`) REFERENCES `imagen` (`id`);

--
-- Filtros para la tabla `productocompra`
--
ALTER TABLE `productocompra`
  ADD CONSTRAINT `productocompra_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`id`),
  ADD CONSTRAINT `productocompra_ibfk_3` FOREIGN KEY (`idCompra`) REFERENCES `compra` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
