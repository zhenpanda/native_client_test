DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS planets CASCADE;
DROP TABLE IF EXISTS planets_transmissions CASCADE;
DROP TABLE IF EXISTS transmissions CASCADE;

CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	user_name VARCHAR(255),
	user_current_location VARCHAR(255),
	user_last_launch_date TIMESTAMP default current_timestamp,
	password_digest VARCHAR(255)
);

CREATE TABLE planets(
	id SERIAL PRIMARY KEY,
	planet_name VARCHAR(255),
	planet_location VARCHAR(255),
	planet_transmissions_count INTEGER,
	planet_discovery_date TIMESTAMP default current_timestamp,
	planet_discovery_user_id INTEGER references users
);

CREATE TABLE transmissions(
	id SERIAL PRIMARY KEY,
	planet_id INTEGER references planets,
	user_transmission_id INTEGER references users,
	transmission_sent_date TIMESTAMP default current_timestamp,
	transmission_message TEXT
);