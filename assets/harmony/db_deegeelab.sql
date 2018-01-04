-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 04, 2018 at 01:16 AM
-- Server version: 5.7.19
-- PHP Version: 7.0.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_deegeelab`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_leads`
--

DROP TABLE IF EXISTS `tbl_leads`;
CREATE TABLE IF NOT EXISTS `tbl_leads` (
  `id` varchar(60) NOT NULL,
  `name` varchar(300) NOT NULL,
  `email` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `phone` varchar(20) NOT NULL,
  `business_name` varchar(1000) NOT NULL,
  `booked_schedule` varchar(100) NOT NULL,
  `date` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_leads`
--

INSERT INTO `tbl_leads` (`id`, `name`, `email`, `message`, `phone`, `business_name`, `booked_schedule`, `date`) VALUES
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Rufo', 'rufo@deegeelab.com', 'Hello World', '09484993958', 'Construction', '2018-01-25', '2018-01-03 08:49:42'),
('356a192b7913b04c54574d18c28d46e6395428ab', 'Rufo', 'rufo@deegeelab.com', 'sdsdsd', '09484993958', 'fdfd', '2018-01-25', '2018-01-03 09:44:14');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
