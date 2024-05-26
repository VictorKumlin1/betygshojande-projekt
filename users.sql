-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Värd: 127.0.0.1
-- Tid vid skapande: 26 maj 2024 kl 17:14
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
  `userId` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `users`
--

INSERT INTO `users` (`userId`, `username`, `password`) VALUES
(1, 'asd0dfdia', '$2b$10$eSm.ztJr0WQaZgOjskLicunmb.2C3yCY1zQO91fPsT7hCSRTjfwP2'),
(2, 'victor ', '$2b$10$Yx/7hd5jgSlJf2BNZc5r0eRIhuPFy2CpEkl8qTMb/Jq0lxWjzi1Ea'),
(3, 'martin loman', '$2b$10$3HCDSWguyLi/qQvfOedh6.rQ8MNMsZrukpIE.BU8J8d96yRlz8VWS'),
(4, 'hej', '$2b$10$afKI15aMhvAUYJ7p65ktTOyhOy3pHTQF8OFo1NMXMiSTeS0pxhmR6'),
(5, 'lol', '$2b$10$YmYv2KxJFDPrhxmy6s6qb.W20DnMe.tWrAOqOIyT811vhGOuNgZt6'),
(6, 'hej§o', '$2b$10$8Rlw1X0OR2ZigNkKDV3arOzMvF0av3mpBhp0M7nAjpqHTeUm0v.PO'),
(7, 'hejsan', '$2b$10$op/oifTrJzFKoOivn/vDj.JucxR7CbCzO8AdZwQaK3q8GTeydNIE6'),
(8, 'hellloo', '$2b$10$15/Z/CZ9zuCEu81.7KPrB.ICsOcRLbsjodFBIxP3gFQBPN/Tdh4xq'),
(9, 'ny användare', '$2b$10$ENdztRGc2/YKOebQs5UbCO/p2fo36WLRd7aif3guWYlBMEaNK/D.u'),
(10, 'a', '$2b$10$80Isen1qPZzCyXYTI.YETeU8ybrdKXyVuJgd.LyXeueqY8ScPIREG'),
(11, 'ny', '$2b$10$02A9sd9JiZWsy5m9IiO2b.iTpNCpda8/SHvtSzAI2hP7JeJrdwVK2'),
(12, 'pål', '$2b$10$vQ0cyVzEbtZAsKnaCcFabet8LwjehEPgKrM27cGrOzz0r8e7Xx5aq'),
(13, 'sadsakdn', '$2b$10$99QcUqH.YuJQ3Op36P5FluA576x.2khlENzp1tltJ7bIoxtRVmw/.'),
(14, 'test', '$2b$10$7A43kmIe6EI2vWUu4MJ9HeLfIZ.pmnh4xPZXrwgTZ5Yajtt22aREa'),
(15, '123', '$2b$10$.Dlk.mWfgH.w1GhuupBpt..52km4I6H1cvYbV3WMTPKxqlBSxIHcS'),
(16, 'ulla', '$2b$10$flY3QkEyom69s9mXu9eu3eXXED6GFxo0vMevyk8Bxf3o44BRYWXbC'),

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
