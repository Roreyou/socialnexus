/*
 Navicat Premium Data Transfer

 Source Server         : greyjoey
 Source Server Type    : MySQL
 Source Server Version : 50740
 Source Host           : localhost:3306
 Source Schema         : bycsql

 Target Server Type    : MySQL
 Target Server Version : 50740
 File Encoding         : 65001

 Date: 26/05/2024 18:33:56
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for activity
-- ----------------------------
DROP TABLE IF EXISTS `activity`;
CREATE TABLE `activity`  (
  `id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `setup_date` date NULL DEFAULT NULL,
  `application_deadline` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `start_time` datetime NULL DEFAULT NULL,
  `end_time` datetime NULL DEFAULT NULL,
  `vacancies` int(11) NULL DEFAULT NULL,
  `province` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `city` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `category_id` int(11) NULL DEFAULT NULL,
  `community_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `keywords_id` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `verification_status` int(11) NULL DEFAULT NULL,
  `activity_status` int(11) NULL DEFAULT NULL,
  `picture` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `QRCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of activity
-- ----------------------------
INSERT INTO `activity` VALUES ('1', '青少年实践中心志愿活动', '2003-11-07', '2000-09-02', '2024-03-08 06:28:02', '2024-11-24 12:14:19', 25, '广东省', '珠海市', '中山大学附属中学', 1, '1', '外现展话毛命日位看合始解真什目圆。个入单级被头算界求商快受半话被就温。给收问及度选务而没组复线什将门更二展。', '1,3', 2, 1, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/cfc0aa9e-138a-41ea-a9c6-733b59dc38ab.jpg', 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/16c106c3-907a-4bfb-9520-95451d18da3a.jpg');
INSERT INTO `activity` VALUES ('10', '运动会', '2002-09-21', '2002-09-27', '2023-06-15 09:30:45', '2024-06-16 09:30:45', 20, '浙江省', '嘉兴市', '南湖区博物馆', 2, '100', '1', '2', 3, 3, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/bb1f2ab1-7104-44c1-a1ce-3f7ced2bcb91.png', NULL);
INSERT INTO `activity` VALUES ('11', '西藏支教', '2002-09-21', '2002-09-27', '2023-06-15 09:30:45', '2024-06-16 09:30:45', 20, '浙江省', '嘉兴市', '香洲区江南摩尔广场', 3, '100', '1', '2', 2, 3, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/cfc0aa9e-138a-41ea-a9c6-733b59dc38ab.jpg', NULL);
INSERT INTO `activity` VALUES ('2', '关爱老人活动', '2002-09-21', '2002-09-29', '2023-06-15 09:30:45', '2024-06-18 09:30:45', 20, '广东省', '珠海市', '中山大学老人院', 2, '1', '1', '1,3', 3, 1, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/bb1f2ab1-7104-44c1-a1ce-3f7ced2bcb91.png', 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/e3bdeef4-5285-4bd0-8c8c-f88598584851.png');
INSERT INTO `activity` VALUES ('21', '九种难等', '2009-09-05', '1985-12-07', '2001-02-09 12:44:37', '2023-04-27 08:56:57', 25, '湖北省', '塔城地区', '望江县', 57, '为给结', '工土局厂段两议此存格张复元进领。过除难导亲少又对石山看革矿并速花。专反容区此号打安还能程律边光。经史号展联时其张带必律除程现果住北料。你海列来图中思济明金战个消积许们。张青养叫响属军高别须人感。', '', 1, 1, 'http://dummyimage.com/120x90', NULL);
INSERT INTO `activity` VALUES ('3', '社区大扫除活动', '2002-09-21', '2002-09-28', '2024-06-15 09:30:45', '2024-06-16 09:30:45', 20, '广东省', '珠海市', '鸡山社区', 3, '1', '1', '1', 2, 2, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/4adc3b25-7872-48de-9778-bb3c70c7c3b0.jpg', NULL);
INSERT INTO `activity` VALUES ('4', '献血活动', '2002-09-21', '2002-09-27', '2023-06-15 09:30:45', '2024-06-16 09:30:45', 20, '湖南省', '长沙市', '长沙南站', 3, '1', '1', '2', 2, 2, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/bb1f2ab1-7104-44c1-a1ce-3f7ced2bcb91.png', NULL);
INSERT INTO `activity` VALUES ('5', '中山大学附属医院眼科义务医治', '2002-09-21', '2002-09-27', '2023-06-15 09:30:45', '2024-06-16 09:30:45', 20, '广东省', '中山市', '中山公园', 1, '1', '1', '2', 2, 3, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/0fde1cb7-85ed-47c3-bf4f-06dbc1bda72d.jpg', NULL);
INSERT INTO `activity` VALUES ('6', '艾滋病科普宣传活动', '2002-09-21', '2002-09-27', '2023-06-15 09:30:45', '2024-06-16 09:30:45', 20, '广东省', '广州市', '大学城', 1, '1', '1', '2', 2, 3, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/bb1f2ab1-7104-44c1-a1ce-3f7ced2bcb91.png', NULL);
INSERT INTO `activity` VALUES ('7', '消防知识宣教', '2002-09-21', '2002-09-27', '2023-06-15 09:30:45', '2024-06-16 09:30:45', 20, '黑龙江省', '双鸭山市', '森林公园', 1, '100', '1', '2', 2, 3, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/c9d66109-ba16-446c-913f-ab8f73934e06.png', NULL);
INSERT INTO `activity` VALUES ('7hBDPrDPXvoybuSrCZexSr', '123', '2024-05-25', '2014-01-01 00:00:00', NULL, NULL, 5, '广东省', '广州市', '新港西路', 1, '1', '123456', '1', 1, 1, '', NULL);
INSERT INTO `activity` VALUES ('8', '图书馆志愿服务', '2002-09-21', '2002-09-27', '2024-06-15 09:30:45', '2024-06-16 09:30:45', 20, '广东省', '中山市', '中山图书馆图书馆', 2, '100', '1', '2', 2, 3, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/bb1f2ab1-7104-44c1-a1ce-3f7ced2bcb91.png', NULL);
INSERT INTO `activity` VALUES ('9', '中山支教', '2002-09-21', '2002-09-27', '2023-06-15 09:30:45', '2024-06-16 09:30:45', 20, '广东省', '中山市', '三乡镇平南村三鑫学校', 2, '100', '1', '2', 3, 3, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/bb1f2ab1-7104-44c1-a1ce-3f7ced2bcb91.png', NULL);
INSERT INTO `activity` VALUES ('qQ8pFGJ5n3KRohgFA3bF3F', '123', '2024-05-25', '2014-01-01 00:00:00', '2014-01-31 16:00:00', '2014-02-28 16:00:00', 5, '广东省', '广州市', '新港西路', 3, '1', '123345', '', 1, 1, '', NULL);
INSERT INTO `activity` VALUES ('rfKG8Ko9dtwgrvTFKDjkDz', '123', '2024-05-25', '2024-06-01 00:00:00', NULL, NULL, 5, '广东省', '广州市', '新港西路', NULL, '1', '123456', '1', 1, 1, '', NULL);
INSERT INTO `activity` VALUES ('rSi5YkrLTAGDL1XWJz1ha4', '月完信增', '2024-05-25', '1970-07-18', '1978-09-19 01:43:16', '2008-02-03 15:26:15', 25, '澳门特别行政区', '防城港市', '海原县', 96, '车府性林', '上路道想元许段局进子高术公标。制得布号义究公低深海部京利传后求标。体得非清拉外不非完其教织近收传。以我划因老无离存土后同百保习。', '', 1, 1, 'http://dummyimage.com/728x90', NULL);
INSERT INTO `activity` VALUES ('uCw8orQaYjziHr5ecNTSRn', '1234', '2024-05-25', '2015-01-01 00:00:00', '2015-01-31 16:00:00', '2015-02-28 16:00:00', 3, '广东省', '广州市', '琶洲', 1, '1', '123455', '1,3', 1, 1, '', NULL);

-- ----------------------------
-- Table structure for activity_type
-- ----------------------------
DROP TABLE IF EXISTS `activity_type`;
CREATE TABLE `activity_type`  (
  `id` int(11) NOT NULL,
  `type_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of activity_type
-- ----------------------------
INSERT INTO `activity_type` VALUES (1, '社区经济发展');
INSERT INTO `activity_type` VALUES (2, '社区团建工作');
INSERT INTO `activity_type` VALUES (3, '社区社会调查');
INSERT INTO `activity_type` VALUES (4, '社区文体活动');
INSERT INTO `activity_type` VALUES (5, '社区教育服务');
INSERT INTO `activity_type` VALUES (6, '社区环境治理');
INSERT INTO `activity_type` VALUES (7, '其它');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `post_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `time` datetime NULL DEFAULT NULL,
  `like` int(11) NULL DEFAULT NULL,
  `ifread` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (17, 'uRhpyNhbhmErje8Cg6sFnC', '95', '你好', '2024-05-24 05:35:54', 0, 0);
INSERT INTO `comment` VALUES (18, 'uFQNyrb2QVZYZCPSsJoGtp', '97', 'over！', '2024-05-24 07:07:02', 2, 0);
INSERT INTO `comment` VALUES (19, 'uRhpyNhbhmErje8Cg6sFnC', '97', 'ory手机测试1评论', '2024-05-24 07:31:53', 1, 0);

-- ----------------------------
-- Table structure for community
-- ----------------------------
DROP TABLE IF EXISTS `community`;
CREATE TABLE `community`  (
  `id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `tel` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `province` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `city` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `setup_date` date NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `pwd` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of community
-- ----------------------------
INSERT INTO `community` VALUES ('1', '隆昌县基层', '18152353268', '宁夏回族自治区', '东营市', '海外毕节市阿坝县', 'ullamco eu magna est', '2022-04-21', 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', '$2b$10$bjUx/Qfx9FUey65BIE81l.7cWe9PEqp1fWjQaB1UDaIiHqPf4BK2m');
INSERT INTO `community` VALUES ('100', '先进社区', '18133334146', '陕西省', '咸阳市', '咸阳的某个山卡拉', 'velit tempor sint', '1983-01-24', 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', '$2b$10$RfsWN.aofrgaRN6rgpEL3.7Qe/sHuY38Yw4cTIBkI68Kbi3rOB4d.');
INSERT INTO `community` VALUES ('101', '天坛路社区基层工会', '18133334146', '湖北省', '武汉市', '长延保商圈', 'velit tempor sint', '1983-01-24', 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', '$2b$10$RfsWN.aofrgaRN6rgpEL3.7Qe/sHuY38Yw4cTIBkI68Kbi3rOB4d.');
INSERT INTO `community` VALUES ('120', '紫水社区基层综合性文化服务中心', '18652198388', '甘肃省', '兰州市', '灞桥区', 'amet eiusmod et id', '1978-08-27', 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', '$2b$10$RfsWN.aofrgaRN6rgpEL3.7Qe/sHuY38Yw4cTIBkI68Kbi3rOB4d.');
INSERT INTO `community` VALUES ('121', '辛口存基层综合性文化服务中心', '18652198388', '甘肃省', '兰州市', '衢州市阿拉善右旗', 'amet eiusmod et id', '1978-08-27', 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', '$2b$10$RfsWN.aofrgaRN6rgpEL3.7Qe/sHuY38Yw4cTIBkI68Kbi3rOB4d.');
INSERT INTO `community` VALUES ('122', '政查角办', '18652198388', '甘肃省', '北京市', '宁夏回族自治区衢州市阿拉善右旗', 'amet eiusmod et id', '1978-08-27', 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', '$2b$10$RfsWN.aofrgaRN6rgpEL3.7Qe/sHuY38Yw4cTIBkI68Kbi3rOB4d.');
INSERT INTO `community` VALUES ('123', '政查角办', '18652198388', '甘肃省', '北京市', '宁夏回族自治区衢州市阿拉善右旗', 'amet eiusmod et id', '1978-08-27', 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', '$2b$10$RfsWN.aofrgaRN6rgpEL3.7Qe/sHuY38Yw4cTIBkI68Kbi3rOB4d.');
INSERT INTO `community` VALUES ('59', '边角什高级阶', '18685647773', '江苏省', '宜春市', '广西壮族自治区六盘水市-', 'exercitation', '2011-01-27', 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', '$2b$10$5njSSsUw.mJh87ArdNOKT.ZEpaOvIrBuEUsdj9mntU5CCN3kELoLa');
INSERT INTO `community` VALUES ('666', '666', '666', '湖北省', '武汉市', '666', '666', '2024-05-21', 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', '$2b$10$RfsWN.aofrgaRN6rgpEL3.7Qe/sHuY38Yw4cTIBkI68Kbi3rOB4d.');
INSERT INTO `community` VALUES ('99', '共十治', '18133334146', '湖北省', '咸阳市', '广西壮族自治区泉州市深水埗区', 'velit tempor sint', '1983-01-24', 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', '$2b$10$RfsWN.aofrgaRN6rgpEL3.7Qe/sHuY38Yw4cTIBkI68Kbi3rOB4d.');
INSERT INTO `community` VALUES ('999', '999', '999', '湖北省', '武汉市', '999', '999', '2024-05-22', 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', '$2b$10$RfsWN.aofrgaRN6rgpEL3.7Qe/sHuY38Yw4cTIBkI68Kbi3rOB4d.');

-- ----------------------------
-- Table structure for datawall_act
-- ----------------------------
DROP TABLE IF EXISTS `datawall_act`;
CREATE TABLE `datawall_act`  (
  `id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `activity_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `team_num` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`activity_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of datawall_act
-- ----------------------------

-- ----------------------------
-- Table structure for datawall_com
-- ----------------------------
DROP TABLE IF EXISTS `datawall_com`;
CREATE TABLE `datawall_com`  (
  `id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `community_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `activity_num` int(11) NULL DEFAULT NULL,
  `team_num` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`community_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of datawall_com
-- ----------------------------

-- ----------------------------
-- Table structure for favorate
-- ----------------------------
DROP TABLE IF EXISTS `favorate`;
CREATE TABLE `favorate`  (
  `team_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `activity_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`team_id`, `activity_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of favorate
-- ----------------------------

-- ----------------------------
-- Table structure for key_words
-- ----------------------------
DROP TABLE IF EXISTS `key_words`;
CREATE TABLE `key_words`  (
  `id` int(11) NOT NULL,
  `key_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of key_words
-- ----------------------------
INSERT INTO `key_words` VALUES (1, '教育');
INSERT INTO `key_words` VALUES (2, '助老');
INSERT INTO `key_words` VALUES (3, '劳动');

-- ----------------------------
-- Table structure for likecomment
-- ----------------------------
DROP TABLE IF EXISTS `likecomment`;
CREATE TABLE `likecomment`  (
  `comment_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `team_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ifread` int(11) NULL DEFAULT NULL,
  `liketime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`comment_id`, `team_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of likecomment
-- ----------------------------
INSERT INTO `likecomment` VALUES ('18', 'uFQNyrb2QVZYZCPSsJoGtp', 0, '2024-05-24 13:32:39');
INSERT INTO `likecomment` VALUES ('18', 'uRhpyNhbhmErje8Cg6sFnC', 0, '2024-05-24 08:05:58');
INSERT INTO `likecomment` VALUES ('19', 'uRhpyNhbhmErje8Cg6sFnC', 0, '2024-05-24 07:52:28');

-- ----------------------------
-- Table structure for likepost
-- ----------------------------
DROP TABLE IF EXISTS `likepost`;
CREATE TABLE `likepost`  (
  `post_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `team_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ifread` int(11) NULL DEFAULT NULL,
  `liketime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`post_id`, `team_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of likepost
-- ----------------------------
INSERT INTO `likepost` VALUES ('95', 'uFQNyrb2QVZYZCPSsJoGtp', 0, '2024-05-24 13:40:42');
INSERT INTO `likepost` VALUES ('97', 'uFQNyrb2QVZYZCPSsJoGtp', 0, '2024-05-24 13:40:21');
INSERT INTO `likepost` VALUES ('97', 'uRhpyNhbhmErje8Cg6sFnC', 0, '2024-05-24 07:53:14');

-- ----------------------------
-- Table structure for likereply
-- ----------------------------
DROP TABLE IF EXISTS `likereply`;
CREATE TABLE `likereply`  (
  `reply_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `team_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ifread` int(11) NULL DEFAULT NULL,
  `liketime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`reply_id`, `team_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of likereply
-- ----------------------------

-- ----------------------------
-- Table structure for modify_teacher
-- ----------------------------
DROP TABLE IF EXISTS `modify_teacher`;
CREATE TABLE `modify_teacher`  (
  `id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `team_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `tel` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `major` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `modified_status` int(11) NULL DEFAULT NULL,
  `modified_time` datetime NULL DEFAULT NULL,
  `modified_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of modify_teacher
-- ----------------------------
INSERT INTO `modify_teacher` VALUES ('19922365', 'uRhpyNhbhmErje8Cg6sFnC', '林柱良1', '18566663333', '软件工程学院', 'lzl@qq.com', 2, '2024-05-26 11:18:43', '111');
INSERT INTO `modify_teacher` VALUES ('74', 'uFQNyrb2QVZYZCPSsJoGtp', '林助理2', '18622644795', 'in ea esse', 'n.yod@qq.com', 3, '2024-05-15 11:19:09', '222');

-- ----------------------------
-- Table structure for modify_teammember
-- ----------------------------
DROP TABLE IF EXISTS `modify_teammember`;
CREATE TABLE `modify_teammember`  (
  `id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `team_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `tel` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `major` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `grade` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `modified_status` int(11) NULL DEFAULT NULL,
  `modified_time` datetime NULL DEFAULT NULL,
  `modified_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `team_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of modify_teammember
-- ----------------------------
INSERT INTO `modify_teammember` VALUES ('21311212', 'uRhpyNhbhmErje8Cg6sFnC', '李璐娃', '11011011011', '软件工程学院', 'email@qq.com', '2021', 2, '2024-05-26 11:18:43', '111');
INSERT INTO `modify_teammember` VALUES ('21311261', 'uRhpyNhbhmErje8Cg6sFnC', '陈卓敏', '12345678', '软件工程学院', 'email4@qq.com', '2021', 2, '2024-05-26 11:18:43', '111');
INSERT INTO `modify_teammember` VALUES ('21311499', 'uRhpyNhbhmErje8Cg6sFnC', '包原畅', '12345678', '软件工程学院', 'email3@qq.com', '2021', 2, '2024-05-26 11:18:43', '111');
INSERT INTO `modify_teammember` VALUES ('21311537', 'uRhpyNhbhmErje8Cg6sFnC', '欧荣荣', '18566213988', '人工智能学院', 'email@sysu.edu.cn', '2021', 2, '2024-05-26 11:18:43', '111');
INSERT INTO `modify_teammember` VALUES ('33', 'uFQNyrb2QVZYZCPSsJoGtp', '更写酸', '18125354361', 'cupidatat', 'c.ynqv@qq.com', 'ut ipsum in laboris', 3, '2024-05-15 06:18:47', '222');

-- ----------------------------
-- Table structure for notification
-- ----------------------------
DROP TABLE IF EXISTS `notification`;
CREATE TABLE `notification`  (
  `team_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `post_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `num` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`team_id`, `post_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of notification
-- ----------------------------
INSERT INTO `notification` VALUES ('uRhpyNhbhmErje8Cg6sFnC', '95', 0);
INSERT INTO `notification` VALUES ('uRhpyNhbhmErje8Cg6sFnC', '97', 0);

-- ----------------------------
-- Table structure for post
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `title` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `star` int(11) NULL DEFAULT NULL,
  `picture` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `start_date` date NULL DEFAULT NULL,
  `end_date` date NULL DEFAULT NULL,
  `province` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `city` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `post_time` datetime NULL DEFAULT NULL,
  `like` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 99 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of post
-- ----------------------------
INSERT INTO `post` VALUES (95, 'uRhpyNhbhmErje8Cg6sFnC', NULL, 'apifox测试', NULL, 'http://dummyimage.com/400x400', '1998-11-28', '2009-09-19', '江苏省', '海口市', '吉林省巴中市固始县', '2024-05-24 05:35:17', 1);
INSERT INTO `post` VALUES (97, 'uRhpyNhbhmErje8Cg6sFnC', NULL, '结束三天开心的活动', NULL, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/9ae1664d-ff89-4784-8d99-55d09c1f4169.jpg', NULL, NULL, '广东省', '珠海市', NULL, '2024-05-24 07:05:25', 2);
INSERT INTO `post` VALUES (98, 'uFQNyrb2QVZYZCPSsJoGtp', NULL, '我怎么又在调试接口', NULL, 'http://dummyimage.com/250x250', '1976-10-21', '2007-09-05', '云南省', '临沂市', '西藏自治区锡林郭勒盟文登市', '2024-05-24 13:49:07', 0);

-- ----------------------------
-- Table structure for reply
-- ----------------------------
DROP TABLE IF EXISTS `reply`;
CREATE TABLE `reply`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `reply_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `time` datetime NULL DEFAULT NULL,
  `like` int(11) NULL DEFAULT NULL,
  `ifread` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of reply
-- ----------------------------
INSERT INTO `reply` VALUES (17, '17', 'uRhpyNhbhmErje8Cg6sFnC', '回复我的评论', '2024-05-24 05:36:18', 0, 0);

-- ----------------------------
-- Table structure for school
-- ----------------------------
DROP TABLE IF EXISTS `school`;
CREATE TABLE `school`  (
  `id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `pwd` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `manager` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `setup_date` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `tel` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `province` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `city` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of school
-- ----------------------------
INSERT INTO `school` VALUES ('1', '111', '中山大学', '11', '11', '11', '11', '11', '11');
INSERT INTO `school` VALUES ('32', '$2b$10$UgPGRWcGduKzpdAWNPxXkO6psiFEoD.rWKPSfZVrg7LhfkB5JFe7W', '中山大学', NULL, '2009-03-14 21:19:12', NULL, NULL, NULL, NULL);
INSERT INTO `school` VALUES ('sysu', '$2b$10$edLzvFzIVkRCBv9vg.YfYu38YCn.2qjYVqfmabuRt3WHgKAE/bQ/G', '中山大学', NULL, '2009-03-14 21:19:12', NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for schoolteam
-- ----------------------------
DROP TABLE IF EXISTS `schoolteam`;
CREATE TABLE `schoolteam`  (
  `id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `pwd` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `team_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `school_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `setup_date` date NULL DEFAULT NULL,
  `remark` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `leader_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `instructor_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `relevant_faculties` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `comment_status` int(11) NULL DEFAULT NULL,
  `verification_status` int(11) NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `modification_status` int(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of schoolteam
-- ----------------------------
INSERT INTO `schoolteam` VALUES ('14xAmupuigw7B2DLhSsvmK', NULL, '玛卡巴卡西部建设队', '1', '2024-05-23', 'xxxx', '11111111', NULL, NULL, NULL, 1, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/3607faf5-35e6-495f-b81a-c046b425f02e.png', NULL);
INSERT INTO `schoolteam` VALUES ('3h71YodfGKXVspCu8ofdbX', '$2b$10$JxTJq6OZ/PDmq4NmVbfI7u7ByUMFQz5Q1vMIBdPvfPdJjr4H9T2ea', '长命技花立1', '1', NULL, 'irure est proident reprehenderit', '100', '99', NULL, NULL, 4, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', NULL);
INSERT INTO `schoolteam` VALUES ('53MNdzw43VLp12ghgTXJFA', '$2b$10$pRJvg1SEMCK0vb/.XnLUgu1Xf7ClB4hrgPw/T6FeS3oe.Pwdz7BXa', '长命技花立', '1', NULL, 'irure est proident reprehenderit', '100', '99', NULL, NULL, 4, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', NULL);
INSERT INTO `schoolteam` VALUES ('6sXrGz6VWKAm46Jz2g3Gxs', NULL, '4441', '1', '2024-05-21', '444', '444', '15', 'labore, ut, nisi non', NULL, 4, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', NULL);
INSERT INTO `schoolteam` VALUES ('c9hTNzGax42f9wQqgNGX6x', NULL, '4442', '1', '2024-05-21', '444', '444', NULL, NULL, NULL, 4, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', NULL);
INSERT INTO `schoolteam` VALUES ('co6SEzku9yTvo8kQGH4639', NULL, '没备称细接时决2', '1', NULL, 'Lorem in', '19', '99', NULL, NULL, 4, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', NULL);
INSERT INTO `schoolteam` VALUES ('di6FUj5KZDn9VVe1J3wuSg', NULL, '人来要满', '1', NULL, 'ad id ut', '19', '99', NULL, NULL, 4, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', NULL);
INSERT INTO `schoolteam` VALUES ('fk6ZL5iFFrP7Vh5PGMLwKu', NULL, '铁道游击队', '1', '2024-05-23', 'xxxxxxxx', '87654321', NULL, NULL, NULL, 1, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/78646eed-e566-4ecb-9d61-eea83cbb4edb.png', NULL);
INSERT INTO `schoolteam` VALUES ('iGafV26sXoPPjyWfaJDpGC', '$2b$10$x7HRXNAxeq9EnmlNzFGT5.mm5UK1cIPiAzzdxXTlxq1iPL8cOZfC2', '长命技花立2', '1', NULL, 'irure est proident reprehenderit', '100', '99', NULL, NULL, 4, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', NULL);
INSERT INTO `schoolteam` VALUES ('kn5u6NuyUjMCzX9kFN4sSY', NULL, '001', '1', '2024-05-22', '001', '001', NULL, NULL, NULL, 1, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/d98f2db4-74cf-44fb-80ac-5de45af0d2ab.jpg', NULL);
INSERT INTO `schoolteam` VALUES ('m9Xw3QS8dLzH9JWqzeshWb', NULL, '123的另外一支队伍', '1', '2024-05-21', '无', '123', '99', NULL, NULL, 4, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', NULL);
INSERT INTO `schoolteam` VALUES ('mFYVKtfiRnCVsxHk8atihj', NULL, '333', '1', '2024-05-21', '333', '333', NULL, NULL, NULL, 4, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', NULL);
INSERT INTO `schoolteam` VALUES ('mGe2aDDj7ZsbJbHkdpbkw2', '$2b$10$YJ27oejH3PrTWmR/5t7vU.cSx/CB4C77JlfJiwwZq2Csu455oBdsS', '没备称细接时决1', '1', NULL, 'Lorem in', '19', '99', NULL, NULL, 4, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', NULL);
INSERT INTO `schoolteam` VALUES ('mXAbFBRfKpJc8SwGFABF6S', NULL, '测试队伍2', '1', '2024-05-21', '无', '123', '99', NULL, NULL, 4, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', NULL);
INSERT INTO `schoolteam` VALUES ('ppNzFa61k1VcdvDWJTA978', NULL, '222', '1', '2024-05-21', '222', '222', '99', NULL, NULL, 4, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', NULL);
INSERT INTO `schoolteam` VALUES ('uFQNyrb2QVZYZCPSsJoGtp', NULL, '汪汪立大功队', '1', '2024-05-23', 'xxxx', '21311537', '99', NULL, NULL, 1, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/9bc7dc06-5460-453d-bbf6-f6295aba3457.png', NULL);
INSERT INTO `schoolteam` VALUES ('uRhpyNhbhmErje8Cg6sFnC', NULL, '中珠施工队', '1', '2024-05-22', 'xxxx', '21311212', '19922365', '软件工程学院, 人工智能学院', NULL, 2, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/c77675ec-5c6c-47a7-9e4b-a36ed3ffce09.jpg', NULL);

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher`  (
  `id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `pwd` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `tel` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `major` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('111', NULL, '111', '111', '111', NULL);
INSERT INTO `teacher` VALUES ('15', '$2b$10$m9Y8AsS65pDErgfFqvSBIur5XnaY7pLocwXh1hED.8V6jDNHjjWRi', '难认机情', '13671594365', 'labore', 'u.lhtgib@qq.com');
INSERT INTO `teacher` VALUES ('19922365', '$2b$10$Euor2v51xyY/7SNRpo.5tO6JY9Kq11B6EmfrmijzeRR8sZ62wz5JS', '林柱良1', '18566663333', '软件工程学院', 'lzl@qq.com');
INSERT INTO `teacher` VALUES ('2', '$2b$10$7XoWx9IUqvZz1nwSfm6P3ez50Tz8HiwbRXinIf/dzhfN4fI3lsiXq', '步却布她', '18651613347', 'adipisicing', 'l.mcjmt@qq.com');
INSERT INTO `teacher` VALUES ('45263987', '$2b$10$NM0pRZsiyraYfW75PvWcbeGts9wPszg9US11O98OMyPWU9LEakXiu', '林柱良', '13822088566', '软件工程学院', 'email@qq.com');
INSERT INTO `teacher` VALUES ('53', '$2b$10$YaJoyoDfHroXgSd4UOypheAOfKKKONpSvPGcNwZ0ucoxL/sM49Nay', '吴老师', '12345678910', '软件工程学院', 'xxx');
INSERT INTO `teacher` VALUES ('74', '$2b$10$UwtQJiNU/p2aYcNE17m5KODXThuEtbZFZ79lbUQNNzNjEf39o8vU.', '增步有节容', '18143881312', 'elit ea ipsum adipisicing nulla', 's.chiittp@qq.com');
INSERT INTO `teacher` VALUES ('90', '$2b$10$YaJoyoDfHroXgSd4UOypheAOfKKKONpSvPGcNwZ0ucoxL/sM49Nay', '叫矿边严', '18145681888', 'id adipisicing incididunt cupidatat', 'xxx');
INSERT INTO `teacher` VALUES ('99', '$2b$10$YaJoyoDfHroXgSd4UOypheAOfKKKONpSvPGcNwZ0ucoxL/sM49Nay', '南半油联信', '18151694055', '软件工程学院', 'xxx');

-- ----------------------------
-- Table structure for teamactivity
-- ----------------------------
DROP TABLE IF EXISTS `teamactivity`;
CREATE TABLE `teamactivity`  (
  `activity_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `team_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `com_to_team` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `team_to_activity` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `admission_status` int(11) NULL DEFAULT NULL,
  `comment_status` int(11) NULL DEFAULT NULL,
  `com_to_team_time` datetime NULL DEFAULT NULL,
  `team_to_activity_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`activity_id`, `team_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of teamactivity
-- ----------------------------
INSERT INTO `teamactivity` VALUES ('3', 'uRhpyNhbhmErje8Cg6sFnC', '123', '', 2, 2, '2024-05-25 09:19:13', NULL);
INSERT INTO `teamactivity` VALUES ('4', 'uFQNyrb2QVZYZCPSsJoGtp', NULL, NULL, 2, 2, NULL, NULL);
INSERT INTO `teamactivity` VALUES ('5', 'uFQNyrb2QVZYZCPSsJoGtp', NULL, NULL, 3, 1, NULL, NULL);
INSERT INTO `teamactivity` VALUES ('6', 'mXAbFBRfKpJc8SwGFABF6S', '111', NULL, 2, 1, NULL, NULL);

-- ----------------------------
-- Table structure for teammember
-- ----------------------------
DROP TABLE IF EXISTS `teammember`;
CREATE TABLE `teammember`  (
  `id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `team_id` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `tel` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `major` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `grade` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `pwd` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `team_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of teammember
-- ----------------------------
INSERT INTO `teammember` VALUES ('001', 'kn5u6NuyUjMCzX9kFN4sSY', NULL, NULL, NULL, NULL, NULL, '$2b$10$S7H7VoumA1yYEM6X54Xdd.QLoJs2bx41nSm.JtSwKyAe4615GPuni');
INSERT INTO `teammember` VALUES ('100', '3h71YodfGKXVspCu8ofdbX', 'zzz', 'zz', '软件工程学院', 'xxx', '1', '$2b$10$h5TnP7TgP/yGXgT/JOkPT.hkd4ckHLSjgsX6g7p0wSSQBphc/qnP2');
INSERT INTO `teammember` VALUES ('101', '3h71YodfGKXVspCu8ofdbX', 'xxx', 'xxx', '人工智能学院', 'xxx', '1', '$2b$10$I9VKKgjTpxJ/NjvSiC9SaOYRtDY4EvJJUoy64iKvAaTKOeXeP5HI.');
INSERT INTO `teammember` VALUES ('11111111', '14xAmupuigw7B2DLhSsvmK', NULL, NULL, NULL, NULL, NULL, '$2b$10$2R6gIovfB6fMRqeBTUnL9uaSbx/wzlAdaCAa.gGNatIOGaJyCmRh.');
INSERT INTO `teammember` VALUES ('123', 'm9Xw3QS8dLzH9JWqzeshWb', NULL, NULL, '人工智能学院', NULL, NULL, '$2b$10$wrYAfI2oEB0gUnosrU1n8.AjElMaLsDzSLEeAAC70tab5mNwAVkuK');
INSERT INTO `teammember` VALUES ('123', 'mXAbFBRfKpJc8SwGFABF6S', NULL, NULL, '人工智能学院', NULL, NULL, '$2b$10$v//m/lJNCxcYfaI7o/MZleZlwiw9jkGFIVHlSIgFeJYKJuE6rWpYy');
INSERT INTO `teammember` VALUES ('12345678', 'uFQNyrb2QVZYZCPSsJoGtp', NULL, NULL, NULL, NULL, NULL, '$2b$10$PZjvE99sYm1JoueoE3cDYutJbDanRtzWnom6BLfxrj9dBagh1u8/C');
INSERT INTO `teammember` VALUES ('19', '1', '传由较周收快需', '18119155591', '软件工程学院', 'z.efxtgychkh@qq.com', '1', '$2b$10$z6po08b1NhlUajcofflyruyIwrYKZ6yxYID8Sorj7Xz/LF5EMIlEy');
INSERT INTO `teammember` VALUES ('19', 'co6SEzku9yTvo8kQGH4639', NULL, NULL, '软件工程学院', NULL, NULL, '$2b$10$SuKaGUA84siRkYNg/RS2hujdO7pFS28gi8mhGQ4QchwEDCtdzcBWu');
INSERT INTO `teammember` VALUES ('19', 'di6FUj5KZDn9VVe1J3wuSg', NULL, NULL, '软件工程学院', NULL, NULL, '$2b$10$wyNf4a/.F8MVbGJwmHVlF.0dLRJgGHlRIPPgb8GmgZX9fqoT33dp2');
INSERT INTO `teammember` VALUES ('21311212', 'uRhpyNhbhmErje8Cg6sFnC', '李璐娃', '11011011011', '软件工程学院', 'email@qq.com', '2021', '$2b$10$1z/880AxO3Mze.h0GsBrhePuulGavA5iiw9yEV6Zw80qlK9zHE/zS');
INSERT INTO `teammember` VALUES ('21311261', 'uRhpyNhbhmErje8Cg6sFnC', '陈卓敏', '12345678', '软件工程学院', 'email4@qq.com', '2021', NULL);
INSERT INTO `teammember` VALUES ('21311499', 'uRhpyNhbhmErje8Cg6sFnC', '包原畅', '12345678', '软件工程学院', 'email3@qq.com', '2021', NULL);
INSERT INTO `teammember` VALUES ('21311537', 'uRhpyNhbhmErje8Cg6sFnC', '欧荣荣', '18566213988', '人工智能学院', 'email@sysu.edu.cn', '2021', '$2b$10$3CiGnaWP9RMrQGpfS0iWC.yOqrgig7i9xZqUgQmNmWc8IvgAlNvJ2');
INSERT INTO `teammember` VALUES ('222', 'ppNzFa61k1VcdvDWJTA978', NULL, NULL, '软件工程学院', NULL, NULL, '$2b$10$YaJoyoDfHroXgSd4UOypheAOfKKKONpSvPGcNwZ0ucoxL/sM49Nay');
INSERT INTO `teammember` VALUES ('333', 'mFYVKtfiRnCVsxHk8atihj', NULL, NULL, '软件工程学院', NULL, NULL, '$2b$10$5ArdYPBHnac8Ij/WIV8XueHAfw2DJR1ApDC8Y6to0I9WmIP/.Xowa');
INSERT INTO `teammember` VALUES ('34', '1', '哈哈哈', '122', '人工智能学院', 'xxxx@qq.com', '1', '$2b$10$z6po08b1NhlUajcofflyruyIwrYKZ6yxYID8Sorj7Xz/LF5EMIlEy');
INSERT INTO `teammember` VALUES ('35', '77', '哈哈哈', '122', '土木工程学院', 'xxxx@qq.com', '1', '$2b$10$z6po08b1NhlUajcofflyruyIwrYKZ6yxYID8Sorj7Xz/LF5EMIlEy');
INSERT INTO `teammember` VALUES ('36', '77', '哈哈哈', '122', '测绘学院', 'xxxx@qq.com', '1', '$2b$10$z6po08b1NhlUajcofflyruyIwrYKZ6yxYID8Sorj7Xz/LF5EMIlEy');
INSERT INTO `teammember` VALUES ('37', '77', '哈哈哈', '122', '微电子学院', 'xxxx@qq.com', '1', '$2b$10$z6po08b1NhlUajcofflyruyIwrYKZ6yxYID8Sorj7Xz/LF5EMIlEy');
INSERT INTO `teammember` VALUES ('38', '77', '哈哈哈', '122', '国金学院', 'xxxx@qq.com', '1', '$2b$10$z6po08b1NhlUajcofflyruyIwrYKZ6yxYID8Sorj7Xz/LF5EMIlEy');
INSERT INTO `teammember` VALUES ('39', '77', '哈哈哈', '122', '旅游学院', 'xxxx@qq.com', '1', '$2b$10$z6po08b1NhlUajcofflyruyIwrYKZ6yxYID8Sorj7Xz/LF5EMIlEy');
INSERT INTO `teammember` VALUES ('40', '77', '哈哈哈', '122', '软件工程学院', 'xxxx@qq.com', '1', '$2b$10$z6po08b1NhlUajcofflyruyIwrYKZ6yxYID8Sorj7Xz/LF5EMIlEy');
INSERT INTO `teammember` VALUES ('444', '6sXrGz6VWKAm46Jz2g3Gxs', '物群党', '18629906201', 'ut', 'o.vepqkm@qq.com', 'nisi sit', '$2b$10$lmS0riQrsaxhYesNApYZue1wPdXbkGa4HLJIFggfvD07qnL6t0bam');
INSERT INTO `teammember` VALUES ('444', 'c9hTNzGax42f9wQqgNGX6x', NULL, NULL, '土木工程学院', NULL, NULL, '$2b$10$BAUefwWU82j9/UAVXpbNpePbQd4AnjT1bc8GmgG7kVfTAhN093rta');
INSERT INTO `teammember` VALUES ('58', '35', '受列处海压', '18170584481', 'nisi non', 'y.uydstuw@qq.com', '2021', '$2b$10$cmmZ4S.rMNbablJ.EMVoAOZ2kO7KnOQI9f1LYtIBB0FtHDVN4A6Ay');
INSERT INTO `teammember` VALUES ('58', '6sXrGz6VWKAm46Jz2g3Gxs', '受列处海压', '18170584481', 'nisi non', 'y.uydstuw@qq.com', '2021', '$2b$10$zdAhd/3fuBzoFFCchEeMe.gAsgP/jc.S//TBE5BvlQ.uwfqszax0e');
INSERT INTO `teammember` VALUES ('87654321', 'fk6ZL5iFFrP7Vh5PGMLwKu', NULL, NULL, NULL, NULL, NULL, '$2b$10$9Zzg6604o9NnvQyXCcdUBu1ywHcQmi6hM1Ioz4v6DlyQ9mNRzxkbu');

SET FOREIGN_KEY_CHECKS = 1;
