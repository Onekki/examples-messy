-- -------------------------------------------------------------
-- TablePlus 2.8.2(256)
--
-- https://tableplus.com/
--
-- Database: ohmysite
-- Generation Time: 2019-08-31 17:05:05.8880
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `t_perm`;
CREATE TABLE `t_perm` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL COMMENT '权限代码',
  `name` varchar(255) DEFAULT NULL COMMENT '权限名称',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_role`;
CREATE TABLE `t_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '角色名',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_role_perm`;
CREATE TABLE `t_role_perm` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rid` int(11) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `rid` (`rid`),
  KEY `pid` (`pid`),
  CONSTRAINT `t_role_perm_ibfk_1` FOREIGN KEY (`rid`) REFERENCES `t_role` (`id`),
  CONSTRAINT `t_role_perm_ibfk_2` FOREIGN KEY (`pid`) REFERENCES `t_perm` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL COMMENT '用户名',
  `nickname` varchar(255) DEFAULT NULL COMMENT '昵称',
  `password` varchar(255) DEFAULT NULL COMMENT '密码',
  `avatar_url` varchar(255) DEFAULT NULL COMMENT '头像路径',
  `phone` varchar(255) DEFAULT NULL COMMENT '号码',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `register_time` datetime DEFAULT NULL COMMENT '注册时间',
  `login_time` datetime DEFAULT NULL COMMENT '上次登录时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `t_user_role`;
CREATE TABLE `t_user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `rid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `uid` (`uid`),
  KEY `rid` (`rid`),
  CONSTRAINT `t_user_role_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `t_user` (`id`),
  CONSTRAINT `t_user_role_ibfk_2` FOREIGN KEY (`rid`) REFERENCES `t_role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

DROP VIEW IF EXISTS `v_perm`;


INSERT INTO `t_perm` (`id`, `code`, `name`) VALUES ('1', 'article:list', '文章列表'),
('2', 'article:save', '保存文章'),
('3', 'article:remove', '删除文章');

INSERT INTO `t_role` (`id`, `name`) VALUES ('1', '管理员'),
('2', '普通用户'),
('3', '游客');

INSERT INTO `t_role_perm` (`id`, `rid`, `pid`, `create_time`, `update_time`) VALUES ('1', '1', '2', '2019-08-29 15:11:39', '2019-08-30 09:06:00'),
('2', '1', '3', '2019-08-29 15:15:01', '2019-08-30 09:06:00');

INSERT INTO `t_user` (`id`, `username`, `nickname`, `password`, `avatar_url`, `phone`, `email`, `register_time`, `login_time`) VALUES ('1', 'onekki', 'Onekki', '123456', NULL, '18852724681', '285079772@qq.com', '2019-01-01 00:00:00', NULL);

INSERT INTO `t_user_role` (`id`, `uid`, `rid`) VALUES ('1', '1', '1');

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `v_perm` AS select `tu`.`id` AS `uid`,`tu`.`username` AS `username`,`tu`.`nickname` AS `nickname`,`tr`.`name` AS `role_name`,`tp`.`code` AS `perm_code`,`tp`.`name` AS `perm_name` from ((((`t_user` `tu` left join `t_user_role` `tur` on((`tu`.`id` = `tur`.`uid`))) left join `t_role` `tr` on((`tr`.`id` = `tur`.`rid`))) left join `t_role_perm` `trp` on((`tr`.`id` = `trp`.`rid`))) left join `t_perm` `tp` on((`trp`.`pid` = `tp`.`id`)));


/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;