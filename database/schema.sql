CREATE TABLE IF NOT EXISTS users (
    id varchar(255) PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    authority VARCHAR(20),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS decks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id varchar(255) NOT NULL,
    deck_name VARCHAR(50) NOT NULL,
    deck_description VARCHAR(100) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS card_fields (
    id INT PRIMARY KEY AUTO_INCREMENT,
    deck_id INT NOT NULL,
    field_name VARCHAR(50) NOT NULL,
    field_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (deck_id) REFERENCES decks(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cards (
    id INT PRIMARY KEY AUTO_INCREMENT,
    deck_id INT NOT NULL,
    success_count INT NOT NULL,
    review_interval INT NOT NULL,
    next_review_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (deck_id) REFERENCES decks(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS card_values (
    id INT PRIMARY KEY AUTO_INCREMENT,
    field_id INT NOT NULL,
    card_id INT NOT NULL,
    content VARCHAR(255) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP,
    FOREIGN KEY (field_id) REFERENCES card_fields(id) ON DELETE CASCADE,
    FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE CASCADE
);

-- drop table card_values, cards, card_fields, decks, users;
