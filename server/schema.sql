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

DROP TABLE IF EXISTS Questions CASCADE;

CREATE TABLE Questions (
  id SERIAL NOT NULL PRIMARY KEY UNIQUE,
  question_body VARCHAR(1000) NOT NULL,
  question_date TIMESTAMPTZ NOT NULL,
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

DROP TABLE IF EXISTS Answers CASCADE;

CREATE TABLE Answers (
  id SERIAL NOT NULL PRIMARY KEY UNIQUE,
  body VARCHAR(1000) NOT NULL,
  date TIMESTAMPTZ NOT NULL,
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

DROP TABLE IF EXISTS Photos CASCADE;

CREATE TABLE Photos (
  id SERIAL NOT NULL PRIMARY KEY UNIQUE,
  url VARCHAR(500) NOT NULL,
  answer_id INTEGER NOT NULL
);
-- ---
-- Table 'Products'
--
-- ---

-- DROP TABLE IF EXISTS Products CASCADE;

-- CREATE TABLE Products (
--   id SERIAL NOT NULL PRIMARY KEY UNIQUE
-- );

-- ---
-- Foreign Keys
-- ---

-- ALTER TABLE Questions ADD FOREIGN KEY (product_id) REFERENCES Products (id);
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


COPY Questions(id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness)
FROM '/mnt/c/Users/Arun/Documents/Hack reactor/sdc csvs/questions.csv'
DELIMITER ','
CSV HEADER;

COPY Answers(id, question_id, body, date, answerer_name, answerer_email, reported, helpfulness)
FROM '/mnt/c/Users/Arun/Documents/Hack reactor/sdc csvs/answers.csv'
DELIMITER ','
CSV HEADER;

COPY Photos(id, answer_id, url)
FROM '/mnt/c/Users/Arun/Documents/Hack reactor/sdc csvs/answers_photos.csv'
DELIMITER ','
CSV HEADER;