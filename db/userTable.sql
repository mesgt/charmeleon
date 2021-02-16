CREATE TABLE userReport
(
	id int NOT NULL AUTO_INCREMENT,
	category text NOT NULL, -- from drop down menu
    streetAddress VARCHAR(35) NOT NULL,
    city VARCHAR(35),
    state VARCHAR(20),
    zip INT(9) NOT NULL,
    date DATE NOT NULL, 
    description VARCHAR(255),
	PRIMARY KEY (id)
);