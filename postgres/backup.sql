-- ---
-- Update the database with the data
--
-- ---

COPY Questions(id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness)
FROM '/app/questions.csv'
DELIMITER ','
CSV HEADER;

COPY Answers(id, question_id, body, date, answerer_name, answerer_email, reported, helpfulness)
FROM '/app/answers.csv'
DELIMITER ','
CSV HEADER;

COPY Photos(id, answer_id, url)
FROM '/app/answers_photos.csv'
DELIMITER ','
CSV HEADER;

-- ---
-- Update the serial sequence counter so new entries will start at the correct id value
--
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