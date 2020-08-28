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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Tazas','ml'),(2,'Mochilas','lts'),(3,'Accesorios','cm');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'imgProduct-1596581084823.png',1),(2,'imgProduct-1596581221067.png',2),(3,'imgProduct-1596681221067.png',2),(4,'imgProduct-1596681221068.png',2);
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
  PRIMARY KEY (`id`),
  KEY `id_product_idx` (`id_product`),
  KEY `id_color_idx` (`id_color`),
  CONSTRAINT `id_color` FOREIGN KEY (`id_color`) REFERENCES `colors` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_product` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_color`
--

LOCK TABLES `product_color` WRITE;
/*!40000 ALTER TABLE `product_color` DISABLE KEYS */;
INSERT INTO `product_color` VALUES (1,1,1),(2,1,2),(3,1,3),(4,2,1),(5,2,2),(6,2,4);
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `id_category_idx` (`id_category`),
  CONSTRAINT `id_category` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Taza cerámica','Taza cerámica estándar. Fino y suave acabado. Fácil de lavar. Con asas para tomar bebidas calientes sin quemarte!',250,15,1),(2,'Taza mágica','La taza mágica cambia de color con bebidas calientes. Agregale un meme y sorprendé a quien quieras!',400,250,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sizes`
--

LOCK TABLES `sizes` WRITE;
/*!40000 ALTER TABLE `sizes` DISABLE KEYS */;
INSERT INTO `sizes` VALUES (1,'m',250,NULL,1),(2,'l',350,NULL,1),(3,'m',250,NULL,2),(4,'l',350,NULL,2);
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
  `admin` int(2) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `dni_UNIQUE` (`dni`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (80,'PapaRepka','leonelstefani@gmail.com','$2b$10$5j7RNPq09JAc/Fwlj9nv/.7y6n4UqLy4pVp8RPrSSKG38EOfEKGR.','userImg-1598204870655.jpeg','Leonel','Stefani',33087455,1121737238,1122334455,NULL,5547302373315927,345978135506849,NULL,NULL,'308 Negra Arroyo Lane, Albuquerque, Nuevo Mexico',NULL,NULL,0),(81,'username2','prueba1@prueba.com','$2b$10$VlGSjDa4FXJCq3IJ7T6NAeGX1LQgtAXMAYfb3Pa/HIr3V8pLjSOfu','usuario.png','Nombre','Apellidoubvh',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(82,'prueba5','prueba2@prueba2.com','$2b$10$46VGmAZhIla25xpC21XvfeGu4AJbsy.qOSTlMQ0mcj8pJx6TrHtsi','avatar-1598406646225.png','Nombre','Apellido',22222223,1122334455,NULL,NULL,371734210289935,NULL,NULL,NULL,NULL,NULL,NULL,0),(85,'paparepka222','leonelstefan22i@gmail.com','$2b$10$nRu2RH0BIWBgX7UlI.Xame3xQLZzXaa60F249imdm5OAXrz0O45he','usuario.png',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(86,'pruebajs','pruebajs@pruebajs.com','$2b$10$k04OQtYXO.jEHcGs9gMGkOkAhe8Y92AF97QlKLE2275C2DKKk0EVW','usuario.png',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(87,'pruebajscompleta','pruebajscompleta@pruebajscompleta.com','$2b$10$UfjcqtIbYPcc2aDN2FVBU.x0GJEs5mV.etlJl6MjAvo9tv4g25YVi','usuario.png',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(88,'pruebajs2','pruebajs2@pruebajs2.com','$2b$10$mK4DBF9eF13OogrkfayuRuSJBbUmov7yXYCm8p6M1hQKm9ZGjvXVi','usuario.png',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(90,'PapaRepka2','leonelstefani2@gmail.com','$2b$10$UEdbiU/6Y8vVO3WOAk3Rn.irFDMgBQdDHQjOsNZ.NK1BSVSuxxzgC','usuario.png',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(92,'admin','admin@admin.com','$2b$10$uTmVrNAm3uQ3YyHUpVW9su/.kbvpG4GFy4oegM4t5G0wxWneZFT/q','avatar-1598567736880.png','El','Admin',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1);
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

-- Dump completed on 2020-08-28 17:19:42
