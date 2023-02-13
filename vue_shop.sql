/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50711 (5.7.11)
 Source Host           : localhost:3306
 Source Schema         : vue_shop

 Target Server Type    : MySQL
 Target Server Version : 50711 (5.7.11)
 File Encoding         : 65001

 Date: 13/02/2023 23:37:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `tel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `province` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `city` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `county` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `areaCode` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `addressDetail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `isDefault` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES (2, 6, 'zixiao ZHONG', '13540011198', '北京市', '北京市', '东城区', '110101', '150 Avenue du Général Leclerc', 1);

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NULL DEFAULT NULL,
  `product_id` int(11) NULL DEFAULT NULL,
  `product_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `product_price` int(11) NULL DEFAULT NULL,
  `product_num` int(11) NULL DEFAULT NULL,
  `product_imgURL` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cart
-- ----------------------------

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `id` int(11) NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `price` int(11) NULL DEFAULT NULL,
  `imgURL` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `swiperList` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `detailList` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES (1, '武夷山高级大红袍2号', '口感清淡无负担的日常品饮。', 99, '/images/like1.jpeg', '/images/detail/swiper1.jpeg,/images/detail/swiper2.jpeg,/images/detail/swiper3.jpeg', '/images/detail/detail1.jpg,/images/detail/detail2.jpg,/images/detail/detail3.jpg');
INSERT INTO `product` VALUES (2, '武夷山灰芽花香金骏眉3号', '全芽采摘，特色是香气浓，口感偏向清甜类型，适合简单泡饮\r\n', 128, '/images/like2.jpeg', '/images/detail/swiper4.jpeg,/images/detail/swiper5.jpeg,/images/detail/swiper6.jpeg', '/images/detail/detail4.jpg,/images/detail/detail5.jpg,/images/detail/detail6.jpg');
INSERT INTO `product` VALUES (3, '2022春茶明前龙井飞花', '2022年明前龙井，全芽的外形超漂亮，口感一级棒\r\n               ', 128, '/images/like3.jpeg', '/images/detail/swiper7.jpeg,/images/detail/swiper8.jpeg,/images/detail/swiper9.jpeg', '/images/detail/detail4.jpg,/images/detail/detail5.jpg,/images/detail/detail6.jpg');
INSERT INTO `product` VALUES (4, '云南凤庆高海拔古树滇红', '采用80年以上的古树原料制作，手工工艺细制而成', 99, '/images/like4.jpeg', '/images/detail/swiper10.jpeg,/images/detail/swiper11.jpeg', '/images/detail/detail10.jpg,/images/detail/detail11.jpg,/images/detail/detail12.jpg');
INSERT INTO `product` VALUES (5, '黄山太平猴魁绿茶1号', '黄山雨前茶，日常爽口畅饮必备。', 99, '/images/search/1.jpeg', NULL, NULL);
INSERT INTO `product` VALUES (6, '绿茶-竹影清风碧螺春', NULL, 128, '/images/search/2.jpeg', NULL, NULL);
INSERT INTO `product` VALUES (7, '绿茶-大境枝美白茶', NULL, 188, '/images/search/3.jpeg', NULL, NULL);
INSERT INTO `product` VALUES (8, '祁门红茶-璀璨礼盒', NULL, 138, '/images/search/4.jpeg', NULL, NULL);
INSERT INTO `product` VALUES (9, '英德红茶-英红九号', '大叶种中的优质品种，汤感稠厚，超级耐泡', 109, '/images/search/5.jpeg', NULL, NULL);
INSERT INTO `product` VALUES (10, '传统丹桂红茶-桂花飘香', '香气馥郁舒缓，清幽持久细腻，口感层次丰富', 89, '/images/search/6.jpeg', NULL, NULL);
INSERT INTO `product` VALUES (11, '云南糯米香小熟沱普洱', '融入傣族糯米香叶，淡淡自然糯香符合初尝者口感。', 49, '/images/search/7.jpeg', NULL, NULL);
INSERT INTO `product` VALUES (12, '2014古法传承普洱熟茶砖', '古法制作熟茶砖，回甘明显，经久耐泡，伴有丝丝枣香。', 68, '/images/search/8.jpeg', NULL, NULL);
INSERT INTO `product` VALUES (13, '浓郁豆香龙井1号', '外形一般但入口顺且浓郁', 78, '/images/search/9.jpeg', NULL, NULL);

-- ----------------------------
-- Table structure for store_order
-- ----------------------------
DROP TABLE IF EXISTS `store_order`;
CREATE TABLE `store_order`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NULL DEFAULT NULL,
  `order_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `product_list` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `order_num` int(11) NULL DEFAULT NULL,
  `order_price` int(11) NULL DEFAULT NULL,
  `order_status` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of store_order
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tel` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `pwd` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `imgURL` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '13540011198', '111111', '/touxiang.jpeg', 'Zixiao', NULL);

SET FOREIGN_KEY_CHECKS = 1;
