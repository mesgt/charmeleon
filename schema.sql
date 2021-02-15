

DROP DATABASE IF EXISTS crimeAde;

CREATE DATABASE crimeAde;

USE crimeAde;

CREATE TABLE crimeDenver
(
	id int NOT NULL AUTO_INCREMENT,
	offense_type_id text,
	offense_category_id text,
    first_occurrence_date DATETIME,
    incident_address VARCHAR(30) NOT NULL,
    geo_x int NOT NULL, 
    geo_y int NOT NULL, 
    geo_lon decimal(23,7) NOT NULL,
    geo_lat decimal(23,7) NOT NULL,
	PRIMARY KEY (id)
);

LOAD DATA INFILE 'crime_copy.csv' 
INTO TABLE crimeDenver 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(@first_occurrence_date)
SET 
first_occurrence_date = STR_TO_DATE(@Ffirst_occurrence_date,'%m/%d/%Y %k:%i:%s');