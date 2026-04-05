CREATE TABLE users(
    id          VARCHAR(50) PRIMARY KEY,
    user_name   VARCHAR(50) NOT NULL,
    email       VARCHAR(255) UNIQUE NOT NULL,
    avatar_url  VARCHAR(255),
    created_at  DATETIME NOT NULL,
    updated_at  DATETIME NOT NULL
);
