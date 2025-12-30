CREATE TABLE decks (
    id               CHAR(12) PRIMARY KEY,
    user_id          VARCHAR(50) NOT NULL,
    deck_name        VARCHAR(50) NOT NULL,
    deck_description VARCHAR(100) NOT NULL,
    created_at       DATETIME NOT NULL,
    updated_at       DATETIME NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE card_fields (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    deck_id     CHAR(12) NOT NULL,
    field_name  VARCHAR(50) NOT NULL,
    field_type  VARCHAR(20) NOT NULL,
    created_at  DATETIME NOT NULL,
    updated_at  DATETIME NOT NULL,

    FOREIGN KEY (deck_id) REFERENCES decks(id) ON DELETE CASCADE
);

CREATE TABLE cards (
    id                  CHAR(16) PRIMARY KEY,
    deck_id             CHAR(12) NOT NULL,
    success_count       INT NOT NULL,
    review_interval     INT NOT NULL,
    next_review_date    DATE NOT NULL,
    created_at          DATETIME NOT NULL,
    updated_at          DATETIME NOT NULL,

    FOREIGN KEY (deck_id) REFERENCES decks(id) ON DELETE CASCADE
);

CREATE TABLE card_values (
    card_id       CHAR(16) NOT NULL,
    card_field_id INT NOT NULL,
    content       VARCHAR(255) NOT NULL,
    created_at    DATETIME NOT NULL,
    updated_at    DATETIME NOT NULL,

    PRIMARY KEY (card_id, card_field_id),
    FOREIGN KEY (card_field_id) REFERENCES card_fields(id) ON DELETE CASCADE,
    FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE CASCADE
);

CREATE TABLE card_logs (
    id                   BIGINT PRIMARY KEY AUTO_INCREMENT,
    card_id              CHAR(16) NOT NULL,
    answer_time         DOUBLE NOT NULL,
    next_review_interval INT NOT NULL,
    created_at           DATETIME NOT NULL,
    updated_at           DATETIME NOT NULL,

    FOREIGN KEY (card_id) REFERENCES cards(id) ON DELETE CASCADE
);
