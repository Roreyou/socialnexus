-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: bycsql
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
  `id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `setup_date` date DEFAULT NULL,
  `application_deadline` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `vacancies` int DEFAULT NULL,
  `province` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `community_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `keywords_id` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `verification_status` int DEFAULT NULL,
  `activity_status` int DEFAULT NULL,
  `picture` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `QRCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
INSERT INTO `activity` VALUES ('1','青少年实践中心志愿活动','2003-11-07','2000-09-02','2024-03-08 06:28:02','2024-11-24 12:14:19',25,'广东省','珠海市','中山大学附属中学',1,'1','外现展话毛命日位看合始解真什目圆。个入单级被头算界求商快受半话被就温。给收问及度选务而没组复线什将门更二展。','1,3',2,1,'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/cfc0aa9e-138a-41ea-a9c6-733b59dc38ab.jpg','https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/16c106c3-907a-4bfb-9520-95451d18da3a.jpg'),('10','运动会','2002-09-21','2002-09-27','2023-06-15 09:30:45','2024-06-16 09:30:45',20,'浙江省','嘉兴市','南湖区博物馆',2,'100','1','2',3,3,'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/bb1f2ab1-7104-44c1-a1ce-3f7ced2bcb91.png',NULL),('11','西藏支教','2002-09-21','2002-09-27','2023-06-15 09:30:45','2024-06-16 09:30:45',20,'浙江省','嘉兴市','香洲区江南摩尔广场',3,'100','1','2',2,3,'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/cfc0aa9e-138a-41ea-a9c6-733b59dc38ab.jpg',NULL),('2','关爱老人活动','2002-09-21','2002-09-29','2023-06-15 09:30:45','2024-06-18 09:30:45',20,'广东省','珠海市','中山大学老人院',2,'1','1','1,3',3,1,'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/bb1f2ab1-7104-44c1-a1ce-3f7ced2bcb91.png','https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/e3bdeef4-5285-4bd0-8c8c-f88598584851.png'),('3','社区大扫除活动','2002-09-21','2002-09-28','2024-06-15 09:30:45','2024-06-16 09:30:45',20,'广东省','珠海市','鸡山社区',3,'1','1','1',2,2,'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/4adc3b25-7872-48de-9778-bb3c70c7c3b0.jpg',NULL),('4','献血活动','2002-09-21','2002-09-27','2023-06-15 09:30:45','2024-06-16 09:30:45',20,'湖南省','长沙市','长沙南站',3,'1','1','2',2,2,'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/bb1f2ab1-7104-44c1-a1ce-3f7ced2bcb91.png',NULL),('5','中山大学附属医院眼科义务医治','2002-09-21','2002-09-27','2023-06-15 09:30:45','2024-06-16 09:30:45',20,'广东省','中山市','中山公园',1,'1','1','2',2,3,'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/0fde1cb7-85ed-47c3-bf4f-06dbc1bda72d.jpg',NULL),('6','艾滋病科普宣传活动','2002-09-21','2002-09-27','2023-06-15 09:30:45','2024-06-16 09:30:45',20,'广东省','广州市','大学城',1,'1','1','2',2,3,'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/bb1f2ab1-7104-44c1-a1ce-3f7ced2bcb91.png',NULL),('7','消防知识宣教','2002-09-21','2002-09-27','2023-06-15 09:30:45','2024-06-16 09:30:45',20,'黑龙江省','双鸭山市','森林公园',1,'100','1','2',2,3,'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/c9d66109-ba16-446c-913f-ab8f73934e06.png',NULL),('8','图书馆志愿服务','2002-09-21','2002-09-27','2024-06-15 09:30:45','2024-06-16 09:30:45',20,'广东省','中山市','中山图书馆图书馆',2,'100','1','2',2,3,'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/bb1f2ab1-7104-44c1-a1ce-3f7ced2bcb91.png',NULL),('9','中山支教','2002-09-21','2002-09-27','2023-06-15 09:30:45','2024-06-16 09:30:45',20,'广东省','中山市','三乡镇平南村三鑫学校',2,'100','1','2',3,3,'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/bb1f2ab1-7104-44c1-a1ce-3f7ced2bcb91.png',NULL);
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
  `type_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
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
  `team_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `post_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `time` datetime DEFAULT NULL,
  `like` int DEFAULT NULL,
  `ifread` int DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (17,'uRhpyNhbhmErje8Cg6sFnC','95','你好','2024-05-24 05:35:54',0,0),(18,'uFQNyrb2QVZYZCPSsJoGtp','97','over！','2024-05-24 07:07:02',2,0),(19,'uRhpyNhbhmErje8Cg6sFnC','97','ory手机测试1评论','2024-05-24 07:31:53',1,0);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `community`
