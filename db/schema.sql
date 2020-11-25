CREATE DATABASE user_db;
USE user_db;

CREATE TABLE users
(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    categories varchar(255) NOT NULL,
    location varchar(255),
    PRIMARY KEY (id)
);

-- QUESTIONS
-- 1. String vs integer for location
-- 2. What should or shouldn't be NOT NULL