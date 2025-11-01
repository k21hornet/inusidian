CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    authority VARCHAR(20),
    created_at DATETIME,
    updated_at DATETIME,
    deleted_at DATETIME
);

CREATE TABLE IF NOT EXISTS decks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id VARCHAR(255) NOT NULL,
    deck_name VARCHAR(50) NOT NULL,
    deck_description VARCHAR(100) NOT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    deleted_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS card_fields (
    id INT PRIMARY KEY AUTO_INCREMENT,
    deck_id INT NOT NULL,
    field_name VARCHAR(50) NOT NULL,
    field_type VARCHAR(50) NOT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    deleted_at DATETIME,
    FOREIGN KEY (deck_id) REFERENCES decks(id)
);

CREATE TABLE IF NOT EXISTS cards (
    id INT PRIMARY KEY AUTO_INCREMENT,
    deck_id INT NOT NULL,
    success_count INT NOT NULL,
    review_interval INT NOT NULL,
    next_review_date DATETIME NOT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    deleted_at DATETIME,
    FOREIGN KEY (deck_id) REFERENCES decks(id)
);

CREATE TABLE IF NOT EXISTS card_values (
    id INT PRIMARY KEY AUTO_INCREMENT,
    field_id INT NOT NULL,
    card_id INT NOT NULL,
    content VARCHAR(255) NOT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    deleted_at DATETIME,
    FOREIGN KEY (field_id) REFERENCES card_fields(id),
    FOREIGN KEY (card_id) REFERENCES cards(id)
);

CREATE TABLE IF NOT EXISTS card_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    card_id INT NOT NULL,
    elapsed_time INT NOT NULL,
    next_review_interval INT NOT NULL,
    created_at DATETIME,
    FOREIGN KEY (card_id) REFERENCES cards(id)
);

-- drop table card_logs, card_values, cards, card_fields, decks, users;
