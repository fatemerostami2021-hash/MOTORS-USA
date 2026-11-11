-- Demo vehicles (generated from frontend/src/data/vehicles.ts). Safe to re-run.
INSERT INTO vehicles (slug, make, model, year, price, mileage, body, fuel, transmission, hp, engine, status) VALUES
('porsche-918-spyder-2015', 'Porsche', '918 Spyder', 2015, 1850000, 4200, 'Roadster', 'Hybrid', 'PDK', 887, '4.6L V8 + 2 e-motors', 'available'),
('ferrari-sf90-stradale-2022', 'Ferrari', 'SF90 Stradale', 2022, 625000, 3100, 'Coupe', 'Hybrid', '8-speed DCT', 986, '4.0L V8 twin-turbo + 3 e-motors', 'available'),
('ferrari-purosangue-2023', 'Ferrari', 'Purosangue', 2023, 520000, 1200, 'SUV', 'Gasoline', 'DCT', 715, '6.5L V12', 'available'),
('ferrari-488-pista-spider-2019', 'Ferrari', '488 Pista Spider', 2019, 480000, 5200, 'Convertible', 'Gasoline', 'DCT', 710, '3.9L V8 twin-turbo', 'available'),
('ferrari-812-gts-2021', 'Ferrari', '812 GTS', 2021, 560000, 3100, 'Convertible', 'Gasoline', 'DCT', 789, '6.5L V12', 'available'),
('lamborghini-revuelto-2024', 'Lamborghini', 'Revuelto', 2024, 780000, 900, 'Coupe', 'Hybrid', 'DCT', 1001, '6.5L V12 + 3 e-motors', 'available'),
('lamborghini-aventador-svj-2019', 'Lamborghini', 'Aventador SVJ', 2019, 690000, 2800, 'Coupe', 'Gasoline', 'ISR', 759, '6.5L V12', 'available'),
('lamborghini-veneno-2014', 'Lamborghini', 'Veneno', 2014, 9500000, 1500, 'Coupe', 'Gasoline', 'ISR', 740, '6.5L V12', 'available'),
('mclaren-senna-2019', 'McLaren', 'Senna', 2019, 950000, 1900, 'Coupe', 'Gasoline', 'DCT', 789, '4.0L V8 twin-turbo', 'available'),
('mclaren-speedtail-2020', 'McLaren', 'Speedtail', 2020, 2400000, 800, 'Coupe', 'Hybrid', 'DCT', 1055, '4.0L V8 twin-turbo + e-motor', 'available'),
('mclaren-p1-gtr-2015', 'McLaren', 'P1 GTR', 2015, 3200000, 600, 'Coupe', 'Hybrid', 'DCT', 986, '3.8L V8 twin-turbo + e-motor', 'available'),
('mercedes-benz-amg-one-2023', 'Mercedes-Benz', 'AMG ONE', 2023, 3100000, 400, 'Coupe', 'Hybrid', 'AMT', 1063, '1.6L V6 turbo + 4 e-motors', 'available'),
('koenigsegg-jesko-attack-2022', 'Koenigsegg', 'Jesko Attack', 2022, 3700000, 300, 'Coupe', 'Gasoline', 'LST', 1280, '5.0L V8 twin-turbo', 'available'),
('rolls-royce-phantom-series-2022', 'Rolls-Royce', 'Phantom Series', 2022, 520000, 2000, 'Sedan', 'Gasoline', 'Automatic', 563, '6.75L V12 twin-turbo', 'available'),
('lamborghini-aventador-2017', 'Lamborghini', 'Aventador', 2017, 390000, 12000, 'Coupe', 'Gasoline', 'ISR', 691, '6.5L V12', 'sold'),
('porsche-carrera-gt-2006', 'Porsche', 'Carrera GT', 2006, 1450000, 9800, 'Roadster', 'Gasoline', 'Manual', 603, '5.7L V10', 'sold')
ON CONFLICT (slug) DO NOTHING;
