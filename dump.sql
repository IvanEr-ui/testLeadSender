-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: test
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `contact_lead`
--

DROP TABLE IF EXISTS `contact_lead`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_lead` (
  `id_contact` int NOT NULL,
  `id_lead` int NOT NULL,
  KEY `idx_contact_lead` (`id_contact`),
  KEY `unq_contact_lead` (`id_lead`),
  CONSTRAINT `fk_contact_lead_contacts` FOREIGN KEY (`id_contact`) REFERENCES `contacts` (`id`),
  CONSTRAINT `fk_contact_lead_leads` FOREIGN KEY (`id_lead`) REFERENCES `leads` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_lead`
--

LOCK TABLES `contact_lead` WRITE;
/*!40000 ALTER TABLE `contact_lead` DISABLE KEYS */;
INSERT INTO `contact_lead` VALUES (4,4),(5,21),(7,21),(5,22),(7,24),(7,25),(7,26),(8,27),(8,28),(8,29);
/*!40000 ALTER TABLE `contact_lead` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `responsible_user_id` int DEFAULT NULL,
  `group_id` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) DEFAULT NULL,
  `closest_task_at` int DEFAULT NULL,
  `custom_fields_values` json DEFAULT NULL,
  `is_unsorted` int DEFAULT NULL,
  `account_id` int DEFAULT NULL,
  `_embedded` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unq_contacts` (`name`),
  KEY `fk_contacts_account_contacts` (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (4,'Владимир Смирнов',NULL,NULL,NULL,NULL,NULL,NULL,'2025-08-04 09:24:37','2025-08-04 09:24:37',NULL,NULL,'{\"custom_fields_values\": [{\"values\": [{\"value\": \"+74991234568\"}, {\"value\": \"+74991654568\"}], \"field_code\": \"PHONE\", \"field_type\": \"multitext\"}, {\"values\": [{\"value\": \"+74991234568\"}, {\"value\": \"+74991654568\"}], \"field_code\": \"PHONE\", \"field_type\": \"multitext\"}]}',NULL,NULL,NULL),(5,'Федоров Дмитрий',NULL,NULL,NULL,NULL,NULL,NULL,'2025-08-04 09:25:02','2025-08-04 09:25:02',NULL,NULL,'{\"custom_fields_values\": [{\"values\": [{\"value\": \"+77591234568\"}, {\"value\": \"+777991654568\"}], \"field_code\": \"PHONE\", \"field_type\": \"multitext\"}]}',NULL,NULL,NULL),(6,'Федоров Дмитрий 2',NULL,NULL,NULL,NULL,NULL,NULL,'2025-08-04 09:37:46','2025-08-04 09:37:46',NULL,NULL,'{\"custom_fields_values\": [{\"values\": [{\"value\": \"+77591534568\"}], \"field_code\": \"PHONE\", \"field_type\": \"multitext\"}]}',NULL,NULL,NULL),(7,'Федоров Дмитрий 3',NULL,NULL,NULL,NULL,NULL,NULL,'2025-08-04 09:39:33','2025-08-04 09:39:33',NULL,NULL,'{\"custom_fields_values\": [{\"values\": [{\"value\": \"+77591538568\"}], \"field_code\": \"PHONE\", \"field_type\": \"multitext\"}]}',NULL,NULL,NULL),(8,'Федоров Дмитрий 4',NULL,NULL,NULL,NULL,NULL,NULL,'2025-08-04 09:40:17','2025-08-04 09:40:17',NULL,NULL,'{\"custom_fields_values\": [{\"values\": [{\"value\": \"+75591538568\"}], \"field_code\": \"PHONE\", \"field_type\": \"multitext\"}]}',NULL,NULL,NULL),(9,'Федоров Дмитрий 5',NULL,NULL,NULL,NULL,NULL,NULL,'2025-08-04 11:28:13','2025-08-04 11:28:13',NULL,NULL,NULL,NULL,NULL,NULL),(10,'Федоров Дмитрий 6',NULL,NULL,NULL,NULL,NULL,NULL,'2025-08-04 11:29:02','2025-08-04 11:29:02',NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leads`
--

DROP TABLE IF EXISTS `leads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `price` bigint DEFAULT NULL,
  `status_id` int DEFAULT NULL,
  `pipeline_id` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `closed_at` int DEFAULT NULL,
  `created_at` int DEFAULT NULL,
  `updated_at` int DEFAULT NULL,
  `loss_reason_id` int DEFAULT NULL,
  `responsible_user_id` int DEFAULT NULL,
  `custom_fields_values` json DEFAULT NULL,
  `tags_to_add` json DEFAULT NULL,
  `_embedded` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unq_leads` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leads`
--

LOCK TABLES `leads` WRITE;
/*!40000 ALTER TABLE `leads` DISABLE KEYS */;
INSERT INTO `leads` VALUES (4,'Федоров Дмитрий 1',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'{\"_embedded\": {\"contacts\": [{\"id\": 4}]}}'),(21,'Федоров Дмитрий 2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'{\"_embedded\": {\"contacts\": [{\"id\": 5}, {\"id\": 7}]}}'),(22,'Федоров Дмитрий 3',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'{\"_embedded\": {\"contacts\": [{\"id\": 5}]}}'),(23,'Федоров Дмитрий 4',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'{\"_embedded\": {\"contacts\": []}}'),(24,'Федоров Дмитрий 5',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'{\"_embedded\": {\"contacts\": [{\"id\": 7}]}}'),(25,'Федоров Дмитрий 6',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'{\"_embedded\": {\"contacts\": [{\"id\": 7}]}}'),(26,'Федоров Дмитрий 7',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'{\"_embedded\": {\"contacts\": [{\"id\": 7}]}}'),(27,'Федоров Дмитрий 8',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'{\"_embedded\": {\"contacts\": [{\"id\": 8}]}}'),(28,'Федоров Дмитрий 9',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'{\"_embedded\": {\"contacts\": [{\"id\": 8}]}}'),(29,'Федоров Дмитрий 10',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'{\"_embedded\": {\"contacts\": [{\"id\": 8}]}}'),(30,'Федоров Дмитрий 11',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(31,'Федоров Дмитрий 12',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(32,'Федоров Дмитрий 13',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `leads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phone`
--

DROP TABLE IF EXISTS `phone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phone` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone_number` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unq_phone` (`phone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phone`
--

LOCK TABLES `phone` WRITE;
/*!40000 ALTER TABLE `phone` DISABLE KEYS */;
INSERT INTO `phone` VALUES (7,'+74991234568'),(8,'+74991654568'),(13,'+75591538568'),(9,'+77591234568'),(11,'+77591534568'),(12,'+77591538568'),(10,'+777991654568');
/*!40000 ALTER TABLE `phone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phones_contact`
--

DROP TABLE IF EXISTS `phones_contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phones_contact` (
  `id_contact` int NOT NULL,
  `id_phone` int NOT NULL,
  KEY `fk_phones_contact_phone` (`id_phone`),
  KEY `fk_phones_contact_contacts` (`id_contact`),
  CONSTRAINT `fk_phones_contact_contacts` FOREIGN KEY (`id_contact`) REFERENCES `contacts` (`id`),
  CONSTRAINT `fk_phones_contact_phone` FOREIGN KEY (`id_phone`) REFERENCES `phone` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phones_contact`
--

LOCK TABLES `phones_contact` WRITE;
/*!40000 ALTER TABLE `phones_contact` DISABLE KEYS */;
INSERT INTO `phones_contact` VALUES (4,7),(4,8),(5,9),(5,10),(6,11),(7,12),(8,13);
/*!40000 ALTER TABLE `phones_contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webhookcontact`
--

DROP TABLE IF EXISTS `webhookcontact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `webhookcontact` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account` json DEFAULT NULL,
  `update` json DEFAULT NULL,
  `add` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webhookcontact`
--

LOCK TABLES `webhookcontact` WRITE;
/*!40000 ALTER TABLE `webhookcontact` DISABLE KEYS */;
INSERT INTO `webhookcontact` VALUES (1,'{\"account\": {\"id\": \"32589482\", \"_links\": {\"self\": \"https://nikandrovvanfak.amocrm.ru\"}, \"subdomain\": \"nikandrovvanfak\"}}',NULL,'{\"add\": [{\"id\": \"56759131\", \"type\": \"contact\", \"account_id\": \"32589482\", \"created_at\": \"1754306447\", \"updated_at\": \"1754306447\", \"date_create\": \"1754306447\", \"last_modified\": \"1754306447\", \"responsible_user_id\": \"12824122\"}]}'),(2,'{\"account\": {\"id\": \"32589482\", \"_links\": {\"self\": \"https://nikandrovvanfak.amocrm.ru\"}, \"subdomain\": \"nikandrovvanfak\"}}',NULL,'{\"add\": [{\"id\": \"56759163\", \"type\": \"contact\", \"account_id\": \"32589482\", \"created_at\": \"1754306504\", \"updated_at\": \"1754306504\", \"date_create\": \"1754306504\", \"last_modified\": \"1754306504\", \"responsible_user_id\": \"12824122\"}]}'),(3,'{\"account\": {\"id\": \"32589482\", \"_links\": {\"self\": \"https://nikandrovvanfak.amocrm.ru\"}, \"subdomain\": \"nikandrovvanfak\"}}',NULL,'{\"add\": [{\"id\": \"56759201\", \"type\": \"contact\", \"account_id\": \"32589482\", \"created_at\": \"1754306624\", \"updated_at\": \"1754306624\", \"date_create\": \"1754306624\", \"last_modified\": \"1754306624\", \"responsible_user_id\": \"12824122\"}]}'),(4,'{\"account\": {\"id\": \"32589482\", \"_links\": {\"self\": \"https://nikandrovvanfak.amocrm.ru\"}, \"subdomain\": \"nikandrovvanfak\"}}',NULL,'{\"add\": [{\"id\": \"56759231\", \"type\": \"contact\", \"account_id\": \"32589482\", \"created_at\": \"1754306774\", \"updated_at\": \"1754306774\", \"date_create\": \"1754306774\", \"last_modified\": \"1754306774\", \"responsible_user_id\": \"12824122\"}]}'),(5,'{\"account\": {\"id\": \"32589482\", \"_links\": {\"self\": \"https://nikandrovvanfak.amocrm.ru\"}, \"subdomain\": \"nikandrovvanfak\"}}',NULL,'{\"add\": [{\"id\": \"56759265\", \"type\": \"contact\", \"account_id\": \"32589482\", \"created_at\": \"1754306865\", \"updated_at\": \"1754306865\", \"date_create\": \"1754306865\", \"last_modified\": \"1754306865\", \"responsible_user_id\": \"12824122\"}]}'),(6,'{\"account\": {\"id\": \"32589482\", \"_links\": {\"self\": \"https://nikandrovvanfak.amocrm.ru\"}, \"subdomain\": \"nikandrovvanfak\"}}',NULL,'{\"add\": [{\"id\": \"56759317\", \"type\": \"contact\", \"account_id\": \"32589482\", \"created_at\": \"1754306976\", \"updated_at\": \"1754306976\", \"date_create\": \"1754306976\", \"last_modified\": \"1754306976\", \"responsible_user_id\": \"12824122\"}]}');
/*!40000 ALTER TABLE `webhookcontact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webhooklead`
--

DROP TABLE IF EXISTS `webhooklead`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `webhooklead` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account` json DEFAULT NULL,
  `update` json DEFAULT NULL,
  `add` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webhooklead`
--

LOCK TABLES `webhooklead` WRITE;
/*!40000 ALTER TABLE `webhooklead` DISABLE KEYS */;
INSERT INTO `webhooklead` VALUES (1,'{\"account\": {\"id\": \"32589482\", \"_links\": {\"self\": \"https://nikandrovvanfak.amocrm.ru\"}, \"subdomain\": \"nikandrovvanfak\"}}',NULL,'{\"add\": [{\"id\": \"30800443\", \"name\": \"Федоров Дмитрий 12\", \"price\": \"0\", \"status_id\": \"78885714\", \"account_id\": \"32589482\", \"created_at\": \"1754307155\", \"updated_at\": \"1754307154\", \"date_create\": \"1754307155\", \"pipeline_id\": \"9930866\", \"last_modified\": \"1754307154\", \"created_user_id\": \"0\", \"modified_user_id\": \"0\", \"responsible_user_id\": \"12824122\"}]}'),(2,'{\"account\": {\"id\": \"32589482\", \"_links\": {\"self\": \"https://nikandrovvanfak.amocrm.ru\"}, \"subdomain\": \"nikandrovvanfak\"}}',NULL,'{\"add\": [{\"id\": \"30800497\", \"name\": \"Федоров Дмитрий 13\", \"price\": \"0\", \"status_id\": \"78885714\", \"account_id\": \"32589482\", \"created_at\": \"1754307245\", \"updated_at\": \"1754307245\", \"date_create\": \"1754307245\", \"pipeline_id\": \"9930866\", \"last_modified\": \"1754307245\", \"created_user_id\": \"0\", \"modified_user_id\": \"0\", \"responsible_user_id\": \"12824122\"}]}');
/*!40000 ALTER TABLE `webhooklead` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-04 12:07:53