--

DROP TABLE IF EXISTS `community`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `community` (
  `id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tel` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `province` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `setup_date` date DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `pwd` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community`
--

LOCK TABLES `community` WRITE;
/*!40000 ALTER TABLE `community` DISABLE KEYS */;
INSERT INTO `community` VALUES ('1','隆昌县基层','18139827734','四川省','成都市','贵港市隆昌县','Excepteur proident adipisicing mollit Ut','1973-10-23','https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg','$2b$10$RfsWN.aofrgaRN6rgpEL3.7Qe/sHuY38Yw4cTIBkI68Kbi3rOB4d.'),('100','先进社区','18133334146','陕西省','咸阳市','咸阳的某个山卡拉','velit tempor sint','1983-01-24','https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg','$2b$10$RfsWN.aofrgaRN6rgpEL3.7Qe/sHuY38Yw4cTIBkI68Kbi3rOB4d.'),('101','天坛路社区基层工会','18133334146','湖北省','武汉市','长延保商圈','velit tempor sint','1983-01-24','https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg','$2b$10$RfsWN.aofrgaRN6rgpEL3.7Qe/sHuY38Yw4cTIBkI68Kbi3rOB4d.'),('120','紫水社区基层综合性文化服务中心','18652198388','甘肃省','兰州市','灞桥区','amet eiusmod et id','1978-08-27','https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg','$2b$10$RfsWN.aofrgaRN6rgpEL3.7Qe/sHuY38Yw4cTIBkI68Kbi3rOB4d.'),('121','辛口存基层综合性文化服务中心','18652198388','甘肃省','兰州市','衢州市阿拉善右旗','amet eiusmod et id','1978-08-27','https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg','$2b$10$RfsWN.aofrgaRN6rgpEL3.7Qe/sHuY38Yw4cTIBkI68Kbi3rOB4d.'),('122','政查角办','18652198388','甘肃省','北京市','宁夏回族自治区衢州市阿拉善右旗','amet eiusmod et id','1978-08-27','https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg','$2b$10$RfsWN.aofrgaRN6rgpEL3.7Qe/sHuY38Yw4cTIBkI68Kbi3rOB4d.'),('123','政查角办','18652198388','甘肃省','北京市','宁夏回族自治区衢州市阿拉善右旗','amet eiusmod et id','1978-08-27','https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg','$2b$10$RfsWN.aofrgaRN6rgpEL3.7Qe/sHuY38Yw4cTIBkI68Kbi3rOB4d.'),('59','政查角办','18652198388','甘肃省','北京市','宁夏回族自治区衢州市阿拉善右旗','amet eiusmod et id','1978-08-27','https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg','$2b$10$RfsWN.aofrgaRN6rgpEL3.7Qe/sHuY38Yw4cTIBkI68Kbi3rOB4d.'),('666','666','666','湖北省','武汉市','666','666','2024-05-21',NULL,'$2b$10$RfsWN.aofrgaRN6rgpEL3.7Qe/sHuY38Yw4cTIBkI68Kbi3rOB4d.'),('99','共十治','18133334146','湖北省','咸阳市','广西壮族自治区泉州市深水埗区','velit tempor sint','1983-01-24','https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg','$2b$10$RfsWN.aofrgaRN6rgpEL3.7Qe/sHuY38Yw4cTIBkI68Kbi3rOB4d.'),('999','999','999','湖北省','武汉市','999','999','2024-05-22',NULL,'$2b$10$RfsWN.aofrgaRN6rgpEL3.7Qe/sHuY38Yw4cTIBkI68Kbi3rOB4d.');
/*!40000 ALTER TABLE `community` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `datawall_act`
--

DROP TABLE IF EXISTS `datawall_act`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `datawall_act` (
  `id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `activity_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `team_num` int DEFAULT NULL,
  PRIMARY KEY (`activity_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
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
  `id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `community_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `activity_num` int DEFAULT NULL,
  `team_num` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`community_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
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
  `team_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `activity_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`team_id`,`activity_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorate`
--

LOCK TABLES `favorate` WRITE;
/*!40000 ALTER TABLE `favorate` DISABLE KEYS */;
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
  `key_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
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
-- Table structure for table `likecomment`
--

DROP TABLE IF EXISTS `likecomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likecomment` (
  `comment_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `team_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ifread` int DEFAULT NULL,
  `liketime` datetime DEFAULT NULL,
  PRIMARY KEY (`comment_id`,`team_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likecomment`
--

LOCK TABLES `likecomment` WRITE;
/*!40000 ALTER TABLE `likecomment` DISABLE KEYS */;
INSERT INTO `likecomment` VALUES ('18','uFQNyrb2QVZYZCPSsJoGtp',0,'2024-05-24 13:32:39'),('18','uRhpyNhbhmErje8Cg6sFnC',0,'2024-05-24 08:05:58'),('19','uRhpyNhbhmErje8Cg6sFnC',0,'2024-05-24 07:52:28');
/*!40000 ALTER TABLE `likecomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likepost`
--

DROP TABLE IF EXISTS `likepost`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likepost` (
  `post_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `team_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ifread` int DEFAULT NULL,
  `liketime` datetime DEFAULT NULL,
  PRIMARY KEY (`post_id`,`team_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likepost`
--

LOCK TABLES `likepost` WRITE;
/*!40000 ALTER TABLE `likepost` DISABLE KEYS */;
INSERT INTO `likepost` VALUES ('95','uFQNyrb2QVZYZCPSsJoGtp',0,'2024-05-24 13:40:42'),('97','uFQNyrb2QVZYZCPSsJoGtp',0,'2024-05-24 13:40:21'),('97','uRhpyNhbhmErje8Cg6sFnC',0,'2024-05-24 07:53:14');
/*!40000 ALTER TABLE `likepost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likereply`
--

DROP TABLE IF EXISTS `likereply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likereply` (
  `reply_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `team_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ifread` int DEFAULT NULL,
  `liketime` datetime DEFAULT NULL,
  PRIMARY KEY (`reply_id`,`team_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likereply`
--

LOCK TABLES `likereply` WRITE;
/*!40000 ALTER TABLE `likereply` DISABLE KEYS */;
/*!40000 ALTER TABLE `likereply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modify_teacher`
--

DROP TABLE IF EXISTS `modify_teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modify_teacher` (
  `id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `team_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tel` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `major` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modify_teacher`
--

LOCK TABLES `modify_teacher` WRITE;
/*!40000 ALTER TABLE `modify_teacher` DISABLE KEYS */;
INSERT INTO `modify_teacher` VALUES ('19922365','uRhpyNhbhmErje8Cg6sFnC','林柱良','18566663333','软件工程学院','email@qq.com'),('74','51','传设县听全地西','18622644795','in ea esse','n.yod@qq.com');
/*!40000 ALTER TABLE `modify_teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modify_teammember`
--

DROP TABLE IF EXISTS `modify_teammember`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modify_teammember` (
  `id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `team_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tel` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `major` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `grade` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`,`team_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modify_teammember`
--

LOCK TABLES `modify_teammember` WRITE;
/*!40000 ALTER TABLE `modify_teammember` DISABLE KEYS */;
INSERT INTO `modify_teammember` VALUES ('21311212','uRhpyNhbhmErje8Cg6sFnC','李璐娃','11011011011','软件工程学院','email@qq.com','2021'),('21311261','uRhpyNhbhmErje8Cg6sFnC','陈卓敏','12345678','软件工程学院','email4@qq.com','2021'),('21311499','uRhpyNhbhmErje8Cg6sFnC','包原畅','12345678','软件工程学院','email3@qq.com','2021'),('21311537','uRhpyNhbhmErje8Cg6sFnC','欧荣荣','18566213988','人工智能学院','email@sysu.edu.cn','2021'),('33','51','更写酸','18125354361','cupidatat','c.ynqv@qq.com','ut ipsum in laboris');
/*!40000 ALTER TABLE `modify_teammember` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `team_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `post_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `num` int DEFAULT NULL,
  PRIMARY KEY (`team_id`,`post_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES ('uRhpyNhbhmErje8Cg6sFnC','95',0),('uRhpyNhbhmErje8Cg6sFnC','97',0);
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `team_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `title` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `star` int DEFAULT NULL,
  `picture` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `province` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `post_time` datetime DEFAULT NULL,
  `like` int DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (95,'uRhpyNhbhmErje8Cg6sFnC',NULL,'apifox测试',NULL,'http://dummyimage.com/400x400','1998-11-28','2009-09-19','江苏省','海口市','吉林省巴中市固始县','2024-05-24 05:35:17',1),(97,'uRhpyNhbhmErje8Cg6sFnC',NULL,'结束三天开心的活动',NULL,'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/9ae1664d-ff89-4784-8d99-55d09c1f4169.jpg',NULL,NULL,'广东省','珠海市',NULL,'2024-05-24 07:05:25',2),(98,'uFQNyrb2QVZYZCPSsJoGtp',NULL,'我怎么又在调试接口',NULL,'http://dummyimage.com/250x250','1976-10-21','2007-09-05','云南省','临沂市','西藏自治区锡林郭勒盟文登市','2024-05-24 13:49:07',0);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reply`
--

DROP TABLE IF EXISTS `reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reply` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `reply_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `time` datetime DEFAULT NULL,
  `like` int DEFAULT NULL,
  `ifread` int DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reply`
--

LOCK TABLES `reply` WRITE;
/*!40000 ALTER TABLE `reply` DISABLE KEYS */;
INSERT INTO `reply` VALUES (17,'17','uRhpyNhbhmErje8Cg6sFnC','回复我的评论','2024-05-24 05:36:18',0,0);
/*!40000 ALTER TABLE `reply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `school`
--

DROP TABLE IF EXISTS `school`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `school` (
  `id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `pwd` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `manager` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `setup_date` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tel` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `province` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school`
--

LOCK TABLES `school` WRITE;
/*!40000 ALTER TABLE `school` DISABLE KEYS */;
INSERT INTO `school` VALUES ('1','111','中山大学','11','11','11','11','11','11'),('32','$2b$10$UgPGRWcGduKzpdAWNPxXkO6psiFEoD.rWKPSfZVrg7LhfkB5JFe7W','中山大学',NULL,'2009-03-14 21:19:12',NULL,NULL,NULL,NULL),('sysu','$2b$10$edLzvFzIVkRCBv9vg.YfYu38YCn.2qjYVqfmabuRt3WHgKAE/bQ/G','中山大学',NULL,'2009-03-14 21:19:12',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `school` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schoolteam`
--

DROP TABLE IF EXISTS `schoolteam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schoolteam` (
  `id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `pwd` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `team_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `school_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `setup_date` date DEFAULT NULL,
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `leader_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `instructor_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `relevant_faculties` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `comment_status` int DEFAULT NULL,
  `verification_status` int DEFAULT NULL,
  `modification_status` int DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schoolteam`
--

LOCK TABLES `schoolteam` WRITE;
/*!40000 ALTER TABLE `schoolteam` DISABLE KEYS */;
INSERT INTO `schoolteam` VALUES ('14xAmupuigw7B2DLhSsvmK',NULL,'玛卡巴卡西部建设队',NULL,'2024-05-23','xxxx','11111111',NULL,NULL,NULL,1,NULL,'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/3607faf5-35e6-495f-b81a-c046b425f02e.png'),('3h71YodfGKXVspCu8ofdbX','$2b$10$JxTJq6OZ/PDmq4NmVbfI7u7ByUMFQz5Q1vMIBdPvfPdJjr4H9T2ea','长命技花立1','1',NULL,'irure est proident reprehenderit','100','99',NULL,NULL,4,NULL,'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg'),('53MNdzw43VLp12ghgTXJFA','$2b$10$pRJvg1SEMCK0vb/.XnLUgu1Xf7ClB4hrgPw/T6FeS3oe.Pwdz7BXa','长命技花立',NULL,NULL,'irure est proident reprehenderit','100','99',NULL,NULL,4,NULL,'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg'),('6sXrGz6VWKAm46Jz2g3Gxs',NULL,'4441',NULL,'2024-05-21','444','444','15','labore, ut, nisi non',NULL,4,NULL,'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg'),('c9hTNzGax42f9wQqgNGX6x',NULL,'4442',NULL,'2024-05-21','444','444',NULL,NULL,NULL,4,NULL,'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg'),('co6SEzku9yTvo8kQGH4639',NULL,'没备称细接时决2',NULL,NULL,'Lorem in','19','99',NULL,NULL,4,NULL,'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg'),('di6FUj5KZDn9VVe1J3wuSg',NULL,'人来要满',NULL,NULL,'ad id ut','19','99',NULL,NULL,4,NULL,'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg'),('fk6ZL5iFFrP7Vh5PGMLwKu',NULL,'铁道游击队',NULL,'2024-05-23','xxxxxxxx','87654321',NULL,NULL,NULL,1,NULL,'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/78646eed-e566-4ecb-9d61-eea83cbb4edb.png'),('iGafV26sXoPPjyWfaJDpGC','$2b$10$x7HRXNAxeq9EnmlNzFGT5.mm5UK1cIPiAzzdxXTlxq1iPL8cOZfC2','长命技花立2','1',NULL,'irure est proident reprehenderit','100','99',NULL,NULL,4,NULL,'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg'),('kn5u6NuyUjMCzX9kFN4sSY',NULL,'001',NULL,'2024-05-22','001','001',NULL,NULL,NULL,1,NULL,'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/d98f2db4-74cf-44fb-80ac-5de45af0d2ab.jpg'),('m9Xw3QS8dLzH9JWqzeshWb',NULL,'123的另外一支队伍',NULL,'2024-05-21','无','123','99',NULL,NULL,4,NULL,'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg'),('mFYVKtfiRnCVsxHk8atihj',NULL,'333',NULL,'2024-05-21','333','333',NULL,NULL,NULL,4,NULL,'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg'),('mGe2aDDj7ZsbJbHkdpbkw2','$2b$10$YJ27oejH3PrTWmR/5t7vU.cSx/CB4C77JlfJiwwZq2Csu455oBdsS','没备称细接时决1',NULL,NULL,'Lorem in','19','99',NULL,NULL,4,NULL,'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg'),('mXAbFBRfKpJc8SwGFABF6S',NULL,'测试队伍2',NULL,'2024-05-21','无','123','99',NULL,NULL,4,NULL,'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg'),('ppNzFa61k1VcdvDWJTA978',NULL,'222',NULL,'2024-05-21','222','222','99',NULL,NULL,4,NULL,'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg'),('uFQNyrb2QVZYZCPSsJoGtp',NULL,'汪汪立大功队',NULL,'2024-05-23','xxxx','12345678',NULL,NULL,NULL,1,NULL,'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/9bc7dc06-5460-453d-bbf6-f6295aba3457.png'),('uRhpyNhbhmErje8Cg6sFnC',NULL,'中珠施工队','1','2024-05-22','xxxx','21311212','19922365','软件工程学院, 人工智能学院',NULL,2,1,'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/c77675ec-5c6c-47a7-9e4b-a36ed3ffce09.jpg');
/*!40000 ALTER TABLE `schoolteam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher` (
  `id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `pwd` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tel` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `major` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES ('111',NULL,'111','111','111',NULL),('15','$2b$10$m9Y8AsS65pDErgfFqvSBIur5XnaY7pLocwXh1hED.8V6jDNHjjWRi','难认机情','13671594365','labore','u.lhtgib@qq.com'),('19922365','$2b$10$Euor2v51xyY/7SNRpo.5tO6JY9Kq11B6EmfrmijzeRR8sZ62wz5JS','林柱良','18566663333','软件工程学院','email@qq.com'),('2','$2b$10$7XoWx9IUqvZz1nwSfm6P3ez50Tz8HiwbRXinIf/dzhfN4fI3lsiXq','步却布她','18651613347','adipisicing','l.mcjmt@qq.com'),('45263987','$2b$10$NM0pRZsiyraYfW75PvWcbeGts9wPszg9US11O98OMyPWU9LEakXiu','林柱良','13822088566','软件工程学院','email@qq.com'),('53','$2b$10$YaJoyoDfHroXgSd4UOypheAOfKKKONpSvPGcNwZ0ucoxL/sM49Nay','吴老师','12345678910','软件工程学院','xxx'),('74','$2b$10$UwtQJiNU/p2aYcNE17m5KODXThuEtbZFZ79lbUQNNzNjEf39o8vU.','增步有节容','18143881312','elit ea ipsum adipisicing nulla','s.chiittp@qq.com'),('90','$2b$10$YaJoyoDfHroXgSd4UOypheAOfKKKONpSvPGcNwZ0ucoxL/sM49Nay','叫矿边严','18145681888','id adipisicing incididunt cupidatat','xxx'),('99','$2b$10$YaJoyoDfHroXgSd4UOypheAOfKKKONpSvPGcNwZ0ucoxL/sM49Nay','南半油联信','18151694055','软件工程学院','xxx');
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teamactivity`
--

DROP TABLE IF EXISTS `teamactivity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teamactivity` (
  `activity_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `team_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `com_to_team` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `team_to_activity` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `admission_status` int DEFAULT NULL,
  `comment_status` int DEFAULT NULL,
  `com_to_team_time` datetime DEFAULT NULL,
  `team_to_activity_time` datetime DEFAULT NULL,
  PRIMARY KEY (`activity_id`,`team_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teamactivity`
--

LOCK TABLES `teamactivity` WRITE;
/*!40000 ALTER TABLE `teamactivity` DISABLE KEYS */;
/*!40000 ALTER TABLE `teamactivity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teammember`
--

DROP TABLE IF EXISTS `teammember`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teammember` (
  `id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `team_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tel` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `major` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `grade` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `pwd` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`,`team_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teammember`
--

LOCK TABLES `teammember` WRITE;
/*!40000 ALTER TABLE `teammember` DISABLE KEYS */;
INSERT INTO `teammember` VALUES ('001','kn5u6NuyUjMCzX9kFN4sSY',NULL,NULL,NULL,NULL,NULL,'$2b$10$S7H7VoumA1yYEM6X54Xdd.QLoJs2bx41nSm.JtSwKyAe4615GPuni'),('100','3h71YodfGKXVspCu8ofdbX','zzz','zz','软件工程学院','xxx','1','$2b$10$h5TnP7TgP/yGXgT/JOkPT.hkd4ckHLSjgsX6g7p0wSSQBphc/qnP2'),('101','3h71YodfGKXVspCu8ofdbX','xxx','xxx','人工智能学院','xxx','1','$2b$10$I9VKKgjTpxJ/NjvSiC9SaOYRtDY4EvJJUoy64iKvAaTKOeXeP5HI.'),('11111111','14xAmupuigw7B2DLhSsvmK',NULL,NULL,NULL,NULL,NULL,'$2b$10$2R6gIovfB6fMRqeBTUnL9uaSbx/wzlAdaCAa.gGNatIOGaJyCmRh.'),('123','m9Xw3QS8dLzH9JWqzeshWb',NULL,NULL,'人工智能学院',NULL,NULL,'$2b$10$wrYAfI2oEB0gUnosrU1n8.AjElMaLsDzSLEeAAC70tab5mNwAVkuK'),('123','mXAbFBRfKpJc8SwGFABF6S',NULL,NULL,'人工智能学院',NULL,NULL,'$2b$10$v//m/lJNCxcYfaI7o/MZleZlwiw9jkGFIVHlSIgFeJYKJuE6rWpYy'),('12345678','uFQNyrb2QVZYZCPSsJoGtp',NULL,NULL,NULL,NULL,NULL,'$2b$10$PZjvE99sYm1JoueoE3cDYutJbDanRtzWnom6BLfxrj9dBagh1u8/C'),('19','1','传由较周收快需','18119155591','软件工程学院','z.efxtgychkh@qq.com','1','$2b$10$z6po08b1NhlUajcofflyruyIwrYKZ6yxYID8Sorj7Xz/LF5EMIlEy'),('19','co6SEzku9yTvo8kQGH4639',NULL,NULL,'软件工程学院',NULL,NULL,'$2b$10$SuKaGUA84siRkYNg/RS2hujdO7pFS28gi8mhGQ4QchwEDCtdzcBWu'),('19','di6FUj5KZDn9VVe1J3wuSg',NULL,NULL,'软件工程学院',NULL,NULL,'$2b$10$wyNf4a/.F8MVbGJwmHVlF.0dLRJgGHlRIPPgb8GmgZX9fqoT33dp2'),('21311212','uRhpyNhbhmErje8Cg6sFnC','李璐娃','11011011011','软件工程学院','email@qq.com','2021','$2b$10$1z/880AxO3Mze.h0GsBrhePuulGavA5iiw9yEV6Zw80qlK9zHE/zS'),('21311537','uRhpyNhbhmErje8Cg6sFnC','欧荣荣','18566213988','人工智能学院','email@sysu.edu.cn','2021','$2b$10$3CiGnaWP9RMrQGpfS0iWC.yOqrgig7i9xZqUgQmNmWc8IvgAlNvJ2'),('222','ppNzFa61k1VcdvDWJTA978',NULL,NULL,'软件工程学院',NULL,NULL,'$2b$10$YaJoyoDfHroXgSd4UOypheAOfKKKONpSvPGcNwZ0ucoxL/sM49Nay'),('333','mFYVKtfiRnCVsxHk8atihj',NULL,NULL,'软件工程学院',NULL,NULL,'$2b$10$5ArdYPBHnac8Ij/WIV8XueHAfw2DJR1ApDC8Y6to0I9WmIP/.Xowa'),('34','1','哈哈哈','122','人工智能学院','xxxx@qq.com','1','$2b$10$z6po08b1NhlUajcofflyruyIwrYKZ6yxYID8Sorj7Xz/LF5EMIlEy'),('35','77','哈哈哈','122','土木工程学院','xxxx@qq.com','1','$2b$10$z6po08b1NhlUajcofflyruyIwrYKZ6yxYID8Sorj7Xz/LF5EMIlEy'),('36','77','哈哈哈','122','测绘学院','xxxx@qq.com','1','$2b$10$z6po08b1NhlUajcofflyruyIwrYKZ6yxYID8Sorj7Xz/LF5EMIlEy'),('37','77','哈哈哈','122','微电子学院','xxxx@qq.com','1','$2b$10$z6po08b1NhlUajcofflyruyIwrYKZ6yxYID8Sorj7Xz/LF5EMIlEy'),('38','77','哈哈哈','122','国金学院','xxxx@qq.com','1','$2b$10$z6po08b1NhlUajcofflyruyIwrYKZ6yxYID8Sorj7Xz/LF5EMIlEy'),('39','77','哈哈哈','122','旅游学院','xxxx@qq.com','1','$2b$10$z6po08b1NhlUajcofflyruyIwrYKZ6yxYID8Sorj7Xz/LF5EMIlEy'),('40','77','哈哈哈','122','软件工程学院','xxxx@qq.com','1','$2b$10$z6po08b1NhlUajcofflyruyIwrYKZ6yxYID8Sorj7Xz/LF5EMIlEy'),('444','6sXrGz6VWKAm46Jz2g3Gxs','物群党','18629906201','ut','o.vepqkm@qq.com','nisi sit','$2b$10$lmS0riQrsaxhYesNApYZue1wPdXbkGa4HLJIFggfvD07qnL6t0bam'),('444','c9hTNzGax42f9wQqgNGX6x',NULL,NULL,'土木工程学院',NULL,NULL,'$2b$10$BAUefwWU82j9/UAVXpbNpePbQd4AnjT1bc8GmgG7kVfTAhN093rta'),('58','35','受列处海压','18170584481','nisi non','y.uydstuw@qq.com','2021','$2b$10$cmmZ4S.rMNbablJ.EMVoAOZ2kO7KnOQI9f1LYtIBB0FtHDVN4A6Ay'),('58','6sXrGz6VWKAm46Jz2g3Gxs','受列处海压','18170584481','nisi non','y.uydstuw@qq.com','2021','$2b$10$zdAhd/3fuBzoFFCchEeMe.gAsgP/jc.S//TBE5BvlQ.uwfqszax0e'),('87654321','fk6ZL5iFFrP7Vh5PGMLwKu',NULL,NULL,NULL,NULL,NULL,'$2b$10$9Zzg6604o9NnvQyXCcdUBu1ywHcQmi6hM1Ioz4v6DlyQ9mNRzxkbu');
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

-- Dump completed on 2024-05-25 11:02:26
