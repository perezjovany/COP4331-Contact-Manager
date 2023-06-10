-- MySQL dump 10.13  Distrib 8.0.33, for Linux (x86_64)
--
-- Host: localhost    Database: COP4331
-- ------------------------------------------------------
-- Server version	8.0.33-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Colors`
--

DROP TABLE IF EXISTS `Colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Colors` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL DEFAULT '',
  `UserID` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Colors`
--

LOCK TABLES `Colors` WRITE;
/*!40000 ALTER TABLE `Colors` DISABLE KEYS */;
INSERT INTO `Colors` VALUES (1,'Blue',1),(2,'White',1),(3,'Black',1),(4,'gray',1),(5,'Magenta',1),(6,'Yellow',1),(7,'Cyan',1),(8,'Salmon',1),(9,'Chartreuse',1),(10,'Lime',1),(11,'Light Blue',1),(12,'Light Gray',1),(13,'Light Red',1),(14,'Light Green',1),(15,'Chiffon',1),(16,'Fuscia',1),(17,'Brown',1),(18,'Beige',1),(19,'Blue',3),(20,'White',3),(21,'Black',3),(22,'gray',3),(23,'Magenta',3),(24,'Yellow',3),(25,'Cyan',3),(26,'Salmon',3),(27,'Chartreuse',3),(28,'Lime',3),(29,'Light Blue',3),(30,'Light Gray',3),(31,'Light Red',3),(32,'Light Green',3),(33,'Chiffon',3),(34,'Fuscia',3),(35,'Brown',3),(36,'Beige',3),(37,'Green',1),(38,'Green',1),(39,'Green',2),(40,'Green',2),(41,'Green',1),(42,'Green',100),(43,'Green',1),(44,'orange',1),(45,'Blue Green',1);
/*!40000 ALTER TABLE `Colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Contacts`
--

DROP TABLE IF EXISTS `Contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Contacts` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL DEFAULT '',
  `Phone` varchar(50) NOT NULL DEFAULT '',
  `Email` varchar(50) NOT NULL DEFAULT '',
  `UserID` int NOT NULL DEFAULT '0',
  `DateCreated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `FK_Contacts_Users` (`UserID`),
  CONSTRAINT `FK_Contacts_Users` FOREIGN KEY (`UserID`) REFERENCES `Users` (`ID`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Contacts`
--

LOCK TABLES `Contacts` WRITE;
/*!40000 ALTER TABLE `Contacts` DISABLE KEYS */;
INSERT INTO `Contacts` VALUES (1,'John Doe','123-456-7890','john.doe@example.com',1,'2023-05-28 21:52:55'),(2,'Jane Smith','987-654-3210','jane.smith@example.com',1,'2023-05-28 21:52:55'),(3,'Alice Johnson','555-123-4567','alice.johnson@example.com',1,'2023-05-28 21:52:55'),(4,'Robert Williams','111-222-3333','robert.williams@example.com',2,'2023-05-28 21:53:55'),(5,'Emily Davis','444-555-6666','emily.davis@example.com',2,'2023-05-28 21:53:55'),(6,'Michael Wilson','777-888-9999','michael.wilson@example.com',2,'2023-05-28 21:53:55');
/*!40000 ALTER TABLE `Contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `DateCreated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DateLastLoggedIn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `FirstName` varchar(50) NOT NULL DEFAULT '',
  `LastName` varchar(50) NOT NULL DEFAULT '',
  `Login` varchar(50) NOT NULL DEFAULT '',
  `Password` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID`)
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'2023-05-18 13:36:22','2023-05-18 13:36:22','Rick','Leinecker','RickL','COP4331'),(2,'2023-05-18 13:36:22','2023-05-18 13:36:22','Sam','Hill','SamH','Test'),(3,'2023-05-18 13:36:22','2023-05-18 13:36:22','Rick','Leinecker','RickL','5832a71366768098cceb7095efb774f2'),(4,'2023-05-18 13:36:23','2023-05-18 13:36:23','Sam','Hill','SamH','0cbc6611f5540bd0809a388dc95a615b'),(5,'2023-05-28 22:01:15','2023-05-28 22:01:15','Michael','Brown','mbrown','securepass'),(6,'2023-05-28 22:30:37','2023-05-28 22:30:37','Emily','Wilson','emilywilson','pass123'),(7,'2023-05-28 22:32:21','2023-05-28 22:32:21','David','Johnson','davidjohnson','secure123'),(8,'2023-05-29 00:34:22','2023-05-29 00:34:22','David','Johnson','davidjohnson1','secure123');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-01 20:51:47
