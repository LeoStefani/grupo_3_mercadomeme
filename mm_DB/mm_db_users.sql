CREATE DATABASE  IF NOT EXISTS `mm_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `mm_db`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mm_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.13-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `avatar` varchar(150) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `dni` int(10) unsigned DEFAULT NULL,
  `phone_0` bigint(20) unsigned DEFAULT NULL,
  `phone_1` bigint(20) unsigned DEFAULT NULL,
  `phone_2` bigint(20) unsigned DEFAULT NULL,
  `credit_card_0` bigint(20) unsigned DEFAULT NULL,
  `credit_card_1` bigint(20) unsigned DEFAULT NULL,
  `credit_card_2` bigint(20) unsigned DEFAULT NULL,
  `credit_card_3` bigint(20) unsigned DEFAULT NULL,
  `address_0` varchar(200) DEFAULT NULL,
  `address_1` varchar(200) DEFAULT NULL,
  `address_2` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `dni_UNIQUE` (`dni`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'PapaRepka','leonelstefani@gmail.com','123123123','heisenberg.jpeg','Walter','White',13456789,1122334455,1121345465,NULL,1234567812345678,1324576813245768,NULL,NULL,'308 Negra Arroyo Lane, Alburquerque, Nuevo México','3828 Piermont Drive, Alburquerque, Nuevo México',NULL),(2,'123123123','123123123@123123123.com','$2b$10$oNXL2xhlVR13VX/cxlVV4OgY5IKMsIAWm2FHnpReh5Fd6ECFlMa9e','iconoImagenBordesIguales.png',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'111111111','11111@1111.com','$2b$10$XKekD8Is3e4kmO9pBhfl9O0pHrgn4C6P.O3STSkmtLA73qIvL49ri','iconoImagenBordesIguales.png',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(6,'ladefinitiva','ladefinitiva@definitva.com','$2b$10$Yiv5mry706.d1KHn3fN5Te9KZHOCjtAKl8re/R68XSjEe03HQ8Qii','userImg-1596589973158.png',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(11,'1','1@1.com','$2b$10$n4UdSIrp4czD/7r9.cTcruBzNfGhJDxEA7WVDqUqmfMNhxDihGBuy','iconoImagenBordesIguales.png',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(16,'adadasd','2222@22.com','$2b$10$aPh3IzFDIO/EU5dz5wVfEeQia8fKxnR2DwGlgz5DJtR5ixzS1qsKW','iconoImagenBordesIguales.png',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(17,'ladefi','ladefi@gmail.com','$2b$10$SNSbEKzLqMz5IEpyI3/XheK.PKo.jqECQB.PL6eyBKKNHwaNTZIRq','iconoImagenBordesIguales.png',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(20,'ssssssssssssss','dddddd@ddd.com','$2b$10$T0tM4AEzTtzrSPSp7EmS7.1kdg.D7fdr9B1cavtI2UIcAXN099YSe','iconoImagenBordesIguales.png',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(28,'9887654','76@stga.com','$2b$10$RE7B3obz3nDqIR65LwrJxehvWheCcWdg8qhbg0l4AJ0jB4gU9w0qG','iconoImagenBordesIguales.png',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(47,'','1231321@232.com','$2b$10$ahAOp05dHVp98W89dmoDdOZfs.CE.MQXX1IcspbvLaGRTCNigaZ56','iconoImagenBordesIguales.png',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-08 16:59:31
