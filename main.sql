-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Erstellungszeit: 01. Dez 2022 um 23:03
-- Server-Version: 10.5.12-MariaDB-0+deb11u1
-- PHP-Version: 8.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `main`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `tauf_kind`
--

CREATE TABLE `tauf_kind` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `vorname` varchar(150) NOT NULL,
  `gb_data` date NOT NULL,
  `ort` varchar(200) NOT NULL,
  `patron_date` date NOT NULL,
  `patron_descript` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `tauf_mutter`
--

CREATE TABLE `tauf_mutter` (
  `id` int(11) NOT NULL,
  `id_taufkind` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `vorname` varchar(150) NOT NULL,
  `gb_date` int(11) NOT NULL,
  `ort` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `tauf_pate`
--

CREATE TABLE `tauf_pate` (
  `id` int(11) NOT NULL,
  `id_taufkind` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `vorname` varchar(150) NOT NULL,
  `gb_date` date NOT NULL,
  `ort` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `tauf_patin`
--

CREATE TABLE `tauf_patin` (
  `id` int(11) NOT NULL,
  `id_taufkind` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `vorname` varchar(150) NOT NULL,
  `gb_date` date NOT NULL,
  `ort` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `tauf_vater`
--

CREATE TABLE `tauf_vater` (
  `id` int(11) NOT NULL,
  `id_taufkind` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `vorname` varchar(150) NOT NULL,
  `gb_date` int(11) NOT NULL,
  `ort` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `tauf_kind`
--
ALTER TABLE `tauf_kind`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indizes für die Tabelle `tauf_mutter`
--
ALTER TABLE `tauf_mutter`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_taufkind` (`id_taufkind`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indizes für die Tabelle `tauf_pate`
--
ALTER TABLE `tauf_pate`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `id_taufkind` (`id_taufkind`);

--
-- Indizes für die Tabelle `tauf_patin`
--
ALTER TABLE `tauf_patin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_taufkind` (`id_taufkind`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indizes für die Tabelle `tauf_vater`
--
ALTER TABLE `tauf_vater`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_taufkind` (`id_taufkind`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `tauf_mutter`
--
ALTER TABLE `tauf_mutter`
  ADD CONSTRAINT `tauf_mutter_ibfk_1` FOREIGN KEY (`id_taufkind`) REFERENCES `tauf_kind` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `tauf_pate`
--
ALTER TABLE `tauf_pate`
  ADD CONSTRAINT `tauf_pate_ibfk_1` FOREIGN KEY (`id_taufkind`) REFERENCES `tauf_kind` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `tauf_patin`
--
ALTER TABLE `tauf_patin`
  ADD CONSTRAINT `tauf_patin_ibfk_1` FOREIGN KEY (`id_taufkind`) REFERENCES `tauf_kind` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints der Tabelle `tauf_vater`
--
ALTER TABLE `tauf_vater`
  ADD CONSTRAINT `tauf_vater_ibfk_1` FOREIGN KEY (`id_taufkind`) REFERENCES `tauf_kind` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
