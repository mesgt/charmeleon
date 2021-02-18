DROP TABLE IF EXISTS crimeDenvers;

SELECT * from crimeDenvers;

-- CREATE TABLE crimeDenvers
-- (
-- 	id int NOT NULL AUTO_INCREMENT,
-- 	offense_type_id text,
-- 	offense_category_id text,
--     first_occurrence_date DATETIME,
--     incident_address text NOT NULL,
--     geo_x int NOT NULL, 
--     geo_y int NOT NULL, 
--     geo_lon decimal(23,7) NOT NULL,
--     geo_lat decimal(23,7) NOT NULL,
--  	PRIMARY KEY (id)
-- );

-- Prior to uploading data, add cleanCrime.csv to the following folder: "C:\ProgramData\MySQL\MySQL Server 8.0\Data\crimeade\cleanCrime.csv"

LOAD DATA INFILE 'cleanCrime.csv'
INTO TABLE crimeDenvers
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(offense_type_id,
offense_category_id,
first_occurrence_date,
incident_address,
geo_x,
geo_y,
geo_lon,
geo_lat)
SET id = NULL;