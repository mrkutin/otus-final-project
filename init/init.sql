CREATE DATABASE otus;
USE otus;

CREATE TABLE users(id VARCHAR(36) PRIMARY KEY NOT NULL, password VARCHAR(64), name VARCHAR(64), email VARCHAR(64), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE licenses(id VARCHAR(36) PRIMARY KEY NOT NULL, user_id VARCHAR(36), name VARCHAR(64), expires TIMESTAMP, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);