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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `size_unit` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Tazas','ml'),(2,'Mochilas','lts'),(3,'Accesorios','cm'),(4,'Remeras','cm'),(5,'Abrigos','cm');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `colors` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `code` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colors`
--

LOCK TABLES `colors` WRITE;
/*!40000 ALTER TABLE `colors` DISABLE KEYS */;
INSERT INTO `colors` VALUES (1,'rojo','#FF0000'),(2,'azul','#0000FF'),(3,'blanco','#ffffff'),(4,'negro','#000000'),(5,'verde','#008000'),(6,'amarillo','#ffff00'),(7,'gris','#808080'),(8,'rosa','#ffc0cb'),(9,'marrón','#a52a2a');
/*!40000 ALTER TABLE `colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `images` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `id_product_image` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `id_product_image_idx` (`id_product_image`),
  CONSTRAINT `id_product_image` FOREIGN KEY (`id_product_image`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'imgProduct-1596581084823.png',1),(2,'imgProduct-1596581221067.png',2),(3,'imgProduct-1596681221067.png',2),(4,'imgProduct-1596681221068.png',2),(5,'imgProduct-1596581308555.png',53),(33,'imgProduct-1596581467913.png',54),(34,'imgProduct-1596681221069.png',54),(35,'imgProduct-1596681221070.png',54),(36,'imgProduct-1596681221071.png',54),(37,'imgProduct-1596581543118.png',55),(38,'imgProduct-1596681221075.png',55),(39,'imgProduct-1596681221076.png',55),(40,'imgProduct-1596681221077.png',55),(41,'imgProduct-1596581620394.png',56),(42,'imgProduct-1596581693167.png',57),(43,'imgProduct-1596681221072.png',57),(44,'imgProduct-1596681221073.png',57),(45,'imgProduct-1596681221074.png',57),(46,'imgProduct-1596581924218.png',58),(47,'imgProduct-1596681221078.png',58),(48,'imgProduct-1596681221079.png',58),(49,'imgProduct-1596582174297.png',59),(50,'imgProduct-1596681221080.png',59),(51,'imgProduct-1596681221081.png',59),(52,'imgProduct-1596582234992.png',60),(53,'imgProduct-1596681221082.png',60),(54,'imgProduct-1596681221083.png',60),(55,'imgProduct-1596582364103.png',61),(56,'imgProduct-1596582441137.png',62),(57,'imgProduct-1596681221084.png',62),(58,'imgProduct-1596681221085.png',62),(59,'imgProduct-1596582574462.png',63),(60,'imgProduct-1596681221086.png',63),(61,'imgProduct-1596681221087.png',63),(62,'imgProduct-1596681221088.png',63),(63,'imgProduct-1596582673660.png',64),(64,'imgProduct-1596681221089.png',64),(65,'imgProduct-1596681221090.png',64),(66,'imgProduct-1596681221091.png',64),(67,'imgProduct-1596582768415.png',65);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_color`
--

DROP TABLE IF EXISTS `product_color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_color` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `id_product` int(10) NOT NULL,
  `id_color` int(10) NOT NULL,
  `status` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_product_idx` (`id_product`),
  KEY `id_color_idx` (`id_color`),
  CONSTRAINT `id_color` FOREIGN KEY (`id_color`) REFERENCES `colors` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_product` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_color`
--

LOCK TABLES `product_color` WRITE;
/*!40000 ALTER TABLE `product_color` DISABLE KEYS */;
INSERT INTO `product_color` VALUES (1,1,1,1),(2,1,2,1),(3,1,3,1),(4,2,1,1),(5,2,2,1),(6,2,4,1),(48,53,2,1),(49,53,3,1),(50,53,6,1),(51,53,8,1),(52,54,1,1),(53,54,2,1),(54,54,3,1),(55,54,8,1),(56,55,1,1),(57,55,2,1),(58,55,3,1),(59,55,4,1),(60,56,3,1),(61,56,4,1),(62,57,2,1),(63,57,3,1),(64,57,8,1),(65,58,1,1),(66,58,2,1),(67,58,7,1),(68,59,1,1),(69,59,4,1),(70,59,7,1),(71,60,1,1),(72,60,2,1),(73,60,7,1),(74,61,2,1),(75,61,4,1),(76,61,7,1),(77,62,1,1),(78,62,2,1),(79,62,6,1),(80,63,1,1),(81,63,2,1),(82,63,3,1),(83,63,6,1),(84,64,1,1),(85,64,2,1),(86,64,4,1),(87,65,1,1),(88,65,3,1),(89,65,5,1);
/*!40000 ALTER TABLE `product_color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `price` decimal(10,0) unsigned NOT NULL,
  `qty_sold` int(10) unsigned DEFAULT NULL,
  `id_category` int(10) NOT NULL,
  `status` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `id_category_idx` (`id_category`),
  CONSTRAINT `id_category` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Taza cerámica','Taza cerámica estándar. Fino y suave acabado. Fácil de lavar. Con asas para tomar bebidas calientes sin quemarte!',250,15,1,1),(2,'Taza mágica','La taza mágica cambia de color con bebidas calientes. Agregale un meme y sorprendé a quien quieras!',400,250,1,1),(53,'Taza térmica','Ideal para bebidas calientes. Para tomar té o café fuera de casa, o de camino al trabajo!',350,180,1,1),(54,'Remera hombre','Remera de hombre lisa con cuello redondo. Ideal para cualquier tipo de personalización.',750,296,4,1),(55,'Remera mujer','Remera de mujer, lisa con cuello redondo. Ideal para cualquier tipo de personalización.',750,155,4,1),(56,'Musculosa','Musculosa de hombre lisa. Ideal para los días mas calurosos! 100% algodón.',950,24,4,1),(57,'Remera cuello en V','Remera de hombre cuello en \"V\". Para darle un toque mas fino y elegante. 100% algodón',1200,214,4,1),(58,'Buzo unisex','Buzo unisex 100% algodón.',1800,18,5,1),(59,'Buzo canguro','Buzo canguro unisex. 100% algodón. Amplio bolsillo para meter las manos.',2000,241,5,1),(60,'Campera unisex','Campera unisex. 100% algodón. Con capucha.',2300,96,5,1),(61,'Mochila notebook','Mochila para notebook. Amplio espacio. Apta para notebooks de hasta 17\" en su versión \"L\"',3500,109,2,1),(62,'Mochila sport','Mochila sport, ideal para el día a día. Elegila en sus dos tamaños, estandar y mini para llevar objetos personales.',1800,74,2,1),(63,'Sacola','Sacola lisa. Ideal llevar tus pertenencias de manera fácil y liviana.',900,230,2,1),(64,'Gorra unisex','Gorra bi color, unisex. Ideal para protegerte los días de mucho sol.',400,169,3,1),(65,'Totebag','Totebag de tela. Ideal para el super y las compras. Lavable y reutilizable.',250,212,3,1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sizes`
--

DROP TABLE IF EXISTS `sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sizes` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `tag` varchar(45) NOT NULL,
  `size_main` int(10) unsigned NOT NULL,
  `size_secondary` int(10) unsigned DEFAULT NULL,
  `id_product_size` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_product_size_idx` (`id_product_size`),
  CONSTRAINT `id_product_size` FOREIGN KEY (`id_product_size`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sizes`
--

LOCK TABLES `sizes` WRITE;
/*!40000 ALTER TABLE `sizes` DISABLE KEYS */;
INSERT INTO `sizes` VALUES (1,'M',250,NULL,1),(2,'L',350,NULL,1),(3,'M',250,NULL,2),(4,'L',350,NULL,2),(53,'M',250,NULL,53),(54,'L',500,NULL,53),(55,'XL',750,NULL,53),(56,'S',60,NULL,54),(57,'M',80,NULL,54),(58,'L',110,NULL,54),(59,'S',50,NULL,55),(60,'M',65,NULL,55),(61,'L',90,NULL,55),(62,'S',60,NULL,56),(63,'M',80,NULL,56),(64,'L',110,NULL,56),(65,'S',60,NULL,57),(66,'M',80,NULL,57),(67,'L',110,NULL,57),(68,'S',70,NULL,58),(69,'M',90,NULL,58),(70,'L',120,NULL,58),(71,'S',70,NULL,59),(72,'M',90,NULL,59),(73,'L',110,NULL,59),(74,'S',70,NULL,60),(75,'M',90,NULL,60),(76,'L',110,NULL,60),(77,'M',12,NULL,61),(78,'L',18,NULL,61),(79,'XS',5,NULL,62),(80,'M',12,NULL,62),(81,'S',8,NULL,63),(82,'L',15,NULL,63),(83,'M',10,NULL,63),(84,'M',20,NULL,64),(85,'L',25,NULL,64),(86,'S',25,NULL,65),(87,'M',40,NULL,65),(88,'L',50,NULL,65);
/*!40000 ALTER TABLE `sizes` ENABLE KEYS */;
UNLOCK TABLES;

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

-- Dump completed on 2020-08-28 17:17:51
