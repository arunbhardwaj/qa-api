-- ---
-- Create indexes
--
-- ---

CREATE INDEX questions_idx_product_id ON Questions(product_id);
CREATE INDEX answers_idx_question_id ON Answers(question_id);
CREATE INDEX photos_idx_answer_id ON Photos(answer_id);
-- CREATE INDEX answers_idx_question_id_answer_id ON Answers(question_id, id);
