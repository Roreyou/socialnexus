-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: socialnexus
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `activity`
--

DROP TABLE IF EXISTS `activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity` (
  `id` varchar(45) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `setup_date` date DEFAULT NULL,
  `application_deadline` varchar(45) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `vacancies` int DEFAULT NULL,
  `province` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `category_id` varchar(20) DEFAULT NULL,
  `community_id` varchar(20) DEFAULT NULL,
  `remark` text,
  `keywords_id` varchar(90) DEFAULT NULL,
  `verification_status` int DEFAULT NULL,
  `activity_status` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
INSERT INTO `activity` VALUES ('1','社区趣味运动会','2002-09-21',NULL,'2022-06-15 09:30:45','2022-06-18 09:30:45',NULL,'广东省','佛山市','1','1','1','1','1,2,3',1,1),('2','关爱老人活动','2002-09-21',NULL,'2023-06-15 09:30:45','2023-06-18 09:30:45',NULL,'广东省','珠海市','1','2','1','1','1,3',1,1),('3','社区大扫除活动','2002-09-21',NULL,'2023-06-15 09:30:45','2023-06-16 09:30:45',NULL,'广东省','珠海市','1','1','1','1','1',1,3),('4','运动会','2002-09-21',NULL,'2023-06-15 09:30:45','2023-06-16 09:30:45',NULL,'浙江省','嘉兴市','1','1','1','1','2',1,3);
/*!40000 ALTER TABLE `activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activity_type`
--

DROP TABLE IF EXISTS `activity_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity_type` (
  `id` int NOT NULL,
  `type_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_type`
--

LOCK TABLES `activity_type` WRITE;
/*!40000 ALTER TABLE `activity_type` DISABLE KEYS */;
INSERT INTO `activity_type` VALUES (1,'社区经济发展'),(2,'社区团建工作'),(3,'社区社会调查'),(4,'社区文体活动'),(5,'社区教育服务'),(6,'社区环境治理'),(7,'其它');
/*!40000 ALTER TABLE `activity_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `team_id` varchar(20) DEFAULT NULL,
  `post_id` varchar(20) DEFAULT NULL,
  `content` text,
  `time` datetime DEFAULT NULL,
  `like` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'97','70','好丰富的活动！','2024-04-20 08:30:00',5),(2,'77','70','今天我们的体验很不错！','2024-04-18 08:30:00',4),(4,'55','1','测试评价功能！','2024-04-14 13:56:40',5),(5,'55','1','测试评价功能2！','2024-04-14 14:04:16',2),(15,'55','1','测试评价功能3！','2024-04-14 14:18:20',0),(16,'55','1','测试评价功能5！','2024-04-14 14:37:08',0),(17,'55','1','测试评价功能5！','2024-04-14 14:39:28',0),(18,'55','1','测试评价功能5！','2024-04-14 14:40:07',0),(19,'55','1','测试评价功能6！','2024-04-14 14:41:16',0);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `community`
--

DROP TABLE IF EXISTS `community`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `community` (
  `id` varchar(20) NOT NULL,
  `pwd` varchar(60) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `tel` varchar(20) DEFAULT NULL,
  `province` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `remark` text,
  `setup_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community`
--

LOCK TABLES `community` WRITE;
/*!40000 ALTER TABLE `community` DISABLE KEYS */;
INSERT INTO `community` VALUES ('1','111','名字1','11','广东省','珠海市','111','1',NULL);
/*!40000 ALTER TABLE `community` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `datawall_act`
--

DROP TABLE IF EXISTS `datawall_act`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `datawall_act` (
  `id` varchar(20) DEFAULT NULL,
  `activity_id` varchar(20) NOT NULL,
  `team_num` int DEFAULT NULL,
  PRIMARY KEY (`activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datawall_act`
--

LOCK TABLES `datawall_act` WRITE;
/*!40000 ALTER TABLE `datawall_act` DISABLE KEYS */;
/*!40000 ALTER TABLE `datawall_act` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `datawall_com`
--

DROP TABLE IF EXISTS `datawall_com`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `datawall_com` (
  `id` varchar(20) DEFAULT NULL,
  `community_id` varchar(20) NOT NULL,
  `activity_num` int DEFAULT NULL,
  `team_num` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`community_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datawall_com`
--

LOCK TABLES `datawall_com` WRITE;
/*!40000 ALTER TABLE `datawall_com` DISABLE KEYS */;
/*!40000 ALTER TABLE `datawall_com` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorate`
--

DROP TABLE IF EXISTS `favorate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorate` (
  `team_id` varchar(20) NOT NULL,
  `activity_id` varchar(20) NOT NULL,
  PRIMARY KEY (`team_id`,`activity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorate`
--

LOCK TABLES `favorate` WRITE;
/*!40000 ALTER TABLE `favorate` DISABLE KEYS */;
INSERT INTO `favorate` VALUES ('1','2'),('1','3');
/*!40000 ALTER TABLE `favorate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `key_words`
--

DROP TABLE IF EXISTS `key_words`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `key_words` (
  `id` int NOT NULL,
  `key_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `key_words`
--

LOCK TABLES `key_words` WRITE;
/*!40000 ALTER TABLE `key_words` DISABLE KEYS */;
INSERT INTO `key_words` VALUES (1,'教育'),(2,'助老'),(3,'劳动');
/*!40000 ALTER TABLE `key_words` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `team_id` varchar(20) DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `content` text,
  `star` int DEFAULT NULL,
  `picture` varchar(256) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `province` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  `post_time` datetime DEFAULT NULL,
  `like` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'77','1','non incididunt Lorem veniam',35,'http://dummyimage.com/400x400,http://dummyimage.com/200x200','1992-04-26','1977-09-06','北京市','北京市','陕西省九龙琼山区','2009-11-14 10:31:14',5),(70,'77','1','non incididunt Lorem veniam',35,'http://dummyimage.com/400x400,http://dummyimage.com/200x200','1992-04-26','1977-09-06','北京市','北京市','陕西省九龙琼山区','2009-11-14 10:31:14',4),(71,'55','1','reprehenderit mollit exercitation esse est',72,'http://dummyimage.com/400x400','2012-03-09','1971-12-28','福建省','广元市','西藏自治区恩施土家族苗族自治州韶山市','1979-10-03 06:38:23',3),(74,'77','是么须五近人','ut anim',34,'http://dummyimage.com/400x400','1977-05-03','1999-09-30','河北省','玉树藏族自治州','河南省重庆市克东县','1994-02-02 13:00:31',NULL);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reply`
--

DROP TABLE IF EXISTS `reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reply` (
  `id` int NOT NULL,
  `comment_id` varchar(45) DEFAULT NULL,
  `reply_id` varchar(45) DEFAULT NULL,
  `content` text,
  `time` datetime DEFAULT NULL,
  `like` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reply`
--

LOCK TABLES `reply` WRITE;
/*!40000 ALTER TABLE `reply` DISABLE KEYS */;
INSERT INTO `reply` VALUES (1,'2','97','真的你们表现很不错！','2024-04-20 08:30:00',1),(2,'4','97','下次我们队伍也想去看看！','2024-04-20 08:30:00',0),(3,'4','55','回复功能测试1！','2024-04-20 08:30:00',5);
/*!40000 ALTER TABLE `reply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `school`
--

DROP TABLE IF EXISTS `school`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `school` (
  `id` varchar(20) NOT NULL,
  `pwd` varchar(60) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `manager` varchar(45) DEFAULT NULL,
  `setup_date` varchar(45) DEFAULT NULL,
  `tel` varchar(20) DEFAULT NULL,
  `province` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `address` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school`
--

LOCK TABLES `school` WRITE;
/*!40000 ALTER TABLE `school` DISABLE KEYS */;
/*!40000 ALTER TABLE `school` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schoolteam`
--

DROP TABLE IF EXISTS `schoolteam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schoolteam` (
  `id` varchar(20) NOT NULL,
  `pwd` varchar(60) DEFAULT NULL,
  `team_name` varchar(45) DEFAULT NULL,
  `school_id` varchar(45) DEFAULT NULL,
  `setup_date` date DEFAULT NULL,
  `remark` text,
  `comment_status` int DEFAULT NULL,
  `leader_id` varchar(20) DEFAULT NULL,
  `instructor_id` varchar(20) DEFAULT NULL,
  `relevant_faculties` varchar(45) DEFAULT NULL,
  `verification_status` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schoolteam`
--

LOCK TABLES `schoolteam` WRITE;
/*!40000 ALTER TABLE `schoolteam` DISABLE KEYS */;
INSERT INTO `schoolteam` VALUES ('77','$2b$10$6qe1MYwjeGq1H8VpDTha3.wzt72ty6sNK3Y9LWZ6ehPeqrYOg01O.','成深大持体角达','52','1993-01-29','in in laboris adipisicing ut',NULL,'34','53',NULL,NULL),('97','$2b$10$wv3X3cHvgLShaZGpLRHZmeuJ8eL/SDH8n55pRyaI8jba0AS7nVlki','种战题般','37','2023-02-16','sed tempor ea occaecat',NULL,'19','99',NULL,0);
/*!40000 ALTER TABLE `schoolteam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher` (
  `id` varchar(20) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `tel` varchar(45) DEFAULT NULL,
  `major` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES ('53','吴老师','12345678910','软件工程学院'),('99','南半油联信','18151694055','软件工程学院');
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teamactivity`
--

DROP TABLE IF EXISTS `teamactivity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teamactivity` (
  `activity_id` varchar(20) NOT NULL,
  `team_id` varchar(20) NOT NULL,
  `com_to_team` text,
  `team_to_activity` text,
  `admission_status` int DEFAULT NULL,
  `comment_status` int DEFAULT NULL,
  PRIMARY KEY (`activity_id`,`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teamactivity`
--

LOCK TABLES `teamactivity` WRITE;
/*!40000 ALTER TABLE `teamactivity` DISABLE KEYS */;
INSERT INTO `teamactivity` VALUES ('2','1','excellent','good',NULL,2),('3','1','not bad','good',NULL,2);
/*!40000 ALTER TABLE `teamactivity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teammember`
--

DROP TABLE IF EXISTS `teammember`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teammember` (
  `id` varchar(20) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `tel` varchar(45) DEFAULT NULL,
  `major` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `grade` varchar(20) DEFAULT NULL,
  `team_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teammember`
--

LOCK TABLES `teammember` WRITE;
/*!40000 ALTER TABLE `teammember` DISABLE KEYS */;
INSERT INTO `teammember` VALUES ('19','传由较周收快需','18119155591','软件工程学院','z.efxtgychkh@qq.com','ea','77'),('34','哈哈哈','122','人工智能学院','xxxx@qq.com','1','77');
/*!40000 ALTER TABLE `teammember` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-14 22:49:42
