-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-11-2024 a las 03:26:03
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
  `numerodetelefono` varchar(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `metododeenvio` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `metododepago` varchar(255) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(21, 'jpg');

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
(16, 1, '2024-11-13', '2024-11-14', 3);

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
(1, 50, 1700, 'iPhone 16 Pro Max', 1),
(2, 30, 1000, 'Apple MacBook Air 13.3\" Core i7 / 8GB / 128GB', 2),
(3, 40, 200, 'Xiaomi Huawei Apple Pro Auricular Bluetooth True Wireless', 3),
(4, 75, 250, 'Apple Watch SE ', 4),
(5, 40, 500, 'iPad 9.7 32GB - Silver ', 5),
(6, 150, 90, 'Teclado inalámbrico M87 Bluetooth de modo dual con sensación mecánica para juegos, juegos, oficina, teclado silencioso', 6),
(7, 80, 90, 'Teclado Mecánico Logitech G413', 7),
(8, 60, 200, 'Auriculares Gamer HyperX Cloud II', 8),
(9, 70, 350, 'Monitor 24\" Full HD Dell', 9),
(10, 35, 150, 'SSD Kingston NV2 1TB', 10),
(11, 40, 77, 'Apple - iPhone 15 Silicone Case', 11),
(12, 40, 200, 'Lenovo Tablet 8GB RAM +128GB', 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productocompra`
--

CREATE TABLE `productocompra` (
  `idProducto` int(11) NOT NULL,
  `idCompra` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, '55719638l', 'admin', 'mauroamado123@gmail.com', '1');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de la tabla `imagen`
--
ALTER TABLE `imagen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `oferta`
--
ALTER TABLE `oferta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

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
