-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-11-2024 a las 19:26:47
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

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
  `numerodetelefono` int(11) NOT NULL,
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
('nombre', 'cuidad', 0, 'email', 'local', 'direccion', 'efectivo', 1),
('John Doe', 'Sample City', 0, 'johndoe@example.com', '', 'null', '', 2),
('John Doe', 'Sample City', 0, 'johndoe@example.com', 'local', 'null', 'efectivo', 3),
('John Doe', 'Sample City', 0, 'johndoe@example.com', 'local', 'null', 'efectivo', 4),
('John Doe', 'Sample City', 0, 'johndoe@example.com', 'local', 'null', 'efectivo', 5),
('John Doe', 'Sample City', 0, 'johndoe@example.com', 'local', 'null', 'efectivo', 6),
('John Doe', 'Sample City', 0, 'johndoe@example.com', 'local', 'null', 'efectivo', 7),
('John Doe', 'Sample City', 0, 'johndoe@example.com', 'local', 'null', 'efectivo', 8),
('John Doe', 'Sample City', 0, 'johndoe@example.com', 'local', 'null', 'efectivo', 9),
('John Doe', 'Sample City', 0, 'johndoe@example.com', 'local', 'null', 'efectivo', 10),
('John Doe', 'Sample City', 0, 'johndoe@example.com', 'local', 'null', 'efectivo', 11),
('John Doe', 'Sample City', 0, 'johndoe@example.com', 'local', 'null', 'efectivo', 12);

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
(1, 'jpg'),
(2, 'jpg'),
(3, 'jpg'),
(4, 'jpg');

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
(1, 50, 700, 'Smartphone', NULL),
(2, 30, 1000, 'Laptop', NULL),
(3, 100, 200, 'Auriculares', NULL),
(4, 75, 250, 'Smartwatch', NULL),
(5, 40, 500, 'Tablet', NULL),
(6, 150, 90, 'Teclado mecánico', NULL),
(7, 200, 30, 'Ratón óptico', NULL),
(8, 20, 200, 'Monitor 24\"', NULL),
(9, 60, 80, 'Cámara web', NULL),
(10, 25, 300, 'Proyector', NULL),
(15, 4, 30, 'sa', NULL),
(16, 1, 1, 'sdafsa', 1),
(17, 1, 1, 'sdafsa', 2),
(18, 67, 678, 'iuyo', 3),
(19, 5678, 5678, 'yuio', 4);

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
(1, 11, 3),
(1, 12, 3),
(2, 11, 2),
(2, 12, 2);

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
(1, '12', 'mauro', 'mauroamado12@gmail.com', 'amado'),
(0, '1', 'mauro', 'mauroamado700@gmail.com', 'amado'),
(0, '1', '1', 'mma@aa', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `compra`
--
ALTER TABLE `compra`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `imagen`
--
ALTER TABLE `imagen`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `imagen`
--
ALTER TABLE `imagen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `oferta`
--
ALTER TABLE `oferta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

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
