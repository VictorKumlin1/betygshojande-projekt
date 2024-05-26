-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Värd: 127.0.0.1
-- Tid vid skapande: 26 maj 2024 kl 17:12
-- Serverversion: 10.4.32-MariaDB
-- PHP-version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `betygshöjandeprojekt`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `postId` int(11) NOT NULL,
  `comment` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `comments`
--

INSERT INTO `comments` (`id`, `username`, `postId`, `comment`, `created_at`, `userId`) VALUES
(5, '0', 6, 'meow', '2024-05-23 14:32:29', NULL),
(6, '0', 11, 'hejsan', '2024-05-23 14:50:12', NULL),
(23, NULL, 17, 'hej', '2024-05-26 10:19:34', NULL),
(24, '0', 18, 'hej', '2024-05-26 10:22:07', NULL),
(25, '0', 18, 'he', '2024-05-26 10:32:53', NULL),
(26, '0', 18, 'asdjosadj', '2024-05-26 10:35:17', NULL),
(27, '0', 19, 'hej', '2024-05-26 10:37:48', NULL),
(28, 'hejsan', 20, 'hej', '2024-05-26 10:53:04', NULL),
(29, 'hejsan', 20, 'asdi', '2024-05-26 10:53:58', NULL),
(30, 'ashdiosajdoasphf+sapjfp', 21, 'lolis', '2024-05-26 10:56:57', NULL),
(31, 'ashdiosajdoasphf+sapjfp', 19, 'sadi', '2024-05-26 10:57:03', NULL),
(32, 'ashdiosajdoasphf+sapjfp', 19, 'asdk', '2024-05-26 10:57:10', NULL),
(33, NULL, 22, 'lol', '2024-05-26 11:44:24', 0),
(34, NULL, 20, 'asdisado', '2024-05-26 11:44:55', 0),
(35, NULL, 23, 'cp', '2024-05-26 11:47:01', 0),
(36, NULL, 3, 'aisjdoa', '2024-05-26 11:54:16', 8),
(37, NULL, 26, 'asdoj', '2024-05-26 11:54:45', 8),
(38, NULL, 28, 'nice', '2024-05-26 12:27:39', 16),
(39, NULL, 28, 'negativ', '2024-05-26 14:02:34', 19),
(40, NULL, 28, 'noice', '2024-05-26 14:02:38', 19),
(41, NULL, 28, 'hej', '2024-05-26 14:07:05', 22),
(45, NULL, 0, '28', '2024-05-26 14:54:16', 41),
(46, NULL, 0, '28', '2024-05-26 14:54:18', 41);

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
