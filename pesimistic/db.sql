
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `db_donasi_online`
--
DROP DATABASE IF EXISTS `db_donasi_online`;
CREATE DATABASE IF NOT EXISTS `db_donasi_online`;
--
-- Dumping Database `db_donasi_online`
--

-- --------------------------------------------------------

--
-- Table structure for table `donasi`
--
USE `db_donasi_online`;
CREATE TABLE `donasi` (
  `id` int UNSIGNED NOT NULL,
  `total_terkumpul` int NOT NULL,
  `judul` varchar(255) DEFAULT NULL,
  `deskripsi` longtext
);

show TABLES;
--
-- Dumping data for table `donasi`
--

INSERT INTO `donasi` (`id`, `total_terkumpul`, `judul`, `deskripsi`) VALUES
(1, 1000000, 'Donasi Untuk Rumah Yatim Piatu Dan Duafa', NULL),
(2, 1000000, 'Donasi untuk palestina', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `penarikan_donasi`
--

CREATE TABLE `penarikan_donasi` (
  `id` int UNSIGNED NOT NULL,
  `id_donasi` int UNSIGNED NOT NULL,
  `total_donasi_ditarik` int NOT NULL,
  `ditarik_oleh` varchar(255) DEFAULT NULL
);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `donasi`
--
ALTER TABLE `donasi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `penarikan_donasi`
--
ALTER TABLE `penarikan_donasi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_donasi` (`id_donasi`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `donasi`
--
ALTER TABLE `donasi`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `penarikan_donasi`
--
ALTER TABLE `penarikan_donasi`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `penarikan_donasi`
--
ALTER TABLE `penarikan_donasi`
  ADD CONSTRAINT `penarikan_donasi_ibfk_1` FOREIGN KEY (`id_donasi`) REFERENCES `donasi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;