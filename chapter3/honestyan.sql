-- create table user_game
CREATE TABLE user_game (
	id SERIAL PRIMARY KEY,
	username VARCHAR (30) UNIQUE NOT NULL,
	email VARCHAR (50) UNIQUE NOT NULL,
    password VARCHAR (255) NOT NULL,
    stage INT(15),
    point INT(15),
    inventory INT[],
    is_verified BOOLEAN NOT NULL,
    registered TIMESTAMP NOT NULL,
    last_login TIMESTAMP,
    ip VARCHAR (15)
);


-- create enum type for gender
CREATE TYPE gender AS ENUM ('male', 'female');
-- create table user_game_biodata
CREATE TABLE user_game_biodata (
	id SERIAL PRIMARY KEY,
    user_id INT(15) NOT NULL,
    fullname VARCHAR (60) NOT NULL,
    dob DATE NOT NULL,
    phone VARCHAR (15) NOT NULL,
    gender gender NOT NULL,
    address VARCHAR (255) NOT NULL,
    --this code below is for foreign key that will be deleted if the user_game.id table is deleted
    CONSTRAINT fk_user_game
      FOREIGN KEY(user_id) 
	    REFERENCES user_game(id)
	        ON DELETE CASCADE
);

-- create enum type for action
CREATE TYPE action AS ENUM ('point', 'stage', 'inventory');
-- auto increment id
CREATE TABLE user_game_history (
    id SERIAL PRIMARY KEY,
    user_id INT(15) NOT NULL,
    action action NOT NULL,
    value INT(15),
    time TIMESTAMP NOT NULL,
    --this code below is for foreign key that will be deleted if the user_game.id table is deleted
    CONSTRAINT fk_user_game
      FOREIGN KEY(user_id) 
	    REFERENCES user_game(id)
	        ON DELETE CASCADE
);

-- create table game_inventory
CREATE TABLE game_inventory (
    id SERIAL PRIMARY KEY,
    name VARCHAR (30) NOT NULL,
    price decimal(10) NOT NULL
);

--CREATE new user (sign up)
INSERT INTO user_game (id, username, email, password, stage, point, inventory, is_verified, registered, last_login, ip) VALUES ('', 'honestyan', 'honestyan0708@gmail.com', 'hashpassword_example', 0, 0, NULL, false, now(), NULL, NULL);

--UPDATE is_verified to true
UPDATE user_game SET is_verified = true WHERE id = 1;

--DELETE user
DELETE FROM user_game WHERE id = 1;

--READ (select)
SELECT * FROM user_game;