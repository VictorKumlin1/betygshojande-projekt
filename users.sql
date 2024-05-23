-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Värd: 127.0.0.1
-- Tid vid skapande: 23 maj 2024 kl 22:20
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
-- Tabellstruktur `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'hej', '$2b$10$ySMyz0XyhbUaRe5c90LxhOGHqXLGSxojDBLHE8KSaeUQcnRdUktrK'),
(4, 'meowy', '$2b$10$CzphUdTjbKZ.AvkTIi1i9uN1J/lOq.MUq3itBtvBQQCxW/B.9oSz.'),
(5, 'asjsa', '$2b$10$h74oHb63DuU6XpF/eIdUWulnjBws8gnYQ/AZPfXrHMiY5koJE7pB2'),
(6, 'meow', '$2b$10$IGhWsvUPJU1J78zoMrSQfO7OxzRmyrmb12uilRwYna/ZPgc5sWdRC'),
(7, 'martin loman', '$2b$10$JUfPCeWvJDfaY.TzVHAitOTJCTX.Wm4fJ6BSggZ32VUhAI0zCaEsi'),
(8, 'mjau', '$2b$10$0IOiDytkUUOfKLiEm.ofDuD98l0Nx5oKd/bF5rNHOhASzFbZalmNK'),
(11, 'isak helsingfors', '$2b$10$vT967NNyAJvCICSOw6HqiOXxYifVsEGfbtEIWuVsX77gzM3MmuLuW'),
(13, 'sadsaodj', '$2b$10$unUJl/tSwyV0J6WDVY5IGulU6jPRkJDqn3jQabKu.QY6ZDH/ecDkS'),
(14, 'mjau3', '$2b$10$cyn9rYAkB3STHYXRRN9DReiDyk6N9OvsZAeeH08X42lCm7PMrehnW'),
(15, 'holros', '$2b$10$b0vpWe7UXnPFKEWacrfDROP88NVN0Nmk5RPzVQ9HD232JjxlLG/Gq');

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `unique_username` (`username`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
