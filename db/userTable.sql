CREATE TABLE userReport
(
	id int NOT NULL AUTO_INCREMENT,
	category text NOT NULL, -- from drop down menu
    date DATE NOT NULL,
    streetAddress VARCHAR(35) NOT NULL,
    city VARCHAR(35),
    state VARCHAR(20),
    zip INT(9) NOT NULL,
    description VARCHAR(255),
	PRIMARY KEY (id)
);