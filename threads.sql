-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Värd: 127.0.0.1
-- Tid vid skapande: 23 maj 2024 kl 22:22
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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `threads`
--

INSERT INTO `threads` (`id`, `title`, `username`, `created_at`) VALUES
(1, 'hej', 'hej', '2024-05-23 11:07:00'),
(2, 'mjau', 'hej', '2024-05-23 11:09:17'),
(3, 'hejsan', 'hej', '2024-05-23 11:10:06'),
(4, 'hello', 'asjsa', '2024-05-23 11:20:01'),
(5, 'hejhej', 'meowy', '2024-05-23 11:35:44'),
(6, 'hejjoajdosaj', 'meowy', '2024-05-23 11:38:50'),
(7, 'hejasdjsa', 'testo', '2024-05-23 11:47:12'),
(8, 'hej', 'testo', '2024-05-23 12:53:48'),
(9, 'testar', 'testo', '2024-05-23 13:05:38'),
(10, 'hejsannn', 'testo', '2024-05-23 14:27:57'),
(11, 'hejt', 'testo', '2024-05-23 14:40:33'),
(12, 'hej', 'testo', '2024-05-23 15:07:21'),
(13, 'jahhh', 'mjau2', '2024-05-23 19:27:02'),
(16, 'lärarummet!', 'martin loman', '2024-05-23 19:58:58');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
