-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Värd: 127.0.0.1
-- Tid vid skapande: 23 maj 2024 kl 22:23
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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `comments`
--

INSERT INTO `comments` (`id`, `username`, `postId`, `comment`, `created_at`) VALUES
(4, 'testo', 10, 'hej', '2024-05-23 14:32:19'),
(5, 'testo', 6, 'meow', '2024-05-23 14:32:29'),
(6, 'testo', 11, 'hejsan', '2024-05-23 14:50:12'),
(7, 'testo', 11, 'sadlsa', '2024-05-23 14:50:15'),
(9, 'testo', 10, 'hej', '2024-05-23 14:59:27'),
(10, 'testo', 12, 'hej här är en kommentar i thread 12', '2024-05-23 15:11:09'),
(11, 'testo', 12, 'en till', '2024-05-23 15:11:12'),
(12, 'nyttig man', 3, 'hej', '2024-05-23 15:14:06'),
(13, 'meow', 12, 'meow', '2024-05-23 15:14:33'),
(14, 'mjau2', 13, 'örskis', '2024-05-23 19:27:10'),
(22, 'martin loman', 16, 'Victor förtjänar ett A, punkt slut', '2024-05-23 19:59:14');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
