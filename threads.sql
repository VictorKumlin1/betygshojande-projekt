-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Värd: 127.0.0.1
-- Tid vid skapande: 26 maj 2024 kl 17:13
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
-- Tabellstruktur `threads`
--

CREATE TABLE `threads` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `threads`
--

INSERT INTO `threads` (`id`, `title`, `username`, `created_at`, `userId`) VALUES
(22, 'hej', '', '2024-05-26 11:44:20', 0),
(23, 'hej', '', '2024-05-26 11:46:50', 0),
(24, 'nooo', '', '2024-05-26 11:47:24', 0),
(25, 'hej', '', '2024-05-26 11:54:06', 8),
(26, 'hejaasd', '', '2024-05-26 11:54:40', 8),
(27, 'msaodjsaodjosadjo', '', '2024-05-26 11:56:58', 9),
(28, 'hej', '', '2024-05-26 12:27:27', 16),
(29, 'hej', '', '2024-05-26 14:13:03', 23),
(30, 'asdjsaod', '', '2024-05-26 14:13:07', 23),
(31, 'hej', '', '2024-05-26 14:18:23', 24),
(32, 'adssajdo', '', '2024-05-26 14:18:28', 24),
(33, 'hej', '', '2024-05-26 14:19:34', 25),
(34, 'k', '', '2024-05-26 14:22:34', 26),
(35, 'hej', '', '2024-05-26 14:30:59', 28),
(36, 'hej', '', '2024-05-26 14:33:00', 28),
(37, 'lol', '', '2024-05-26 14:33:07', 28),
(38, 'hej', '', '2024-05-26 14:39:26', 28),
(39, 'lol', '', '2024-05-26 14:40:00', 28),
(40, 'mjauuuuuuuuuuuuuu', '', '2024-05-26 14:42:43', 28),
(41, 'nr 1', 'sadihsah', '2024-05-26 14:48:47', 28),
(42, 'lol', 'sadihsah', '2024-05-26 14:56:04', 28),
(43, 'mjaaaaaaaa', 'marre', '2024-05-26 15:07:12', 28);

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `threads`
--
ALTER TABLE `threads`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `threads`
--
ALTER TABLE `threads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
