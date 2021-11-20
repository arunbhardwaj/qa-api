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

DROP TABLE IF EXISTS Answers CASCADE;

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
FROM '/app/Test_questions.csv'
DELIMITER ','
CSV HEADER;

COPY Answers(id, question_id, body, date, answerer_name, answerer_email, reported, helpfulness)
FROM '/app/Test_answers.csv'
DELIMITER ','
CSV HEADER;

COPY Photos(id, answer_id, url)
FROM '/app/Test_photos.csv'
DELIMITER ','
CSV HEADER;

-- ---
-- Update the serial sequence counter
-- ---
BEGIN;
-- protect against concurrent inserts while you update the counter
LOCK TABLE Questions IN EXCLUSIVE MODE;
LOCK TABLE Answers IN EXCLUSIVE MODE;
LOCK TABLE Photos IN EXCLUSIVE MODE;
-- Update the sequence
SELECT setval('questions_id_seq', COALESCE((SELECT MAX(id)+1 FROM Questions), 1), false);
SELECT setval('answers_id_seq', COALESCE((SELECT MAX(id)+1 FROM Answers), 1), false);
SELECT setval('photos_id_seq', COALESCE((SELECT MAX(id)+1 FROM Photos), 1), false);
COMMIT;

CREATE INDEX idx_product_id ON Questions(product_id);
CREATE INDEX idx_question_id ON Answers(question_id);