CREATE DATABASE fungram;

CREATE TABLE users(
    user_id VARCHAR PRIMARY KEY,
    user_email VARCHAR NOT NULL,
    user_fullname VARCHAR,
    user_nickname VARCHAR NOT NULL,
    user_password VARCHAR NOT NULL,
    user_photo VARCHAR,
    user_bio VARCHAR
);

CREATE TABLE posts(
    post_id VARCHAR PRIMARY KEY,
    user_id VARCHAR NOT NULL,
    post_image VARCHAR,
    post_captions VARCHAR,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    Foreign Key (user_id) REFERENCES users(user_id)
);

CREATE TABLE contentImg (
    img_id VARCHAR PRIMARY KEY,
    post_id VARCHAR NOT NULL
);

CREATE TABLE comments(
    comment_id VARCHAR PRIMARY KEY,
    comment VARCHAR NOT NULL,
    post_id VARCHAR NOT NULL,
    user_id VARCHAR NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

SELECT
    *
FROM
    user;

SELECT
    *
FROM
    user
WHERE
    id = 'g78e-37c4c-3c653';

INSERT INTO
    user(id, name, image)
VALUES
    ('g78e-37c4c-3c653', 'kaos', 'kaos.img');

UPDATE
    user
SET
    name = 'kaos putih',
    image = 'kaosputih.img'
WHERE
    id = 'g78e-37c4c-3c653';

DELETE FROM
    user
WHERE
    id = '68bf-573xx-02c7w';

ALTER TABLE posts ADD COLUMN time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL;
SELECT users.user_nickname, posts.* FROM users INNER JOIN posts ON posts.user_id = users.user_id;