-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        10.6.5-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- investar 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `investar` /*!40100 DEFAULT CHARACTER SET utf8mb3 */;
USE `investar`;

-- 테이블 investar.users 구조 내보내기
CREATE TABLE IF NOT EXISTS `users` (
  `userEmail` varchar(100) NOT NULL,
  `userId` varchar(50) NOT NULL,
  `userPwd` varchar(500) DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `userNickName` varchar(255) DEFAULT NULL,
  `useYn` varchar(1) DEFAULT NULL,
  `delYn` varchar(1) DEFAULT NULL,
  `fstRegDt` timestamp NULL DEFAULT current_timestamp(),
  `fstRegerId` varchar(50) DEFAULT NULL,
  `fnlUpdDt` timestamp NULL DEFAULT current_timestamp(),
  `fnlUpderId` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`userEmail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- 내보낼 데이터가 선택되어 있지 않습니다.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
