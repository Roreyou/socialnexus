/*
 Navicat Premium Data Transfer

 Source Server         : greyjoey
 Source Server Type    : MySQL
 Source Server Version : 50740
 Source Host           : localhost:3306
 Source Schema         : socialnexus

 Target Server Type    : MySQL
 Target Server Version : 50740
 File Encoding         : 65001

 Date: 22/05/2024 15:23:14
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
  `QRCode` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of activity
-- ----------------------------
INSERT INTO `activity` VALUES ('1', '色完证儿', '2003-11-07', '2000-09-02', '1975-03-08 06:28:02', '2007-11-24 12:14:19', 25, '湖南省', '沧州市', '梨树县', 1, '1', '外现展话毛命日位看合始解真什目圆。个入单级被头算界求商快受半话被就温。给收问及度选务而没组复线什将门更二展。', '1,3', 2, 1, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', NULL);
INSERT INTO `activity` VALUES ('10', '运动会1', '2002-09-21', '2002-09-27', '2023-06-15 09:30:45', '2023-06-16 09:30:45', 20, '浙江省', '嘉兴市', '5', 2, '100', '1', '2', 3, 3, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', NULL);
INSERT INTO `activity` VALUES ('11', '运动会4', '2002-09-21', '2002-09-27', '2023-06-15 09:30:45', '2023-06-16 09:30:45', 20, '浙江省', '嘉兴市', '5', 3, '100', '1', '2', 2, 3, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', NULL);
INSERT INTO `activity` VALUES ('2', '关爱老人活动', '2002-09-21', '2002-09-29', '2023-06-15 09:30:45', '2023-06-18 09:30:45', 20, '广东省', '珠海市', '2', 2, '1', '1', '1,3', 3, 1, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', NULL);
INSERT INTO `activity` VALUES ('3', '社区大扫除活动', '2002-09-21', '2002-09-28', '2023-06-15 09:30:45', '2023-06-16 09:30:45', 20, '广东省', '珠海市', '2', 3, '1', '1', '1', 2, 2, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', NULL);
INSERT INTO `activity` VALUES ('4', '1活动', '2002-09-21', '2002-09-27', '2023-06-15 09:30:45', '2023-06-16 09:30:45', 20, '浙江省', '嘉兴市', '3', 3, '1', '1', '2', 2, 2, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', NULL);
INSERT INTO `activity` VALUES ('5', '运动会2', '2002-09-21', '2002-09-27', '2023-06-15 09:30:45', '2023-06-16 09:30:45', 20, '浙江省', '嘉兴市', '3', 1, '1', '1', '2', 2, 3, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', NULL);
INSERT INTO `activity` VALUES ('6', '运动会3', '2002-09-21', '2002-09-27', '2023-06-15 09:30:45', '2023-06-16 09:30:45', 20, '浙江省', '嘉兴市', '5', 1, '1', '1', '2', 2, 3, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', NULL);
INSERT INTO `activity` VALUES ('7', '运动会5', '2002-09-21', '2002-09-27', '2023-06-15 09:30:45', '2023-06-16 09:30:45', 20, '浙江省', '嘉兴市', '5', 1, '100', '1', '2', 2, 3, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', NULL);
INSERT INTO `activity` VALUES ('8', '运动会6', '2002-09-21', '2002-09-27', '2023-06-15 09:30:45', '2023-06-16 09:30:45', 20, '浙江省', '嘉兴市', '5', 2, '100', '1', '2', 2, 3, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', NULL);
INSERT INTO `activity` VALUES ('9', '运动会7', '2002-09-21', '2002-09-27', '2023-06-15 09:30:45', '2023-06-16 09:30:45', 20, '浙江省', '嘉兴市', '5', 2, '100', '1', '2', 3, 3, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg', NULL);

-- ----------------------------
-- Table structure for activity_type
-- ----------------------------
DROP TABLE IF EXISTS `activity_type`;
CREATE TABLE `activity_type`  (
  `id` int(11) NOT NULL,
  `type_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

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
  `team_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `post_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `time` datetime NULL DEFAULT NULL,
  `like` int(11) NULL DEFAULT NULL,
  `ifread` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (1, '1', '70', '好丰富的活动！', '2024-04-20 08:30:00', 2, 0);
INSERT INTO `comment` VALUES (2, '77', '70', '今天我们的体验很不错！', '2024-04-18 08:30:00', 4, 1);
INSERT INTO `comment` VALUES (3, '1', '1', '帖子1的评论', '2024-04-18 08:30:00', 0, 1);

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
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of community
-- ----------------------------
INSERT INTO `community` VALUES ('1', '华满子厂水工外', '18139827734', '江西省', '景德镇市', '香港特别行政区贵港市隆昌县', 'Excepteur proident adipisicing mollit Ut', '1973-10-23', 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg');
INSERT INTO `community` VALUES ('100', '共十治', '18133334146', '湖北省', '咸阳市', '广西壮族自治区泉州市深水埗区', 'velit tempor sint', '1983-01-24', 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg');
INSERT INTO `community` VALUES ('101', '共十治', '18133334146', '湖北省', '咸阳市', '广西壮族自治区泉州市深水埗区', 'velit tempor sint', '1983-01-24', 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg');
INSERT INTO `community` VALUES ('120', '政查角办', '18652198388', '甘肃省', '北京市', '宁夏回族自治区衢州市阿拉善右旗', 'amet eiusmod et id', '1978-08-27', 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg');
INSERT INTO `community` VALUES ('121', '政查角办', '18652198388', '甘肃省', '北京市', '宁夏回族自治区衢州市阿拉善右旗', 'amet eiusmod et id', '1978-08-27', 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg');
INSERT INTO `community` VALUES ('122', '政查角办', '18652198388', '甘肃省', '北京市', '宁夏回族自治区衢州市阿拉善右旗', 'amet eiusmod et id', '1978-08-27', 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg');
INSERT INTO `community` VALUES ('123', '政查角办', '18652198388', '甘肃省', '北京市', '宁夏回族自治区衢州市阿拉善右旗', 'amet eiusmod et id', '1978-08-27', 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg');
INSERT INTO `community` VALUES ('59', '政查角办', '18652198388', '甘肃省', '北京市', '宁夏回族自治区衢州市阿拉善右旗', 'amet eiusmod et id', '1978-08-27', 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg');
INSERT INTO `community` VALUES ('666', '666', '666', '湖北省', '武汉市', '666', '666', '2024-05-21', NULL);
INSERT INTO `community` VALUES ('99', '共十治', '18133334146', '湖北省', '咸阳市', '广西壮族自治区泉州市深水埗区', 'velit tempor sint', '1983-01-24', 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg');

-- ----------------------------
-- Table structure for datawall_act
-- ----------------------------
DROP TABLE IF EXISTS `datawall_act`;
CREATE TABLE `datawall_act`  (
  `id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `activity_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `team_num` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`activity_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

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
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of datawall_com
-- ----------------------------

-- ----------------------------
-- Table structure for favorate
-- ----------------------------
DROP TABLE IF EXISTS `favorate`;
CREATE TABLE `favorate`  (
  `team_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `activity_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`team_id`, `activity_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of favorate
-- ----------------------------
INSERT INTO `favorate` VALUES ('1', '2');
INSERT INTO `favorate` VALUES ('1', '3');

-- ----------------------------
-- Table structure for key_words
-- ----------------------------
DROP TABLE IF EXISTS `key_words`;
CREATE TABLE `key_words`  (
  `id` int(11) NOT NULL,
  `key_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

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
  `team_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ifread` int(11) NULL DEFAULT NULL,
  `liketime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`comment_id`, `team_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of likecomment
-- ----------------------------
INSERT INTO `likecomment` VALUES ('1', '1', 0, NULL);
INSERT INTO `likecomment` VALUES ('2', '1', 0, NULL);

-- ----------------------------
-- Table structure for likepost
-- ----------------------------
DROP TABLE IF EXISTS `likepost`;
CREATE TABLE `likepost`  (
  `post_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `team_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ifread` int(11) NULL DEFAULT NULL,
  `liketime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`post_id`, `team_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of likepost
-- ----------------------------
INSERT INTO `likepost` VALUES ('70', '1', 0, '2024-05-10 03:11:24');

-- ----------------------------
-- Table structure for likereply
-- ----------------------------
DROP TABLE IF EXISTS `likereply`;
CREATE TABLE `likereply`  (
  `reply_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `team_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ifread` int(11) NULL DEFAULT NULL,
  `liketime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`reply_id`, `team_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of likereply
-- ----------------------------
INSERT INTO `likereply` VALUES ('1', '1', 0, NULL);
INSERT INTO `likereply` VALUES ('2', '77', 0, NULL);
INSERT INTO `likereply` VALUES ('3', '77', 1, NULL);

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
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of modify_teacher
-- ----------------------------
INSERT INTO `modify_teacher` VALUES ('30', '81', '历更世手题入热', '18176116651', 'cupidatat', 'u.pqpkvmfgkf@qq.com');
INSERT INTO `modify_teacher` VALUES ('42', NULL, '数现报题力候', '18685328537', 'pariatur ullamco Excepteur', 'e.uwolxd@qq.com');
INSERT INTO `modify_teacher` VALUES ('53', '41', '工解所适', '19853216855', 'enim culpa mollit veniam do', 'p.kmsqpo@qq.com');
INSERT INTO `modify_teacher` VALUES ('98', '21', '两常行平革准', '19872712489', 'in dolore', 'f.ptynofzhq@qq.com');

-- ----------------------------
-- Table structure for modify_teammember
-- ----------------------------
DROP TABLE IF EXISTS `modify_teammember`;
CREATE TABLE `modify_teammember`  (
  `id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `team_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `tel` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `major` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `grade` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`, `team_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of modify_teammember
-- ----------------------------
INSERT INTO `modify_teammember` VALUES ('4', '81', '约县置权写较', '18185589507', 'amet minim proident tempor ut', 's.ggkc@qq.com', 'irure ut');
INSERT INTO `modify_teammember` VALUES ('41', '21', '但之间林行', '18158764427', 'ut consequat non do amet', 'm.xwugfnpn@qq.com', 'do sunt');
INSERT INTO `modify_teammember` VALUES ('7', '69', '一没过极', '18128009688', 'et pariatur adipisicing', 'e.xvoclym@qq.com', 'in sed nulla');
INSERT INTO `modify_teammember` VALUES ('73', '21', '北分之育问', '18127598460', 'dolor', 'n.cvfql@qq.com', 'dolore ipsum id');
INSERT INTO `modify_teammember` VALUES ('95', '81', '活听团个亲件可', '18152566965', 'in dolor ipsum', 'p.ixt@qq.com', 'ea cillum velit id');

-- ----------------------------
-- Table structure for notification
-- ----------------------------
DROP TABLE IF EXISTS `notification`;
CREATE TABLE `notification`  (
  `team_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `post_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `num` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`team_id`, `post_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of notification
-- ----------------------------
INSERT INTO `notification` VALUES ('77', '1', 1);
INSERT INTO `notification` VALUES ('77', '70', 0);

-- ----------------------------
-- Table structure for post
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `title` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `star` int(11) NULL DEFAULT NULL,
  `picture` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `start_date` date NULL DEFAULT NULL,
  `end_date` date NULL DEFAULT NULL,
  `province` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `city` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `post_time` datetime NULL DEFAULT NULL,
  `like` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 71 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of post
-- ----------------------------
INSERT INTO `post` VALUES (1, '77', '1', 'non incididunt Lorem veniam', 35, 'http://dummyimage.com/400x400,http://dummyimage.com/200x200', '1992-04-26', '1977-09-06', '北京市', '北京市', '陕西省九龙琼山区', '2009-11-14 10:31:14', 0);
INSERT INTO `post` VALUES (70, '77', '1', 'non incididunt Lorem veniam', 35, 'http://dummyimage.com/400x400,http://dummyimage.com/200x200', '1992-04-26', '1977-09-06', '北京市', '北京市', '陕西省九龙琼山区', '2009-11-14 10:31:14', 1);

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
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of reply
-- ----------------------------
INSERT INTO `reply` VALUES (1, '1', '77', '谢谢你们01', '2024-04-20 08:30:00', 1, 0);
INSERT INTO `reply` VALUES (2, '2', '77', '谢谢你们01', '2024-04-20 08:30:00', 1, 0);
INSERT INTO `reply` VALUES (3, '3', '1', '谢谢你们第一条帖子', '2024-04-20 08:30:00', 1, 1);

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
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of school
-- ----------------------------
INSERT INTO `school` VALUES ('1', '111', '中山大学', '11', '11', '11', '11', '11', '11');
INSERT INTO `school` VALUES ('32', '$2b$10$UgPGRWcGduKzpdAWNPxXkO6psiFEoD.rWKPSfZVrg7LhfkB5JFe7W', NULL, NULL, '2009-03-14 21:19:12', NULL, NULL, NULL, NULL);
INSERT INTO `school` VALUES ('sysu', '$2b$10$edLzvFzIVkRCBv9vg.YfYu38YCn.2qjYVqfmabuRt3WHgKAE/bQ/G', NULL, NULL, '2009-03-14 21:19:12', NULL, NULL, NULL, NULL);

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
  `modification_status` int(11) NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of schoolteam
-- ----------------------------
INSERT INTO `schoolteam` VALUES ('1', '$2b$10$wv3X3cHvgLShaZGpLRHZmeuJ8eL/SDH8n55pRyaI8jba0AS7nVlki', '测试队名1', '1', '2023-02-16', 'sed tempor ea occaecat', '19', '99', '1', 1, 2, 1, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg');
INSERT INTO `schoolteam` VALUES ('2', '$2b$10$6qe1MYwjeGq1H8VpDTha3.wzt72ty6sNK3Y9LWZ6ehPeqrYOg01O.', '77队名', '1', '1993-01-29', 'in in laboris adipisicing ut', '34', '99', '1', 1, 2, 1, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg');
INSERT INTO `schoolteam` VALUES ('21', '$2b$10$wv3X3cHvgLShaZGpLRHZmeuJ8eL/SDH8n55pRyaI8jba0AS7nVlki', '种战题般1', '1', '2023-02-16', 'sed tempor ea occaecat', '19', '99', '1', 1, 3, 1, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg');
INSERT INTO `schoolteam` VALUES ('22', '$2b$10$wv3X3cHvgLShaZGpLRHZmeuJ8eL/SDH8n55pRyaI8jba0AS7nVlki', '种战题般2', '1', '2023-02-16', 'sed tempor ea occaecat', '19', '99', '1', 1, 4, 1, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg');
INSERT INTO `schoolteam` VALUES ('3h71YodfGKXVspCu8ofdbX', '$2b$10$JxTJq6OZ/PDmq4NmVbfI7u7ByUMFQz5Q1vMIBdPvfPdJjr4H9T2ea', '长命技花立1', '1', NULL, 'irure est proident reprehenderit', '100', '99', NULL, NULL, 4, NULL, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg');
INSERT INTO `schoolteam` VALUES ('53MNdzw43VLp12ghgTXJFA', '$2b$10$pRJvg1SEMCK0vb/.XnLUgu1Xf7ClB4hrgPw/T6FeS3oe.Pwdz7BXa', '长命技花立', NULL, NULL, 'irure est proident reprehenderit', '100', '99', NULL, NULL, 4, NULL, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg');
INSERT INTO `schoolteam` VALUES ('6sXrGz6VWKAm46Jz2g3Gxs', NULL, '4441', NULL, '2024-05-21', '444', '444', NULL, NULL, NULL, 4, NULL, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg');
INSERT INTO `schoolteam` VALUES ('c9hTNzGax42f9wQqgNGX6x', NULL, '4442', NULL, '2024-05-21', '444', '444', NULL, NULL, NULL, 4, NULL, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg');
INSERT INTO `schoolteam` VALUES ('co6SEzku9yTvo8kQGH4639', NULL, '没备称细接时决2', NULL, NULL, 'Lorem in', '19', '99', NULL, NULL, 4, NULL, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg');
INSERT INTO `schoolteam` VALUES ('di6FUj5KZDn9VVe1J3wuSg', NULL, '人来要满', NULL, NULL, 'ad id ut', '19', '99', NULL, NULL, 4, NULL, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg');
INSERT INTO `schoolteam` VALUES ('iGafV26sXoPPjyWfaJDpGC', '$2b$10$x7HRXNAxeq9EnmlNzFGT5.mm5UK1cIPiAzzdxXTlxq1iPL8cOZfC2', '长命技花立2', '1', NULL, 'irure est proident reprehenderit', '100', '99', NULL, NULL, 4, NULL, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg');
INSERT INTO `schoolteam` VALUES ('m9Xw3QS8dLzH9JWqzeshWb', NULL, '123的另外一支队伍', NULL, '2024-05-21', '无', '123', '99', NULL, NULL, 4, NULL, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg');
INSERT INTO `schoolteam` VALUES ('mFYVKtfiRnCVsxHk8atihj', NULL, '333', NULL, '2024-05-21', '333', '333', NULL, NULL, NULL, 4, NULL, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg');
INSERT INTO `schoolteam` VALUES ('mGe2aDDj7ZsbJbHkdpbkw2', '$2b$10$YJ27oejH3PrTWmR/5t7vU.cSx/CB4C77JlfJiwwZq2Csu455oBdsS', '没备称细接时决1', NULL, NULL, 'Lorem in', '19', '99', NULL, NULL, 4, NULL, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg');
INSERT INTO `schoolteam` VALUES ('mXAbFBRfKpJc8SwGFABF6S', NULL, '测试队伍2', NULL, '2024-05-21', '无', '123', '99', NULL, NULL, 4, NULL, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg');
INSERT INTO `schoolteam` VALUES ('ppNzFa61k1VcdvDWJTA978', NULL, '222', NULL, '2024-05-21', '222', '222', '99', NULL, NULL, 4, NULL, 'https://socialnexus.oss-cn-shenzhen.aliyuncs.com/upload/images/6197672f30f9e9907.jpg');

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
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('53', '$2b$10$YaJoyoDfHroXgSd4UOypheAOfKKKONpSvPGcNwZ0ucoxL/sM49Nay', '吴老师', '12345678910', '软件工程学院', 'xxx');
INSERT INTO `teacher` VALUES ('90', '$2b$10$YaJoyoDfHroXgSd4UOypheAOfKKKONpSvPGcNwZ0ucoxL/sM49Nay', '叫矿边严', '18145681888', 'id adipisicing incididunt cupidatat', 'xxx');
INSERT INTO `teacher` VALUES ('99', '$2b$10$YaJoyoDfHroXgSd4UOypheAOfKKKONpSvPGcNwZ0ucoxL/sM49Nay', '南半油联信', '18151694055', '软件工程学院', 'xxx');

-- ----------------------------
-- Table structure for teamactivity
-- ----------------------------
DROP TABLE IF EXISTS `teamactivity`;
CREATE TABLE `teamactivity`  (
  `activity_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `team_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `com_to_team` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `team_to_activity` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `admission_status` int(11) NULL DEFAULT NULL,
  `comment_status` int(11) NULL DEFAULT NULL,
  `com_to_team_time` datetime NULL DEFAULT NULL,
  `team_to_activity_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`activity_id`, `team_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teamactivity
-- ----------------------------
INSERT INTO `teamactivity` VALUES ('10', '2', 'not bad', 'not bad', 3, 1, NULL, NULL);
INSERT INTO `teamactivity` VALUES ('11', '22', 'not bad', 'not bad', 1, 1, NULL, NULL);
INSERT INTO `teamactivity` VALUES ('2', '1', '可以可以', 'good', 2, 2, NULL, NULL);
INSERT INTO `teamactivity` VALUES ('3', '21', 'not bad', 'good', 2, 1, NULL, NULL);

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
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teammember
-- ----------------------------
INSERT INTO `teammember` VALUES ('100', '3h71YodfGKXVspCu8ofdbX', 'zzz', 'zz', '软件工程学院', 'xxx', '1', '$2b$10$h5TnP7TgP/yGXgT/JOkPT.hkd4ckHLSjgsX6g7p0wSSQBphc/qnP2');
INSERT INTO `teammember` VALUES ('101', '3h71YodfGKXVspCu8ofdbX', 'xxx', 'xxx', '人工智能学院', 'xxx', '1', '$2b$10$I9VKKgjTpxJ/NjvSiC9SaOYRtDY4EvJJUoy64iKvAaTKOeXeP5HI.');
INSERT INTO `teammember` VALUES ('123', 'm9Xw3QS8dLzH9JWqzeshWb', NULL, NULL, '人工智能学院', NULL, NULL, '$2b$10$wrYAfI2oEB0gUnosrU1n8.AjElMaLsDzSLEeAAC70tab5mNwAVkuK');
INSERT INTO `teammember` VALUES ('123', 'mXAbFBRfKpJc8SwGFABF6S', NULL, NULL, '人工智能学院', NULL, NULL, '$2b$10$v//m/lJNCxcYfaI7o/MZleZlwiw9jkGFIVHlSIgFeJYKJuE6rWpYy');
INSERT INTO `teammember` VALUES ('19', '1', '传由较周收快需', '18119155591', '软件工程学院', 'z.efxtgychkh@qq.com', '1', '$2b$10$z6po08b1NhlUajcofflyruyIwrYKZ6yxYID8Sorj7Xz/LF5EMIlEy');
INSERT INTO `teammember` VALUES ('19', 'co6SEzku9yTvo8kQGH4639', NULL, NULL, '软件工程学院', NULL, NULL, '$2b$10$SuKaGUA84siRkYNg/RS2hujdO7pFS28gi8mhGQ4QchwEDCtdzcBWu');
INSERT INTO `teammember` VALUES ('19', 'di6FUj5KZDn9VVe1J3wuSg', NULL, NULL, '软件工程学院', NULL, NULL, '$2b$10$wyNf4a/.F8MVbGJwmHVlF.0dLRJgGHlRIPPgb8GmgZX9fqoT33dp2');
INSERT INTO `teammember` VALUES ('222', 'ppNzFa61k1VcdvDWJTA978', NULL, NULL, '软件工程学院', NULL, NULL, '$2b$10$YaJoyoDfHroXgSd4UOypheAOfKKKONpSvPGcNwZ0ucoxL/sM49Nay');
INSERT INTO `teammember` VALUES ('333', 'mFYVKtfiRnCVsxHk8atihj', NULL, NULL, '软件工程学院', NULL, NULL, '$2b$10$5ArdYPBHnac8Ij/WIV8XueHAfw2DJR1ApDC8Y6to0I9WmIP/.Xowa');
INSERT INTO `teammember` VALUES ('34', '1', '哈哈哈', '122', '人工智能学院', 'xxxx@qq.com', '1', '$2b$10$z6po08b1NhlUajcofflyruyIwrYKZ6yxYID8Sorj7Xz/LF5EMIlEy');
INSERT INTO `teammember` VALUES ('35', '77', '哈哈哈', '122', '土木工程学院', 'xxxx@qq.com', '1', '$2b$10$z6po08b1NhlUajcofflyruyIwrYKZ6yxYID8Sorj7Xz/LF5EMIlEy');
INSERT INTO `teammember` VALUES ('36', '77', '哈哈哈', '122', '测绘学院', 'xxxx@qq.com', '1', '$2b$10$z6po08b1NhlUajcofflyruyIwrYKZ6yxYID8Sorj7Xz/LF5EMIlEy');
INSERT INTO `teammember` VALUES ('37', '77', '哈哈哈', '122', '微电子学院', 'xxxx@qq.com', '1', '$2b$10$z6po08b1NhlUajcofflyruyIwrYKZ6yxYID8Sorj7Xz/LF5EMIlEy');
INSERT INTO `teammember` VALUES ('38', '77', '哈哈哈', '122', '国金学院', 'xxxx@qq.com', '1', '$2b$10$z6po08b1NhlUajcofflyruyIwrYKZ6yxYID8Sorj7Xz/LF5EMIlEy');
INSERT INTO `teammember` VALUES ('39', '77', '哈哈哈', '122', '旅游学院', 'xxxx@qq.com', '1', '$2b$10$z6po08b1NhlUajcofflyruyIwrYKZ6yxYID8Sorj7Xz/LF5EMIlEy');
INSERT INTO `teammember` VALUES ('40', '77', '哈哈哈', '122', '软件工程学院', 'xxxx@qq.com', '1', '$2b$10$z6po08b1NhlUajcofflyruyIwrYKZ6yxYID8Sorj7Xz/LF5EMIlEy');
INSERT INTO `teammember` VALUES ('444', '6sXrGz6VWKAm46Jz2g3Gxs', NULL, NULL, '土木工程学院', NULL, NULL, '$2b$10$lmS0riQrsaxhYesNApYZue1wPdXbkGa4HLJIFggfvD07qnL6t0bam');
INSERT INTO `teammember` VALUES ('444', 'c9hTNzGax42f9wQqgNGX6x', NULL, NULL, '土木工程学院', NULL, NULL, '$2b$10$BAUefwWU82j9/UAVXpbNpePbQd4AnjT1bc8GmgG7kVfTAhN093rta');

SET FOREIGN_KEY_CHECKS = 1;
