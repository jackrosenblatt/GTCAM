-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `Allergies`
--
use db;
DROP TABLE IF EXISTS `Allergies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Allergies` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `allergyName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Allergies`
--

LOCK TABLES `Allergies` WRITE;
/*!40000 ALTER TABLE `Allergies` DISABLE KEYS */;
INSERT INTO `Allergies` VALUES (1,'Nuts'),(2,'Shellfish'),(3,'Gluten'),(4,'Dairy');
/*!40000 ALTER TABLE `Allergies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Appointments`
--

DROP TABLE IF EXISTS `Appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Appointments` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `patientID` int DEFAULT NULL,
  `docID` int DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `details` varchar(3000) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `docID` (`docID`),
  KEY `patientID` (`patientID`),
  CONSTRAINT `Appointments_ibfk_1` FOREIGN KEY (`docID`) REFERENCES `Doctors` (`ID`),
  CONSTRAINT `Appointments_ibfk_2` FOREIGN KEY (`patientID`) REFERENCES `Patients` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Appointments`
--

LOCK TABLES `Appointments` WRITE;
/*!40000 ALTER TABLE `Appointments` DISABLE KEYS */;
INSERT INTO `Appointments` VALUES (1,1,1,'2020-06-20 12:00:00','Will be meeting patient'),(2,2,1,'2020-06-20 13:00:00','Will be meeting patient'),(3,3,2,'2020-06-20 12:00:00','Will be meeting patient'),(4,4,3,'2020-06-20 12:00:00','Will be meeting patient');
/*!40000 ALTER TABLE `Appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Directions`
--

DROP TABLE IF EXISTS `Directions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Directions` (
  `directions` varchar(255) DEFAULT NULL,
  `ID` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Directions`
--

LOCK TABLES `Directions` WRITE;
/*!40000 ALTER TABLE `Directions` DISABLE KEYS */;
INSERT INTO `Directions` VALUES ('Take twice a day',1),('Once a day',2),('Three times a day',3),('Every other day',4);
/*!40000 ALTER TABLE `Directions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Doctors`
--

DROP TABLE IF EXISTS `Doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Doctors` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `userID` int DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Doctors`
--

LOCK TABLES `Doctors` WRITE;
/*!40000 ALTER TABLE `Doctors` DISABLE KEYS */;
INSERT INTO `Doctors` VALUES (1,5),(2,6),(3,7),(4,8);
/*!40000 ALTER TABLE `Doctors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Inventory`
--

DROP TABLE IF EXISTS `Inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Inventory` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `medID` int DEFAULT NULL,
  `pharmID` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `medID` (`medID`),
  KEY `pharmID` (`pharmID`),
  CONSTRAINT `Inventory_ibfk_1` FOREIGN KEY (`medID`) REFERENCES `Medications` (`ID`),
  CONSTRAINT `Inventory_ibfk_2` FOREIGN KEY (`pharmID`) REFERENCES `Pharmacies` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Inventory`
--

LOCK TABLES `Inventory` WRITE;
/*!40000 ALTER TABLE `Inventory` DISABLE KEYS */;
INSERT INTO `Inventory` VALUES (1,1,1,30),(2,1,2,40),(3,3,2,80),(4,2,3,60),(5,4,4,20);
/*!40000 ALTER TABLE `Inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Medications`
--

DROP TABLE IF EXISTS `Medications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Medications` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `medName` varchar(255) DEFAULT NULL,
  `dosage` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `details` varchar(3000) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Medications`
--

LOCK TABLES `Medications` WRITE;
/*!40000 ALTER TABLE `Medications` DISABLE KEYS */;
INSERT INTO `Medications` VALUES (1,'Aspirin','500mg',30,'Take with food'),(2,'Tylenol','600mg',30,'Take with food'),(3,'Azithromycin','250mg',10,'Take with food'),(4,'Vicodin','5mg/300mg',30,'Schedule II Narcotic');
/*!40000 ALTER TABLE `Medications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PatientAllergies`
--

DROP TABLE IF EXISTS `PatientAllergies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PatientAllergies` (
  `patientID` int NOT NULL,
  `allergyID` int NOT NULL,
  PRIMARY KEY (`patientID`,`allergyID`),
  KEY `allergyID` (`allergyID`),
  CONSTRAINT `PatientAllergies_ibfk_1` FOREIGN KEY (`allergyID`) REFERENCES `Allergies` (`ID`),
  CONSTRAINT `PatientAllergies_ibfk_2` FOREIGN KEY (`patientID`) REFERENCES `Patients` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PatientAllergies`
--

LOCK TABLES `PatientAllergies` WRITE;
/*!40000 ALTER TABLE `PatientAllergies` DISABLE KEYS */;
INSERT INTO `PatientAllergies` VALUES (1,1),(1,2),(3,3),(4,4);
/*!40000 ALTER TABLE `PatientAllergies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Patients`
--

DROP TABLE IF EXISTS `Patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Patients` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `notificationPref` varchar(255) DEFAULT NULL,
  `pharmacyPref` int DEFAULT NULL,
  `ssn` varchar(9) DEFAULT NULL,
  `userID` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ssn` (`ssn`),
  KEY `pharmacyPref` (`pharmacyPref`),
  CONSTRAINT `Patients_ibfk_1` FOREIGN KEY (`pharmacyPref`) REFERENCES `Pharmacies` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Patients`
--

LOCK TABLES `Patients` WRITE;
/*!40000 ALTER TABLE `Patients` DISABLE KEYS */;
INSERT INTO `Patients` VALUES (1,'Yes',1,'123456789',1),(2,'No',4,'987654321',2),(3,'Yes',3,'456123789',3),(4,'Yes',2,'789456132',4);
/*!40000 ALTER TABLE `Patients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pharmacies`
--

DROP TABLE IF EXISTS `Pharmacies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Pharmacies` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `pharmName` varchar(255) DEFAULT NULL,
  `pharmHours` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pharmacies`
--

LOCK TABLES `Pharmacies` WRITE;
/*!40000 ALTER TABLE `Pharmacies` DISABLE KEYS */;
INSERT INTO `Pharmacies` VALUES (1,'Walgreens','9am-8pm'),(2,'CVS','10am-9pm'),(3,'Kroger','9:30am-9:30pm'),(4,'Walgreens','24hr');
/*!40000 ALTER TABLE `Pharmacies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pharmacists`
--

DROP TABLE IF EXISTS `Pharmacists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Pharmacists` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `pharmID` int DEFAULT NULL,
  `userID` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `pharmID` (`pharmID`),
  CONSTRAINT `Pharmacists_ibfk_1` FOREIGN KEY (`pharmID`) REFERENCES `Pharmacies` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pharmacists`
--

LOCK TABLES `Pharmacists` WRITE;
/*!40000 ALTER TABLE `Pharmacists` DISABLE KEYS */;
INSERT INTO `Pharmacists` VALUES (1,1,9),(2,2,10),(3,3,11),(4,4,12);
/*!40000 ALTER TABLE `Pharmacists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PrescriptionDetails`
--

DROP TABLE IF EXISTS `PrescriptionDetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PrescriptionDetails` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `patientID` int DEFAULT NULL,
  `medID` int DEFAULT NULL,
  `pharmID` int DEFAULT NULL,
  `directions` int DEFAULT NULL,
  `docID` int DEFAULT NULL,
  `needRefill` tinyint(1) DEFAULT NULL,
  `subRetriever` varchar(200) DEFAULT NULL,
  `readyForPickup` tinyint(1) DEFAULT NULL,
  `pickupPrefTime` datetime DEFAULT NULL,
  `refillEvery` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `pharmID` (`pharmID`),
  KEY `docID` (`docID`),
  KEY `patientID` (`patientID`),
  KEY `medID` (`medID`),
  KEY `directions` (`directions`),
  KEY `refillEvery` (`refillEvery`),
  CONSTRAINT `PrescriptionDetails_ibfk_1` FOREIGN KEY (`pharmID`) REFERENCES `Pharmacies` (`ID`),
  CONSTRAINT `PrescriptionDetails_ibfk_2` FOREIGN KEY (`docID`) REFERENCES `Doctors` (`ID`),
  CONSTRAINT `PrescriptionDetails_ibfk_3` FOREIGN KEY (`patientID`) REFERENCES `Patients` (`ID`),
  CONSTRAINT `PrescriptionDetails_ibfk_4` FOREIGN KEY (`medID`) REFERENCES `Medications` (`ID`),
  CONSTRAINT `PrescriptionDetails_ibfk_5` FOREIGN KEY (`directions`) REFERENCES `Directions` (`ID`),
  CONSTRAINT `PrescriptionDetails_ibfk_6` FOREIGN KEY (`refillEvery`) REFERENCES `RefillOccurence` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PrescriptionDetails`
--

LOCK TABLES `PrescriptionDetails` WRITE;
/*!40000 ALTER TABLE `PrescriptionDetails` DISABLE KEYS */;
INSERT INTO `PrescriptionDetails` VALUES (1,1,1,1,1,1,0,'Mary Washington',0,'2020-06-20 12:00:00',1),(2,1,2,1,2,1,1,'Mary Washington',0,'2020-06-20 12:00:00',2),(3,2,2,3,3,1,1,'Bob Adams',0,'2020-06-20 12:00:00',3),(4,3,4,2,4,1,1,'Anna Jefferson',1,'2020-06-20 12:00:00',4);
/*!40000 ALTER TABLE `PrescriptionDetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RefillOccurence`
--

DROP TABLE IF EXISTS `RefillOccurence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RefillOccurence` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `numDays` int DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RefillOccurence`
--

LOCK TABLES `RefillOccurence` WRITE;
/*!40000 ALTER TABLE `RefillOccurence` DISABLE KEYS */;
INSERT INTO `RefillOccurence` VALUES (1,10),(2,15),(3,20),(4,30);
/*!40000 ALTER TABLE `RefillOccurence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserTypes`
--

DROP TABLE IF EXISTS `UserTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserTypes` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserTypes`
--

LOCK TABLES `UserTypes` WRITE;
/*!40000 ALTER TABLE `UserTypes` DISABLE KEYS */;
INSERT INTO `UserTypes` VALUES (1,'Patient'),(2,'Doctor'),(3,'Pharmacist');
/*!40000 ALTER TABLE `UserTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `ID` int NOT NULL DEFAULT '0',
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `type` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `type` (`type`),
  CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`type`) REFERENCES `UserTypes` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'George Washington','password','example@example.com',1),(2,'John Adams','password','example1@example.com',1),(3,'Thomas Jefferson','password','example2@example.com',1),(4,'James Madison','password','example3@example.com',1),(5,'John Smith','password','example4@example.com',2),(6,'Bob Jones','password','example5@example.com',2),(7,'Eric Johnson','password','example6@example.com',2),(8,'Kyle Adams','password','example7@example.com',2),(9,'Jakob Harmon','password','example8@example.com',3),(10,'Abigail Lozano','password','example9@example.com',3),(11,'Maxim Clarke','password','example10@example.com',3),(12,'Shane Coleman','password','example12@example.com',3);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

create user 'user'@'%' IDENTIFIED BY 'Password';
GRANT ALL PRIVILEGES ON db.* TO 'user'@'%';
ALTER USER 'user'@'%' INDENTIFIED WITH MYSQL_NATIVE_PASSWORD BY 'Password';
FLUSH PRIVILEGES;
