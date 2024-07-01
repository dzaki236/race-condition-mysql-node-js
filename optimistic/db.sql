
  SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
  START TRANSACTION;
  SET time_zone = "+00:00";

  --
  -- Database: `db_article_online`
  --
  DROP DATABASE IF EXISTS `db_article_online`;
  CREATE DATABASE IF NOT EXISTS `db_article_online`;
  --
  -- Dumping Database `db_article_online`
  --

  -- --------------------------------------------------------

  --
  -- Table structure for table `article`
  --
  USE `db_article_online`;
  CREATE TABLE `article` (
    `id` int UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `judul` varchar(255) DEFAULT NULL,
    `deskripsi` longtext  DEFAULT NULL,
    `versi` int UNSIGNED NOT NULL
  );

  show TABLES;
  --
  -- Dumping data for table `article`
  --

  INSERT INTO `article` (`id`, `judul`, `versi`) VALUES
  (1, 'Judul-Artikel-1', 0);
  COMMIT;