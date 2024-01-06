CREATE DATABASE  IF NOT EXISTS `x_phim_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `x_phim_db`;
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: x_phim_db
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actors`
--

DROP TABLE IF EXISTS `actors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `actor` varchar(72) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `actor_UNIQUE` (`actor`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actors`
--

LOCK TABLES `actors` WRITE;
/*!40000 ALTER TABLE `actors` DISABLE KEYS */;
INSERT INTO `actors` VALUES (6,'Atlanta Moreno'),(5,'Eimi Fukada'),(1,'Moe Amatsuka'),(3,'Non Suzumiya'),(7,'Rei Kamiki'),(2,'Suzu Honjo');
/*!40000 ALTER TABLE `actors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `countrys`
--

DROP TABLE IF EXISTS `countrys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `countrys` (
  `id` int NOT NULL AUTO_INCREMENT,
  `country` varchar(72) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `country_UNIQUE` (`country`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countrys`
--

LOCK TABLES `countrys` WRITE;
/*!40000 ALTER TABLE `countrys` DISABLE KEYS */;
INSERT INTO `countrys` VALUES (2,'Âu Mỹ'),(1,'Nhật Bản');
/*!40000 ALTER TABLE `countrys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `films`
--

DROP TABLE IF EXISTS `films`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `films` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(256) DEFAULT NULL,
  `slug` varchar(256) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `image` varchar(256) NOT NULL,
  `actor_id` int DEFAULT NULL,
  `country_id` int DEFAULT NULL,
  `server1` varchar(256) DEFAULT NULL,
  `server2` varchar(256) DEFAULT NULL,
  `server3` varchar(256) DEFAULT NULL,
  `likes` int DEFAULT '0',
  `un_likes` int DEFAULT '0',
  `average_likes` int DEFAULT NULL,
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `source` varchar(72) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `slug_UNIQUE` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `films`
--

LOCK TABLES `films` WRITE;
/*!40000 ALTER TABLE `films` DISABLE KEYS */;
INSERT INTO `films` VALUES (8,'Chán vợ, chồng ngoại tình với cô hàng xóm','chan-vo-chong-ngoai-tinh-voi-co-hang-xom','Kết hôn đến nay đã được 8 năm. Từ năm thứ hai, tôi vì muốn có con mà gần như ngày nào cũng làm tình với vợ. Nhưng chưa kịp có con thì tôi đã chán cơ thể của cô ấy. Đến nay cũng được vài năm rồi hai vợ chồng chưa làm tình. Một ngày nọ, Amatsuka chuyển đến sống tại căn hộ kế bên chúng tôi. Ngay từ cái nhìn đầu tiên, tôi đã bị vẻ đẹp và tính cách vui tươi của cô ấy hấp dẫn. Hôm sau, thấy Moe đang loay hoay ngoài cửa, thì ra cô ấy để quên chìa khóa trong nhà, đang chờ thợ khóa đến giúp. Vì còn phải đợi rất lâu nên tôi mời Amatsuka về nhà dùng cơm. Sau đó, vợ chồng tôi cùng Amatsuka vừa uống rượu, vừa trò chuyện. Được một lúc thì vợ tôi đi tắm, chỉ còn lại tôi và Amatsuka. Không biết có phải do say rượu không, nhưng tôi đã chạm tay Amatsuka, nhưng cô ấy không hề rụt lại. Tiện đà lấn tới, tôi định hôn Amatsuka thì vợ tôi ra ngoài, chúng tôi nhanh chóng về lại vị trí cũ. Dù chưa làm được gì, nhưng cả hai đã ngầm xác nhận tình cảm của nhau. Hôm sau, tôi được Amatsuka kéo vào trong nhà. Hai chúng tôi ôm hôn một lúc thì tôi muốn tiến xa hơn nữa. Nhưng Amatsuka lại ngăn tôi lại, cô ấy cảm thấy làm tình ở ngay bên cạnh vợ tôi thì rất kỳ, nên muốn chờ cô ấy đi du lịch vào tháng sau. Trong suốt một tháng này, tôi phải kiềm chế, không được chịch vợ cũng như thủ dâm, Amatsuka cũng sẽ chịu đựng giống tôi. Và một tháng như cực hình cũng đã kết thúc. Vợ tôi vừa đi khỏi nhà, tôi liền sang phòng của Amatsuka. Chúng tôi không đợi thêm được nữa mà lao vào nhau như hai con thú, giải phóng toàn bộ ham muốn tình dục tích lũy suốt một tháng nay...','https://i.vlcontent.com/upload/img2/2569.jpg',1,1,'https://play.stream4.me/embed/03lqtStEVjf/s1','https://play.stream4.me/embed/03lqtStEVjf/s2','',15,3,83,'2023-12-09 17:36:28','vlxx.moe'),(10,'Cô nhân viên quán cà phê xinh đẹp và tên biến thái bệnh hoạn','co-nhan-vien-quan-ca-phe-xinh-dep-va-ten-bien-thai-benh-hoan','Suzu đang làm quản lý tại một quán cà phê. Hôm nay, một khách hàng phát hiện trong đĩa thức ăn có một miếng nhựa. Ông ta bắt Suzu phải đến tận nhà xin lỗi, nếu không thì sẽ kiện nhà hàng ra tòa. Dù biết người đàn ông này là cố tình gây sự, nhưng Suzu vẫn đến tận nhà xin lỗi ông ta. Nhưng Suzu nào ngờ, ông ta là một tên biến thái, đã theo dõi cô từ lâu! Ông ta làm vậy là để dụ cô đến đây, giam giữ và biến cô thành nô lệ tình dục của ông ta!','https://i.vlcontent.com/upload/img2/2543.jpg',2,1,'https://play.stream4.me/embed/Bs9w1IvryrX/s1','https://play.stream4.me/embed/Bs9w1IvryrX/s2','',4,2,67,'2023-12-10 00:36:28','vlxx.moe'),(11,'Loạn luân với cô chị gái của tôi','loan-luan-voi-co-chi-gai-cua-toi','Eimi là người mẫu áo tắm, cô được nghỉ mấy ngày nên quyết định về nhà thăm bố mẹ. Cô cũng gặp lại Satoshi, nhưng dường như cậu có tâm sự gì đó. Cô hỏi thì mới biết do cô là người mẫu áo tắm nên cậu hay bị bạn bè trêu chọc, tới tận bây giờ vẫn chưa có bạn gái. Vì để cho cậu em trai biết làm tình là gì, Eimi đã định ngồi kể cách hướng dẫn làm tình cho em trai nhưng cơ thể và vẻ đẹp của Eimi làm cậu ta không thể kiềm chế được. Cậu đè cô ra và bắt cô “thực hành” cùng với cậu...','https://i1.vlstorage.com/1708.jpg',5,1,'https://play.stream4.me/embed/8jXpe1t3rVk/s1','https://play.stream4.me/embed/8jXpe1t3rVk/s2','',2,0,100,'2023-12-10 00:36:28','vlxx.moe'),(12,'Thầy ơi địt em đi...','thay-oi-dit-em-di','Atlanta Moreno, một cô nàng nhút nhát, ham đọc sách đã mê mẩn thầy giáo Danny D trong nhiều tháng. Trong lúc học cho kỳ thi cuối kỳ tại nhà, cô không thể ngừng việc thủ dâm và mơ tưởng về việc bị địt như là một phần thưởng cho điểm số xuất sắc. Khi biết mình đã đạt được điểm tuyệt đối, Atlanta tận dụng cơ hội này để tuyên bố rằng cô không chỉ muốn trở thành học sinh giỏi nhất của Danny mà còn muốn trở thành cô gái mà anh ta chịu đựng tốt nhất... Cô đã biến ước mơ của mình thành hiện thực, nhấp cái áo và quyến rũ anh ta địt cô trong lớp học cho đến khi cô thỏa mãn cả miệng lẫn âm đạo của mình!','https://i2.vlstorage.com/2349.jpg',6,2,'https://play.stream4.me/embed/tZ1bFf0fmTI/s1','https://play.stream4.me/embed/tZ1bFf0fmTI/s2','',1,0,100,'2023-12-08 06:36:28','vlxx.moe'),(27,'Hai chị em xinh đẹp và ông bố dượng thú tính','hai-chi-em-xinh-dep-va-ong-bo-duong-thu-tinh','Hai chị em Sena và Fukada sống chung với người mẹ bệnh tật đã lâu, cuộc sống của họ rất khó khăn, cho tới một ngày bà mẹ lấy người chồng mới mọi thứ đã trở nên tốt đẹp hơn rất nhiều. Người cha dượng lấy bà vợ ốm yếu không phải vì tình yêu mà vì hai cô con gái xinh đẹp đang tuổi dậy thì mà lão để ý đã lâu. Một ngày nọ nhân lúc không có ai ở nhà lão cha dượng thú tính đã đè ngửa cô chị ra mà hiếp dâm không thương tiếc, sợ rằng mẹ và em gái sẽ lại phải sống trong nghèo khổ nên cô nàng cắn răng cho cha dượng thỏa mãn cơn thèm đụ, nhưng cô nàng không ngờ rằng em gái Fukada cũng không thoát khỏi bàn tay của cha dượng, cả hai chị em gái xinh đẹp đã trở thành nô lệ tình dục cho lão già biến thái.','https://i1.vlstorage.com/1363.jpg',5,1,'https://play.stream4.me/embed/Tm-gb2PmTiq/s1','https://play.stream4.me/embed/Tm-gb2PmTiq/s2',NULL,0,0,0,'2023-12-22 04:14:08','vlxx.moe');
/*!40000 ALTER TABLE `films` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `create_average_likes` BEFORE INSERT ON `films` FOR EACH ROW BEGIN
  IF (new.likes + new.un_likes) != 0 THEN
    SET new.average_likes = (new.likes * 100)/(new.likes + new.un_likes);
  ELSE 
    SET new.average_likes = 0;
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_average_likes` BEFORE UPDATE ON `films` FOR EACH ROW BEGIN
  IF (new.likes + new.un_likes) != 0 THEN
    SET new.average_likes = (new.likes * 100)/(new.likes + new.un_likes);
  ELSE 
    SET new.average_likes = 0;
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `genre_film`
--

DROP TABLE IF EXISTS `genre_film`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genre_film` (
  `id` int NOT NULL AUTO_INCREMENT,
  `film_id` int NOT NULL,
  `genre_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre_film`
--

LOCK TABLES `genre_film` WRITE;
/*!40000 ALTER TABLE `genre_film` DISABLE KEYS */;
INSERT INTO `genre_film` VALUES (118,11,1),(119,11,2),(130,12,1),(131,8,1),(132,8,5),(133,27,3);
/*!40000 ALTER TABLE `genre_film` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `genre` varchar(72) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'Việt Sub'),(2,'Không Che'),(3,'Vụng Trộm'),(4,'Hiếp Dâm'),(5,'Loạn Luân');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notify_error`
--

DROP TABLE IF EXISTS `notify_error`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notify_error` (
  `id` int NOT NULL AUTO_INCREMENT,
  `server` varchar(72) DEFAULT NULL,
  `description` varchar(256) DEFAULT NULL,
  `slug` varchar(72) DEFAULT NULL,
  `is_read` tinyint DEFAULT '0',
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notify_error`
--

LOCK TABLES `notify_error` WRITE;
/*!40000 ALTER TABLE `notify_error` DISABLE KEYS */;
INSERT INTO `notify_error` VALUES (5,'server 1','fff','co-nhan-vien-quan-ca-phe-xinh-dep-va-ten-bien-thai-benh-hoan',1,'2023-12-25 10:55:13'),(8,'server 2','','thay-oi-dit-em-di',0,'2023-12-25 11:49:49');
/*!40000 ALTER TABLE `notify_error` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `searchs`
--

DROP TABLE IF EXISTS `searchs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `searchs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `value` varchar(256) DEFAULT NULL,
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `searchs`
--

LOCK TABLES `searchs` WRITE;
/*!40000 ALTER TABLE `searchs` DISABLE KEYS */;
INSERT INTO `searchs` VALUES (1,'vo','2023-12-22 10:06:05'),(2,'v','2023-12-22 10:06:20'),(3,'khong che','2023-12-22 10:19:47'),(4,'khong','2023-12-22 10:20:00'),(5,'vo','2023-12-22 10:20:05'),(6,'khong che','2023-12-22 10:20:10'),(7,'vo','2023-12-22 10:20:14'),(8,'vợ','2023-12-22 10:22:00'),(9,'vợ','2023-12-22 10:31:29'),(10,'thay','2023-12-22 10:36:39'),(11,'thay','2023-12-22 10:37:07'),(12,'chong','2023-12-27 09:49:32'),(13,'v','2023-12-28 15:14:25');
/*!40000 ALTER TABLE `searchs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `accounts` varchar(72) DEFAULT NULL,
  `passwords` varchar(72) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `accounts_UNIQUE` (`accounts`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'AccountLoginPage@123','$2a$10$LyJaDG2FDmhlzxHfjigFPeHR01xOD4PZ5.yJ/Fv83yu0B3O9Dn8RG');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `views_film`
--

DROP TABLE IF EXISTS `views_film`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `views_film` (
  `id` int NOT NULL AUTO_INCREMENT,
  `film_id` int DEFAULT NULL,
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=406 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `views_film`
--

LOCK TABLES `views_film` WRITE;
/*!40000 ALTER TABLE `views_film` DISABLE KEYS */;
INSERT INTO `views_film` VALUES (161,8,'2023-12-10 11:05:11'),(162,8,'2023-11-30 17:00:00'),(163,8,'2023-10-31 17:00:00'),(166,8,'2023-12-10 16:46:00'),(167,12,'2023-12-10 16:51:25'),(168,12,'2023-12-10 16:52:18'),(169,11,'2023-12-10 16:53:03'),(170,11,'2023-12-10 16:53:09'),(171,10,'2023-12-10 16:53:29'),(172,10,'2023-12-10 16:54:02'),(173,10,'2023-12-10 16:54:10'),(174,10,'2023-12-10 16:54:16'),(176,11,'2023-12-10 16:55:56'),(177,11,'2023-12-11 01:05:11'),(178,11,'2023-12-11 01:06:54'),(179,11,'2023-12-11 01:08:01'),(180,11,'2023-12-11 01:09:35'),(181,11,'2023-12-11 01:09:51'),(182,11,'2023-12-11 01:16:32'),(183,11,'2023-12-11 01:17:47'),(184,11,'2023-12-11 01:18:41'),(185,11,'2023-12-11 01:20:23'),(186,11,'2023-12-11 01:25:59'),(187,11,'2023-12-11 01:33:48'),(188,11,'2023-12-11 01:37:15'),(189,11,'2023-12-11 01:37:35'),(191,11,'2023-12-11 01:39:22'),(193,10,'2023-12-11 01:42:01'),(194,11,'2023-12-11 01:43:14'),(195,10,'2023-12-11 01:44:00'),(196,10,'2023-12-11 01:55:44'),(197,10,'2023-12-11 01:59:15'),(198,11,'2023-12-11 02:01:50'),(199,8,'2023-12-11 02:02:22'),(200,8,'2023-12-11 02:03:05'),(201,8,'2023-12-11 02:21:01'),(202,8,'2023-12-11 02:32:50'),(203,8,'2023-12-11 02:56:54'),(204,8,'2023-12-11 02:57:47'),(205,8,'2023-12-11 03:02:12'),(206,8,'2023-12-11 04:27:23'),(207,11,'2023-12-11 04:35:38'),(208,12,'2023-12-11 05:21:06'),(209,10,'2023-12-11 12:19:38'),(210,13,'2023-12-12 02:10:13'),(211,8,'2023-12-12 02:53:56'),(212,12,'2023-12-12 05:03:59'),(228,12,'2023-12-12 05:45:07'),(229,10,'2023-12-12 05:46:03'),(230,10,'2023-12-12 05:46:38'),(231,11,'2023-12-15 11:02:32'),(232,13,'2023-12-15 12:52:51'),(233,12,'2023-12-16 11:26:53'),(234,11,'2023-12-16 12:20:50'),(235,11,'2023-12-16 12:22:25'),(236,11,'2023-12-16 12:27:58'),(237,8,'2023-12-16 12:33:11'),(238,8,'2023-12-16 12:34:20'),(239,8,'2023-12-16 12:40:26'),(240,11,'2023-12-16 12:40:57'),(241,8,'2023-12-16 12:40:59'),(242,8,'2023-12-16 12:41:10'),(243,11,'2023-12-16 12:41:11'),(245,8,'2020-12-31 17:00:00'),(246,8,'2023-06-19 17:00:00'),(247,8,'2023-06-19 17:00:00'),(248,8,'2023-06-19 17:00:00'),(249,10,'2023-06-19 17:00:00'),(250,10,'2023-06-19 17:00:00'),(251,10,'2023-06-19 17:00:00'),(252,10,'2023-06-19 17:00:00'),(253,11,'2023-12-21 10:45:06'),(254,27,'2023-12-22 04:14:08'),(255,11,'2023-12-22 05:14:20'),(256,11,'2023-12-22 05:14:55'),(257,11,'2023-12-22 05:15:07'),(258,11,'2023-12-22 05:16:56'),(259,11,'2023-12-22 05:18:13'),(260,11,'2023-12-22 05:18:54'),(261,11,'2023-12-22 05:19:33'),(262,11,'2023-12-22 05:22:50'),(263,11,'2023-12-22 05:23:44'),(264,11,'2023-12-22 05:28:22'),(265,11,'2023-12-22 05:28:35'),(266,11,'2023-12-22 09:31:06'),(267,11,'2023-12-22 09:32:37'),(268,11,'2023-12-22 09:33:20'),(269,11,'2023-12-22 09:34:02'),(270,11,'2023-12-22 09:35:07'),(271,11,'2023-12-22 09:35:36'),(272,11,'2023-12-22 09:37:08'),(273,8,'2023-12-22 09:38:54'),(274,8,'2023-12-22 09:39:11'),(275,8,'2023-12-22 09:40:56'),(276,11,'2023-12-22 09:43:40'),(277,11,'2023-12-22 09:44:57'),(278,11,'2023-12-22 09:45:49'),(279,11,'2023-12-22 10:34:39'),(280,11,'2023-12-22 10:38:36'),(281,10,'2023-12-22 11:38:21'),(282,12,'2023-12-22 13:29:45'),(283,12,'2023-12-22 13:40:22'),(284,12,'2023-12-22 13:48:04'),(285,12,'2023-12-22 13:52:27'),(286,12,'2023-12-22 13:53:21'),(287,12,'2023-12-22 13:54:39'),(288,12,'2023-12-22 13:54:59'),(289,12,'2023-12-22 13:57:48'),(290,12,'2023-12-22 13:58:03'),(291,12,'2023-12-22 14:00:31'),(292,12,'2023-12-22 14:07:37'),(293,12,'2023-12-22 14:07:58'),(294,12,'2023-12-22 14:10:33'),(295,12,'2023-12-22 14:11:19'),(296,12,'2023-12-22 14:11:30'),(297,12,'2023-12-22 14:11:55'),(298,12,'2023-12-22 14:14:07'),(299,12,'2023-12-22 14:14:33'),(300,12,'2023-12-22 14:15:05'),(301,12,'2023-12-22 14:16:18'),(302,12,'2023-12-22 14:16:30'),(303,11,'2023-12-22 14:22:15'),(304,11,'2023-12-22 14:22:57'),(305,11,'2023-12-22 14:23:15'),(306,11,'2023-12-22 14:24:08'),(307,11,'2023-12-22 14:27:22'),(308,11,'2023-12-22 14:27:34'),(309,11,'2023-12-22 14:28:17'),(310,11,'2023-12-22 14:28:52'),(311,11,'2023-12-22 14:29:24'),(312,11,'2023-12-22 14:33:37'),(313,11,'2023-12-22 14:35:13'),(314,11,'2023-12-22 14:35:37'),(315,12,'2023-12-23 02:23:31'),(316,12,'2023-12-23 02:25:52'),(317,12,'2023-12-23 02:27:07'),(318,12,'2023-12-23 02:27:22'),(319,12,'2023-12-23 02:28:26'),(320,12,'2023-12-23 02:29:35'),(321,12,'2023-12-23 02:29:47'),(322,12,'2023-12-23 02:30:08'),(323,12,'2023-12-23 02:31:25'),(324,12,'2023-12-23 02:32:15'),(325,12,'2023-12-23 02:55:49'),(326,12,'2023-12-23 02:56:05'),(327,12,'2023-12-23 02:56:32'),(328,12,'2023-12-23 02:57:25'),(329,8,'2023-12-23 04:56:14'),(330,8,'2023-12-25 10:54:01'),(331,10,'2023-12-25 11:54:15'),(332,11,'2023-12-26 10:30:04'),(333,11,'2023-12-26 10:42:33'),(334,11,'2023-12-26 10:44:09'),(335,11,'2023-12-26 10:44:47'),(336,11,'2023-12-26 10:48:18'),(337,11,'2023-12-26 10:50:57'),(338,11,'2023-12-26 10:53:13'),(339,11,'2023-12-26 10:53:54'),(340,11,'2023-12-26 10:54:45'),(341,11,'2023-12-26 10:58:30'),(342,11,'2023-12-26 10:59:14'),(343,11,'2023-12-26 10:59:37'),(344,11,'2023-12-26 11:00:11'),(345,11,'2023-12-26 11:00:31'),(346,11,'2023-12-26 11:01:08'),(347,11,'2023-12-26 11:02:03'),(348,11,'2023-12-26 11:02:56'),(349,11,'2023-12-26 11:03:32'),(350,11,'2023-12-26 11:11:37'),(351,11,'2023-12-26 11:44:40'),(352,10,'2023-12-26 11:45:29'),(353,10,'2023-12-27 03:52:52'),(354,12,'2023-12-27 10:04:51'),(355,12,'2023-12-27 10:07:10'),(356,12,'2023-12-27 10:07:41'),(357,12,'2023-12-27 10:08:38'),(358,12,'2023-12-27 10:09:42'),(359,12,'2023-12-27 10:15:13'),(360,12,'2023-12-27 10:18:59'),(361,12,'2023-12-28 11:38:47'),(362,12,'2023-12-28 11:38:59'),(363,12,'2023-12-28 11:39:51'),(364,12,'2023-12-28 11:53:24'),(365,12,'2023-12-28 13:26:36'),(366,12,'2023-12-28 13:27:08'),(367,12,'2023-12-28 13:27:45'),(368,12,'2023-12-28 13:28:01'),(369,12,'2023-12-28 13:29:06'),(370,27,'2023-12-28 14:03:24'),(371,11,'2023-12-28 14:08:44'),(372,11,'2023-12-28 14:09:31'),(373,11,'2023-12-28 14:14:19'),(374,11,'2023-12-28 14:17:02'),(375,11,'2023-12-28 14:17:29'),(376,27,'2023-12-28 14:26:16'),(377,27,'2023-12-28 14:30:38'),(378,8,'2023-12-28 15:12:33'),(379,11,'2023-12-28 15:13:49'),(380,12,'2023-12-29 03:53:12'),(381,12,'2023-12-29 03:53:36'),(382,11,'2023-12-29 04:41:06'),(383,11,'2023-12-29 04:58:45'),(384,11,'2023-12-29 05:11:03'),(385,11,'2023-12-29 05:18:03'),(386,11,'2023-12-29 05:36:19'),(387,11,'2023-12-29 05:40:18'),(388,11,'2023-12-29 05:44:25'),(389,11,'2023-12-29 05:45:09'),(390,11,'2023-12-29 05:56:46'),(391,11,'2023-12-29 05:57:16'),(392,11,'2023-12-29 05:57:31'),(393,11,'2023-12-29 05:57:54'),(394,11,'2023-12-29 05:59:34'),(395,11,'2023-12-29 05:59:49'),(396,11,'2023-12-29 06:00:16'),(397,11,'2023-12-29 06:01:36'),(398,11,'2023-12-29 06:02:44'),(399,11,'2023-12-29 06:04:37'),(400,11,'2023-12-29 06:07:49'),(401,12,'2024-01-02 09:51:28'),(402,11,'2024-01-02 11:21:48'),(403,11,'2024-01-02 11:23:09'),(404,11,'2024-01-02 11:25:33'),(405,11,'2024-01-02 11:26:35');
/*!40000 ALTER TABLE `views_film` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-06  7:10:21
