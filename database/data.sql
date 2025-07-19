INSERT INTO users (username, email, password, authority) 
VALUES ('Smith01', '01@smith.com', 'smith', 'ADMIN');

INSERT INTO decks (user_id, deck_name, deck_description) 
VALUES (1, 'sample1', 'description1');

INSERT INTO card_fields (deck_id, field_name, field_type)
VALUES (1, 'front', 'FRONT_PRIMARY');
INSERT INTO card_fields(deck_id, field_name, field_type)
VALUES (1, 'back', 'BACK_PRIMARY');

INSERT INTO cards (deck_id) VALUES(1);

INSERT INTO card_values (field_id, card_id, content)
VALUES (1, 1, 'example');
INSERT INTO card_values (field_id, card_id, content)
VALUES (2, 1, 'something such as an object, a fact or a situation that shows, explains or supports what you say');