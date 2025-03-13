CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    user_type VARCHAR(50) NOT NULL CHECK (user_type IN ('customer', 'service_center'))
);


CREATE TABLE service_centers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    rating FLOAT NOT NULL CHECK (rating >= 0 AND rating <= 5),
    price_range VARCHAR(100) NOT NULL,
    bike_types TEXT NOT NULL,  -- You can use TEXT or VARCHAR for this field depending on the size of the list
    service_type VARCHAR(50) NOT NULL CHECK (service_type IN ('authorized', 'private'))
);


select * from users;

select * from service_centers;


INSERT INTO users (username, password, user_type) 
VALUES 
    ('Ravi Chandra', '123', 'customer'),
    ('santosh', '456', 'service_center'),
    ('Ram', '789', 'customer');


INSERT INTO service_centers (name, location, rating, price_range, bike_types, service_type) 
VALUES 
    ('Bike mechanic company 1', 'Hyderabad', 4.5, 1000, 'sport bike, cruiser, touring', 'private'),
    ('Bike mechanic company 2', 'Bangalore', 4.8, 1500, 'Normal bike, commuter', 'authorized'),
    ('Bike mechanic company 3', 'Mumbai', 4.2, 1200, 'scooter, cruiser', 'private');



select * from service_centers;

select * from users;

INSERT INTO users (username, password, user_type) 
VALUES 
    ('Ravi Chandra', '123', 'customer'),
    ('santosh', '456', 'service_center'),
    ('Ram', '789', 'customer');


SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'service_centers';



CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    user_type VARCHAR(50) NOT NULL CHECK (user_type IN ('customer', 'service_center'))
);





CREATE TABLE service_centers (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    rating FLOAT NOT NULL CHECK (rating >= 0 AND rating <= 5), 
    price_range VARCHAR(100) NOT NULL,
    bike_types VARCHAR(1000) NOT NULL,
    service_type VARCHAR(50) NOT NULL CHECK (service_type IN ('authorized', 'private'))
);


INSERT INTO service_centers (username, password, location, rating, price_range, bike_types, service_type) 
VALUES 
    ('Bike mechanic company 1','123', 'Hyderabad', 4.5, 1000, 'sport bike, cruiser, touring', 'private'),
    ('Bike mechanic company 2','123', 'Bangalore', 4.8, 1500, 'Normal bike, commuter', 'authorized'),
    ('Bike mechanic company 3','123', 'Mumbai', 4.2, 1200, 'scooter, cruiser', 'private');

drop table service_centers;

drop table users;
