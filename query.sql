CREATE DATABASE fungram;

CREATE TABLE
    users(
        user_id VARCHAR PRIMARY KEY,
        user_email VARCHAR NOT NULL,
        user_fullname VARCHAR,
        user_nickname VARCHAR NOT NULL,
        user_password VARCHAR NOT NULL,
        user_photo VARCHAR,
        user_bio VARCHAR
    );

SELECT * FROM user;
SELECT * FROM user WHERE id = 'g78e-37c4c-3c653';
SELECT * FROM user WHERE id = '68bf-573xx-02c7w';
INSERT INTO user(id,name,image)VALUES ('g78e-37c4c-3c653','kaos','kaos.img');
INSERT INTO user(id,name,image)VALUES ('68bf-573xx-02c7w','kemeja','kemeja.img');
UPDATE user
SET
    name = 'kaos putih',
    image = 'kaosputih.img'
WHERE id = 'g78e-37c4c-3c653';
DELETE FROM user WHERE id='68bf-573xx-02c7w';
