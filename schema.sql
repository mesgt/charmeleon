DROP DATABASE IF EXISTS crimeAde;

CREATE DATABASE crimeAde;

use crimeAde;

CREATE TABLE crimeDenver
(
	id int NOT NULL AUTO_INCREMENT,
	offense_type_id text,
	offense_category_id text,
    first_occurrence_date DATETIME,
    incident_address text NOT NULL,
    geo_x int NOT NULL, 
    geo_y int NOT NULL, 
    geo_lon decimal(23,7) NOT NULL,
    geo_lat decimal(23,7) NOT NULL,
 	PRIMARY KEY (id)
);

select * from crimeDenvers;

select geo_lat, geo_lon from crimeDenver
where (first_occurence_date between '2019-01-05 13:01:00' and '2021-01-14 03:14:00') and (offense_category_id = 'white-collar-crime');

LOAD DATA LOCAL INFILE '/Users/lydianewmanheggie/Desktop/folder/cleanCrime.csv'
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

select * from crimeDenver where id in (select min(id) from crimeDenver group by offense_category_id);

select id, type from 
(
select id, name, type, "group", 
row_number() over(partition by type order by type) as rn
from lists
) t
where rn = 1

