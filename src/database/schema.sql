-- CREATE DATABASE qa;

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Questions'
--
-- ---

CREATE TABLE Questions (
  id SERIAL NOT NULL PRIMARY KEY UNIQUE,
  question_body VARCHAR(1000) NOT NULL,
  question_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  asker_name VARCHAR(60) NOT NULL,
  asker_email VARCHAR(60) NOT NULL,
  question_helpfulness INTEGER NOT NULL DEFAULT 0,
  reported BOOLEAN NOT NULL DEFAULT false,
  product_id INTEGER NOT NULL
);

-- ---
-- Table 'Answers'
--
-- ---

CREATE TABLE Answers (
  id SERIAL NOT NULL PRIMARY KEY UNIQUE,
  body VARCHAR(1000) NOT NULL,
  date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  answerer_name VARCHAR(60) NOT NULL,
  answerer_email VARCHAR(60) NOT NULL,
  helpfulness INTEGER NOT NULL DEFAULT 0,
  question_id INTEGER NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT false
);

-- ---
-- Table 'Photos'
--
-- ---

CREATE TABLE Photos (
  id SERIAL NOT NULL PRIMARY KEY UNIQUE,
  url VARCHAR(500) NOT NULL,
  answer_id INTEGER NOT NULL
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE Answers ADD FOREIGN KEY (question_id) REFERENCES Questions (id);
ALTER TABLE Photos ADD FOREIGN KEY (answer_id) REFERENCES Answers (id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE Questions ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Answers ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Products ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO Questions (id,question_body,question_date,asker_name,question_helpfulness,reported,product_id) VALUES
-- ('','','','','','','');
-- INSERT INTO Answers (id,body,date,answerer_name,helpfulness,photos,question_id,reported) VALUES
-- ('','','','','','','','');
-- INSERT INTO Products (id) VALUES
-- ('');