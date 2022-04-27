/*
Navicat MySQL Data Transfer

Source Server         : root@localhost
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : keybox

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2022-04-15 20:53:44
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for groups
-- ----------------------------
DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups` (
  `id` int(10) unsigned NOT NULL DEFAULT 0,
  `orgid` int(10) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `adminuid` int(10) unsigned NOT NULL,
  `category` enum('alumni_admin_fellow','alumni_general_fellow','alumni_admin_fullinfo','alumni_general_fullinfo','alumni_admin_addressinfo','alumni_general_addressinfo','alumni_admin_careerinfo','alumni_general_careerinfo','alumni_admin_phoneinfo','alumni_general_phoneinfo','alumni_admin_startupinfo','alumni_general_startupinfo','alumni_admin_trackinfo','alumni_general_trackinfo','brrmgr_admin_purchaser','brrmgr_general_purchaser','brrmgr_admin_deployer','brrmgr_general_deployer','brrmgr_admin_borrower','brrmgr_general_borrower','dpmgr_admin_project','dpmgr_general_project','dpmgr_admin_raiser','dpmgr_general_raiser','dpmgr_admin_selector','dpmgr_general_selector','keybox_admin_keybox','keybox_general_keybox','keybox_admin_key','keybox_general_key','keybox_admin_borrowable','keybox_general_borrowable','olquiz_admin_examsponsor','olquiz_general_examsponsor','olquiz_admin_item','olquiz_general_item','olquiz_admin_examtaker','olquiz_general_examtaker','org_admin_public','org_general_public','org_admin_private','org_general_private','pggantt_admin_public','pggantt_general_public','pggantt_admin_private','pggantt_general_private','pggantt_admin_publicproject','pggantt_general_publicproject','pggantt_admin_privateproject','pggantt_general_privateproject','pggantt_admin_template','pggantt_general_template','rbs_admin_room','rbs_general_room','rbs_admin_service','rbs_general_service','resmgr_admin_public','resmgr_general_public','resmgr_admin_private','resmgr_general_private','resmgr_admin_revision','resmgr_general_revision','resmgr_admin_institution','resmgr_general_institution','resmgr_admin_achievement','resmgr_general_achievement','resmgr_admin_team','resmgr_general_team','resmgr_admin_task','resmgr_general_task','resmgr_admin_species','resmgr_general_species','seatmgr_admin_building','seatmgr_general_building','seatmgr_admin_map','seatmgr_general_map','supervise_admin_project','supervise_general_project','supervise_admin_supervisor','supervise_general_supervisor','supervise_admin_supervisee','supervise_general_supervisee') COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of groups
-- ----------------------------
INSERT INTO `groups` VALUES ('35', '70', '信息学部钥匙副手', '15750', 'keybox_admin_key');
INSERT INTO `groups` VALUES ('36', '70', '信息学部钥匙助手', '15750', 'keybox_general_key');
INSERT INTO `groups` VALUES ('37', '70', '信息学部钥匙箱副手', '15750', 'keybox_admin_keybox');
INSERT INTO `groups` VALUES ('38', '70', '信息学部钥匙箱助手', '15750', 'keybox_general_keybox');
INSERT INTO `groups` VALUES ('39', '70', '信息学部钥匙可借人副手', '15750', 'keybox_admin_borrowable');
INSERT INTO `groups` VALUES ('40', '70', '计算机办公室钥匙可借人', '15750', 'keybox_general_borrowable');
INSERT INTO `groups` VALUES ('41', '70', '计算机本科生钥匙可借人', '24795', 'keybox_general_borrowable');
INSERT INTO `groups` VALUES ('42', '72', '软件学院钥匙箱助手', '15750', 'keybox_general_keybox');
INSERT INTO `groups` VALUES ('43', '72', '软件学院钥匙助手', '15750', 'keybox_general_key');
INSERT INTO `groups` VALUES ('44', '70', '计算机研究生钥匙可借人', '15750', 'keybox_general_borrowable');
INSERT INTO `groups` VALUES ('45', '72', '软件本科生钥匙可借人', '15750', 'keybox_general_borrowable');

-- ----------------------------
-- Table structure for groupusers
-- ----------------------------
DROP TABLE IF EXISTS `groupusers`;
CREATE TABLE `groupusers` (
  `id` int(10) unsigned NOT NULL DEFAULT 0,
  `groupid` int(10) unsigned NOT NULL,
  `uid` int(10) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of groupusers
-- ----------------------------
INSERT INTO `groupusers` VALUES ('1', '38', '15750');
INSERT INTO `groupusers` VALUES ('2', '36', '24729');
INSERT INTO `groupusers` VALUES ('3', '41', '24795');
INSERT INTO `groupusers` VALUES ('4', '41', '24729');
INSERT INTO `groupusers` VALUES ('5', '42', '15750');
INSERT INTO `groupusers` VALUES ('6', '43', '24729');
INSERT INTO `groupusers` VALUES ('7', '45', '24729');
INSERT INTO `groupusers` VALUES ('8', '45', '24795');
INSERT INTO `groupusers` VALUES ('9', '38', '24729');

-- ----------------------------
-- Table structure for hooks
-- ----------------------------
DROP TABLE IF EXISTS `hooks`;
CREATE TABLE `hooks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `keyboxid` int(10) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `x` smallint(255) unsigned DEFAULT NULL,
  `y` smallint(255) DEFAULT NULL,
  `shape` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` enum('on','off','unused') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unused',
  `adminuid` int(10) unsigned NOT NULL,
  `remark` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `creatoruuid` int(10) unsigned NOT NULL,
  `createtime` int(10) unsigned NOT NULL,
  `modifieruuid` int(10) unsigned NOT NULL,
  `modifytime` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of hooks
-- ----------------------------
INSERT INTO `hooks` VALUES ('121', '41', '计算机挂钩1', '1', '1', '圆形', 'on', '24729', '无', '24725', '1648702002', '24795', '1649500022');
INSERT INTO `hooks` VALUES ('122', '41', '计算机挂钩2', '1', '2', null, 'on', '24729', '无', '24725', '1648702036', '24729', '1649507287');
INSERT INTO `hooks` VALUES ('123', '41', '计算机挂钩3', '1', '3', null, 'on', '24729', '无', '24725', '1648702058', '24729', '1649429729');
INSERT INTO `hooks` VALUES ('124', '41', '计算机挂钩4', '2', '1', null, 'on', '24729', '无', '24725', '1648702076', '24795', '1649428188');
INSERT INTO `hooks` VALUES ('125', '41', '计算机挂钩5', '2', '2', null, 'on', '24729', '无', '24725', '1648702099', '24729', '1649492987');
INSERT INTO `hooks` VALUES ('126', '41', '计算机挂钩6', '2', '3', null, 'on', '24729', '无', '24725', '1648702118', '24795', '1649428188');
INSERT INTO `hooks` VALUES ('127', '41', '计算机挂钩7', '3', '1', null, 'on', '24729', '无', '24725', '1648702144', '24795', '1649428188');
INSERT INTO `hooks` VALUES ('128', '41', '计算机挂钩8', '3', '2', null, 'off', '24729', '无', '24725', '1648702167', '24729', '1649492633');
INSERT INTO `hooks` VALUES ('129', '41', '计算机挂钩9', '3', '3', null, 'off', '24729', '无', '24725', '1648702193', '24729', '1649492956');
INSERT INTO `hooks` VALUES ('130', '42', 'cs2挂钩1', '1', '1', null, 'on', '24729', null, '24725', '1649469385', '24725', '1649470504');
INSERT INTO `hooks` VALUES ('131', '42', 'cs2挂钩2', '1', '2', null, 'on', '24729', null, '24725', '1649469407', '24725', '1649470514');
INSERT INTO `hooks` VALUES ('132', '42', 'cs2挂钩3', '1', '3', null, 'unused', '24729', null, '24725', '1649469424', '24725', '1649469424');
INSERT INTO `hooks` VALUES ('133', '43', 'cs3挂钩1', '1', '1', null, 'on', '24729', '无', '24725', '1649469542', '24725', '1649814810');
INSERT INTO `hooks` VALUES ('134', '44', '软件挂钩1', '1', '1', null, 'on', '24729', '无', '24725', '1649469646', '24725', '1649470479');
INSERT INTO `hooks` VALUES ('135', '46', '软件挂钩11', '1', '1', null, 'unused', '24729', 'null', '24725', '1649475915', '24725', '1649477087');
INSERT INTO `hooks` VALUES ('136', '47', 'cs4挂钩1', '1', '1', null, 'on', '24729', null, '24725', '1649477869', '24725', '1649480427');
INSERT INTO `hooks` VALUES ('137', '49', 'cs5挂钩1', '1', '1', null, 'unused', '24795', null, '24729', '1649503178', '24729', '1649503178');
INSERT INTO `hooks` VALUES ('139', '51', 'cs5挂钩1', '1', '1', '长方形', 'on', '24725', '无', '24729', '1649505579', '24725', '1649506892');
INSERT INTO `hooks` VALUES ('140', '43', 'cs3挂钩2', '1', '2', null, 'unused', '24729', '无', '24725', '1649512673', '24725', '1649512673');

-- ----------------------------
-- Table structure for journals
-- ----------------------------
DROP TABLE IF EXISTS `journals`;
CREATE TABLE `journals` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `boxid` int(11) NOT NULL,
  `hookid` int(11) DEFAULT NULL,
  `uid` int(11) unsigned DEFAULT NULL,
  `createtime` int(11) unsigned NOT NULL,
  `remark` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `optype` enum('open','close','on','off','none') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of journals
-- ----------------------------
INSERT INTO `journals` VALUES ('124', '41', null, '24729', '1649492933', null, 'open');
INSERT INTO `journals` VALUES ('125', '41', '125', '24729', '1649492955', null, 'off');
INSERT INTO `journals` VALUES ('126', '41', '129', '24729', '1649492955', null, 'off');
INSERT INTO `journals` VALUES ('127', '41', null, '24729', '1649492958', null, 'close');
INSERT INTO `journals` VALUES ('128', '41', null, '24729', '1649492971', null, 'open');
INSERT INTO `journals` VALUES ('129', '41', '125', '24729', '1649492987', null, 'on');
INSERT INTO `journals` VALUES ('130', '41', null, '24729', '1649492989', null, 'close');

-- ----------------------------
-- Table structure for keyboxes
-- ----------------------------
DROP TABLE IF EXISTS `keyboxes`;
CREATE TABLE `keyboxes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `orgid` int(11) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `shape` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` enum('on','off','unused') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'unused',
  `adminuid` int(11) unsigned NOT NULL,
  `groupid` int(11) unsigned DEFAULT NULL,
  `isenable` enum('y','n') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'y',
  `remark` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `creatoruuid` int(10) unsigned NOT NULL,
  `createtime` int(10) unsigned NOT NULL,
  `modifieruuid` int(10) unsigned NOT NULL,
  `modifytime` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of keyboxes
-- ----------------------------
INSERT INTO `keyboxes` VALUES ('41', '70', '计算机钥匙箱1', '长方形', '理科大楼517', 'off', '24725', '41', 'y', '钥匙箱维护信息完成', '15750', '1648700359', '24725', '1648701701');
INSERT INTO `keyboxes` VALUES ('42', '70', '计算机钥匙箱2', '长方形', '理科大楼527', 'off', '24725', '41', 'y', '维护完成', '15750', '1648700396', '24725', '1649469831');
INSERT INTO `keyboxes` VALUES ('43', '70', '计算机钥匙箱3', '椭圆', '理科大楼519', 'off', '24725', '44', 'y', '维护完成', '15750', '1648700434', '24725', '1649469508');
INSERT INTO `keyboxes` VALUES ('44', '72', '软件钥匙箱1', '长方形', '理科大楼', 'off', '24725', '45', 'y', '无', '15750', '1649469190', '24725', '1649469619');
INSERT INTO `keyboxes` VALUES ('46', '72', '软件钥匙箱2', '长方形', '教书院', 'off', '24725', '45', 'y', 'null', '15750', '1649474560', '24725', '1649475919');
INSERT INTO `keyboxes` VALUES ('47', '70', '计算机钥匙箱4', '长方形', '教书院', 'off', '24725', '41', 'y', 'null', '15750', '1649477531', '24725', '1649477841');
INSERT INTO `keyboxes` VALUES ('51', '70', '计算机钥匙箱5', '长方形', '理科大楼', 'off', '24729', '41', 'y', '无', '15750', '1649505467', '24729', '1649505530');

-- ----------------------------
-- Table structure for keys
-- ----------------------------
DROP TABLE IF EXISTS `keys`;
CREATE TABLE `keys` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `hookid` int(11) unsigned DEFAULT NULL,
  `adminuid` int(11) unsigned NOT NULL,
  `uid` int(11) unsigned DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `isenable` enum('y','n') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'y',
  `state` enum('onhook','offhook','broken','lost','destroyed','instock') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'instock',
  `remark` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `creatoruuid` int(10) unsigned NOT NULL,
  `createtime` int(10) unsigned NOT NULL,
  `modifieruuid` int(10) unsigned NOT NULL,
  `modifytime` int(10) unsigned NOT NULL,
  `orgid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of keys
-- ----------------------------
INSERT INTO `keys` VALUES ('24', '121', '24795', null, '计算机钥匙1', 'y', 'onhook', '无', '24729', '1648702979', '24729', '1649500022', '70');
INSERT INTO `keys` VALUES ('25', '122', '24795', null, '计算机钥匙2', 'y', 'onhook', '无', '24729', '1648702994', '24729', '1649507287', '70');
INSERT INTO `keys` VALUES ('26', '123', '24795', null, '计算机钥匙3', 'y', 'onhook', '无', '24729', '1648703010', '24729', '1649429729', '70');
INSERT INTO `keys` VALUES ('27', '124', '24795', null, '计算机钥匙4', 'y', 'onhook', '无', '24729', '1648703024', '24795', '1649428188', '70');
INSERT INTO `keys` VALUES ('28', '125', '24795', null, '计算机钥匙5', 'y', 'onhook', '无', '24729', '1648703041', '24729', '1649492987', '70');
INSERT INTO `keys` VALUES ('29', '126', '24795', null, '计算机钥匙6', 'y', 'onhook', '无', '24729', '1648703055', '24795', '1649428188', '70');
INSERT INTO `keys` VALUES ('30', '127', '24795', null, '计算机钥匙7', 'y', 'offhook', '无', '24729', '1648703074', '24795', '1649428188', '70');
INSERT INTO `keys` VALUES ('31', '128', '24795', '24725', '计算机钥匙8', 'y', 'offhook', '无', '24729', '1648703089', '24729', '1649492633', '70');
INSERT INTO `keys` VALUES ('32', '129', '24795', '24729', '计算机钥匙9', 'y', 'offhook', '无', '24729', '1648703101', '24729', '1649492956', '70');
INSERT INTO `keys` VALUES ('33', '130', '24795', null, 'cs2钥匙1', 'y', 'onhook', '无', '24729', '1649470239', '24795', '1649470504', '70');
INSERT INTO `keys` VALUES ('34', '131', '24795', null, 'cs2钥匙2', 'y', 'onhook', '无', '24729', '1649470255', '24795', '1649470514', '70');
INSERT INTO `keys` VALUES ('35', '132', '24795', null, 'cs2钥匙3', 'n', 'instock', '无', '24729', '1649470270', '24795', '1649470433', '70');
INSERT INTO `keys` VALUES ('36', null, '24795', null, 'cs3钥匙1', 'n', 'instock', '无', '24729', '1649470291', '24795', '1649814810', '70');
INSERT INTO `keys` VALUES ('37', '134', '24795', null, '软件钥匙1', 'y', 'onhook', '无', '24729', '1649470305', '24729', '1649470621', '69');
INSERT INTO `keys` VALUES ('38', null, '24795', null, '软件钥匙1', 'n', 'instock', null, '24729', '1649477315', '24729', '1649477315', '72');
INSERT INTO `keys` VALUES ('39', '136', '24795', null, 'cs4钥匙1', 'y', 'onhook', '无', '24729', '1649480072', '24795', '1649480493', '70');
INSERT INTO `keys` VALUES ('40', '139', '24795', null, 'cs5钥匙1', 'y', 'onhook', '无', '24729', '1649505916', '24795', '1649507094', '70');
INSERT INTO `keys` VALUES ('41', '133', '24729', null, '新钥匙', 'y', 'onhook', '无', '24729', '1649814443', '24729', '1649814852', '70');

-- ----------------------------
-- Table structure for organizations
-- ----------------------------
DROP TABLE IF EXISTS `organizations`;
CREATE TABLE `organizations` (
  `id` int(10) unsigned NOT NULL DEFAULT 0,
  `fid` int(10) unsigned DEFAULT NULL,
  `tagid` int(10) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `adminuid` int(10) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of organizations
-- ----------------------------
INSERT INTO `organizations` VALUES ('1', null, '100', '华东师范大学', '15750');
INSERT INTO `organizations` VALUES ('2', '70', '100', '通信与电子工程学院', '15750');
INSERT INTO `organizations` VALUES ('3', '69', '100', '计算机科学技术系', '15750');
INSERT INTO `organizations` VALUES ('4', '2', '100', '通信工程系', '15750');
INSERT INTO `organizations` VALUES ('5', '2', '100', '电子工程系', '15750');
INSERT INTO `organizations` VALUES ('6', '1', '100', '理工学院', '15750');
INSERT INTO `organizations` VALUES ('7', '49', '100', '计算中心', '15750');
INSERT INTO `organizations` VALUES ('8', '6', '100', '数学系', '15750');
INSERT INTO `organizations` VALUES ('9', '6', '100', '物理学系', '15750');
INSERT INTO `organizations` VALUES ('10', '6', '100', '化学系', '15750');
INSERT INTO `organizations` VALUES ('14', '1', '100', '心理学系', '15750');
INSERT INTO `organizations` VALUES ('45', '1', '100', '企业管理系', '15750');
INSERT INTO `organizations` VALUES ('46', '1', '100', '会计学系', '15750');
INSERT INTO `organizations` VALUES ('47', '1', '100', '国际贸易系', '15750');
INSERT INTO `organizations` VALUES ('48', '1', '100', '信息学系', '15750');
INSERT INTO `organizations` VALUES ('49', '70', '100', '软件工程学院', '15750');
INSERT INTO `organizations` VALUES ('50', '1', '100', '旅游学系', '15750');
INSERT INTO `organizations` VALUES ('64', '49', '100', '软件科学与技术系', '15750');
INSERT INTO `organizations` VALUES ('65', '49', '100', '嵌入式软件与系统系', '15750');
INSERT INTO `organizations` VALUES ('66', '49', '100', '密码与网络安全系', '15750');
INSERT INTO `organizations` VALUES ('67', '49', '100', '数据科学与工程系', '15750');
INSERT INTO `organizations` VALUES ('70', '1', '100', '计算机学院', '15750');
INSERT INTO `organizations` VALUES ('71', '70', '100', '数据科学与工程学院', '15750');
INSERT INTO `organizations` VALUES ('72', '70', '100', '软件学院', '15750');

-- ----------------------------
-- Table structure for orgclientsystems
-- ----------------------------
DROP TABLE IF EXISTS `orgclientsystems`;
CREATE TABLE `orgclientsystems` (
  `id` int(10) unsigned NOT NULL DEFAULT 0,
  `orgid` int(10) unsigned NOT NULL,
  `adminuid` int(10) unsigned DEFAULT NULL,
  `clientsystemname` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientsystemenname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientsystemzhname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of orgclientsystems
-- ----------------------------
INSERT INTO `orgclientsystems` VALUES ('19', '70', '15750', 'keybox', null, '钥匙箱管理系统');
INSERT INTO `orgclientsystems` VALUES ('26', '69', '15750', 'keybox', null, '钥匙箱管理系统');

-- ----------------------------
-- Table structure for tagclientsystems
-- ----------------------------
DROP TABLE IF EXISTS `tagclientsystems`;
CREATE TABLE `tagclientsystems` (
  `id` int(10) unsigned NOT NULL DEFAULT 0,
  `tagid` int(10) unsigned DEFAULT NULL,
  `adminuuid` int(10) unsigned DEFAULT NULL,
  `clientsystemname` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientsystemenname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `clientsystemzhname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of tagclientsystems
-- ----------------------------
INSERT INTO `tagclientsystems` VALUES ('13', '100', '2', 'keybox', null, '钥匙箱管理系统');

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` int(10) unsigned NOT NULL DEFAULT 0,
  `enname` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '英文缩写',
  `zhname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '中文名字',
  `adminuuid` int(10) unsigned NOT NULL DEFAULT 2
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of tags
-- ----------------------------
INSERT INTO `tags` VALUES ('2', 'username', '用户名', '2');
INSERT INTO `tags` VALUES ('3', 'email', 'Email', '2');
INSERT INTO `tags` VALUES ('100', 'ecnu', '华东师范大学', '2');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) unsigned DEFAULT 0,
  `uuid` int(3) unsigned DEFAULT NULL,
  `realname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tagid` int(10) unsigned DEFAULT 0,
  `tagenname` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '英文缩写',
  `tagzhname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '中文名字'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('15750', '2', '老师A', '20080089', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('20547', '2', '金健', 'jyginger', '2', 'username', '用户名');
INSERT INTO `users` VALUES ('20904', '21939', '张劲杰', '10165102249', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('20959', '21994', '童逸文', '10165102255', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('21376', '22404', '张楠1', '10160350119', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('21449', '22477', '吴臻愿', '10175102101', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('21500', '22528', '阿布都赛米·阿布力肯木', '10175102152', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('24302', '25336', '梅金玲', '10185102158', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('24323', '25357', '王灿博', '10185102248', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('24324', '25358', '齐福霖', '10185102247', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('24325', '25359', '申晓丹', '10185102246', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('24329', '25363', '刘冰琰', '10185102145', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('24343', '25377', '陈志鹏', '10185102238', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('24359', '25393', '叶莉莉', '10185102130', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('24387', '25421', '张泓潋', '10185102215', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('24390', '25424', '文舒锜', '10185102115', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('24395', '25429', '张宇晴', '10185102111', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('24414', '25448', '张欣怡', '10185102201', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('24725', '25758', '李四', '10195102510', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('24729', '25762', '张三', '10195102506', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('24731', '25764', '王琛楠', '10195102504', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('24733', '25766', '余晗', '10195102502', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('24735', '25768', '邬睿欣', '10195102500', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('24737', '25770', '李明洋', '10195102498', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('24739', '25772', '朱宇凌', '10195102496', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('24741', '25774', '瓦一敬', '10195102494', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('24743', '25776', '肖莹晶', '10195102492', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('24755', '25788', '吴宜虹', '10195102480', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('24779', '25812', '车明亮', '10195102456', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('24786', '25819', '高弋涵', '10195102449', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('24791', '25824', '周永康', '10195102444', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('24794', '25827', '陈元庆', '10195102441', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('24795', '25828', '王五', '10195102440', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('24798', '25831', '高月', '10195102437', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('24807', '25840', '李苏', '10195102428', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('24816', '25849', '倪寻珂', '10195102419', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('24832', '25865', '毛宇杰', '10195102403', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('25176', '26213', '卜佳', '10205102486', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('25182', '26219', '崔梦珊', '10205102480', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('25195', '26232', '王诗琴', '10205102467', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('25199', '26236', '王文婷', '10205102463', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('25211', '26248', '李琳', '10205102451', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('25227', '26264', '杨曜铭', '10205102434', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('25232', '26269', '陈皓', '10205102429', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('25260', '26297', '代洋涤', '10205102401', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('25264', '26301', '林霁', '10194810417', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('25943', '26979', '张白岩', '51215901078', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('26204', '27240', '王熙若', '10200110057', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('26205', '27241', '张鼎云', '10192900474', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('26206', '27242', '何楚韵', '10204810424', '100', 'ecnu', '华东师范大学');
INSERT INTO `users` VALUES ('26207', '27243', '李一帆', '10184102137', '100', 'ecnu', '华东师范大学');

-- ----------------------------
-- Procedure structure for createtable
-- ----------------------------
DROP PROCEDURE IF EXISTS `createtable`;
DELIMITER ;;
CREATE DEFINER=`keybox`@`localhost` PROCEDURE `createtable`(
	IN dbname varchar(255), 
	IN tablename varchar(255), 
	IN selects text
)
BEGIN
	DECLARE errno int DEFAULT 0;
	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION,SQLWARNING,NOT FOUND set errno=1;
	IF TRUE THEN
		SET @sql = CONCAT('DROP TABLE IF EXISTS ',dbname,'_',tablename);PREPARE s FROM @sql;EXECUTE s;DEALLOCATE PREPARE s;
		SET @sql = CONCAT('CREATE TABLE ',dbname,'_',tablename,' AS ',selects);PREPARE s FROM @sql;EXECUTE s;DEALLOCATE PREPARE s;
		SELECT errno;
	END IF;
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for createview
-- ----------------------------
DROP PROCEDURE IF EXISTS `createview`;
DELIMITER ;;
CREATE DEFINER=`keybox`@`localhost` PROCEDURE `createview`(
    IN dbname varchar(255),
    IN viewname varchar(255),
    IN selects text
)
BEGIN
    DECLARE errno int DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION,SQLWARNING,NOT FOUND set errno=1;
    IF TRUE THEN
        SET @sql = CONCAT('DROP VIEW IF EXISTS ',dbname,'.',viewname);PREPARE s FROM @sql;EXECUTE s;DEALLOCATE PREPARE s;
        SET @sql = CONCAT('CREATE ALGORITHM=TEMPTABLE DEFINER=`root`@`localhost` SQL SECURITY
DEFINER VIEW ',dbname,'.',viewname,' AS ',selects);PREPARE s FROM @sql;EXECUTE s;DEALLOCATE
PREPARE s;
        SELECT errno;
    END IF;
END
;;
DELIMITER ;
