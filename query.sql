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
    comment_text VARCHAR NOT NULL,
    post_id VARCHAR NOT NULL,
    user_nickname VARCHAR NOT NULL,
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);
