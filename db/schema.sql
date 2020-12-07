-- https://dbdiagram.io/d/5fbef5fd3a78976d7b7d72fd

CREATE DATABASE news;
USE news;

CREATE TABLE `users` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `first_nm` varchar(255),
  `last_nm` varchar(255),
  `full_nm` varchar(255),
  `created_at` timestamp COMMENT 'When order created',
  `country_code` char(2)
);

CREATE TABLE `categories` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` int,
  `category` varchar(255)
);

CREATE TABLE `articles` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `source_nm` varchar(255),
  `title` text,
  `description` text,
  `url` varchar(255),
  `urlToImage` varchar(255),
  `content` text,
  `publishedAt` datetime
);

-- UserCategories mock below, created through Sequelize BelongsToMany associations
CREATE TABLE `UserCategories` (
  `categoryId` int,
  `userId` int
);

ALTER TABLE `categories` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `articles` ADD FOREIGN KEY (`id`) REFERENCES `categories` (`id`);
