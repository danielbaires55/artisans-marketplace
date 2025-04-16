-- Insert sample categories
INSERT INTO categories (name, description) VALUES
('Ceramica', 'Prodotti in ceramica fatti a mano'),
('Gioielli', 'Gioielli artigianali'),
('Tessuti', 'Prodotti tessili fatti a mano'),
('Legno', 'Oggetti in legno artigianali');

-- Insert sample artisans
INSERT INTO artisans (name, description, location, profile_image) VALUES
('Mario Rossi', 'Maestro ceramista con 20 anni di esperienza', 'Milano', 'mario.jpg'),
('Anna Bianchi', 'Creatrice di gioielli artigianali', 'Roma', 'anna.jpg'),
('Giuseppe Verdi', 'Artigiano del legno', 'Firenze', 'giuseppe.jpg');

-- Insert sample products
INSERT INTO products (name, description, price, stock_quantity, image_url, artisan_id) VALUES
('Vaso in ceramica', 'Vaso fatto a mano con decorazioni floreali', 89.99, 5, 'vaso1.jpg', 1),
('Collana in argento', 'Collana artigianale in argento 925', 129.99, 3, 'collana1.jpg', 2),
('Tavolo in legno', 'Tavolo in legno massello fatto a mano', 599.99, 2, 'tavolo1.jpg', 3);

-- Link products to categories
INSERT INTO product_categories (product_id, category_id) VALUES
(1, 1), -- Vaso -> Ceramica
(2, 2), -- Collana -> Gioielli
(3, 4); -- Tavolo -> Legno
