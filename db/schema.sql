-- https://dbdiagram.io/d/5fbef5fd3a78976d7b7d72fd

CREATE DATABASE user_db;
USE user_db;

CREATE TABLE `users` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255),
  `last_name` varchar(255),
  `created_at` timestamp COMMENT 'When order created',
  `country_code` char(2)
);

CREATE TABLE `countries` (
  `code` char PRIMARY KEY,
  `name` varchar(255)
);

CREATE TABLE `categories` (
  `user_id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `category` varchar(255)
);

ALTER TABLE `countries` ADD FOREIGN KEY (`code`) REFERENCES `users` (`country_code`);

ALTER TABLE `categories` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);



