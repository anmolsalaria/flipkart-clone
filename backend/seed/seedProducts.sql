-- ============================================================
-- Flipkart Clone — Database Schema & Seed Data
-- ============================================================
-- This file creates the database, tables, and inserts 20 sample
-- products.  Run once to bootstrap a local dev environment.
--
-- DATABASE RELATIONSHIPS (Normalized):
--   products  ← 1:N → cart          (a product can be in many carts)
--   products  ← 1:N → order_items   (a product can appear in many orders)
--   orders    ← 1:N → order_items   (one order has many line items)
--   products  ← 1:N → wishlist      (a product can be wishlisted by many users)
--   product_images ← N:1 → products (many images belong to one product)
-- ============================================================

CREATE DATABASE IF NOT EXISTS flipkart_clone;
USE flipkart_clone;

-- -------------------------------------------------------
-- Products table — core catalog
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255)   NOT NULL,
  description TEXT,
  price       DECIMAL(10,2)  NOT NULL,          -- discounted / selling price
  original_price DECIMAL(10,2) NOT NULL,        -- MRP
  discount_percent INT        DEFAULT 0,
  rating      DECIMAL(2,1)   DEFAULT 0.0,
  category    VARCHAR(100)   NOT NULL,
  stock       INT            DEFAULT 0,
  image_url   VARCHAR(512)   NOT NULL,
  created_at  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------------------------------------
-- Product images — supports image carousel on detail page
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS product_images (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  product_id  INT NOT NULL,
  image_url   VARCHAR(512) NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- -------------------------------------------------------
-- Cart table — per-user cart stored server-side
-- Relationship: user_id + product_id is unique so that
-- adding the same product again increments quantity.
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS cart (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT NOT NULL DEFAULT 1,
  product_id  INT NOT NULL,
  quantity    INT NOT NULL DEFAULT 1,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_product (user_id, product_id)
);

-- -------------------------------------------------------
-- Orders — header table for a placed order
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  user_id         INT            NOT NULL DEFAULT 1,
  total_amount    DECIMAL(10,2)  NOT NULL,
  shipping_name   VARCHAR(255),
  shipping_phone  VARCHAR(20),
  shipping_address TEXT,
  shipping_city   VARCHAR(100),
  shipping_pincode VARCHAR(10),
  status          VARCHAR(50)    DEFAULT 'confirmed',
  created_at      TIMESTAMP      DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------------------------------------
-- Order items — line items belonging to an order
-- Relationship: Many order_items → one order (via order_id)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS order_items (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  order_id    INT            NOT NULL,
  product_id  INT            NOT NULL,
  quantity    INT            NOT NULL,
  price       DECIMAL(10,2)  NOT NULL,
  FOREIGN KEY (order_id)   REFERENCES orders(id)   ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)  ON DELETE CASCADE
);

-- -------------------------------------------------------
-- Wishlist — user's saved-for-later products
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS wishlist (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT NOT NULL DEFAULT 1,
  product_id  INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  UNIQUE KEY unique_wish (user_id, product_id)
);

-- ============================================================
-- SEED DATA — 20 realistic products across 5 categories
-- ============================================================

INSERT INTO products (name, description, price, original_price, discount_percent, rating, category, stock, image_url) VALUES
-- Mobiles (4)
('Samsung Galaxy S23 Ultra', '6.8" Dynamic AMOLED, 200MP Camera, Snapdragon 8 Gen 2, 12GB RAM, 256GB Storage', 74999.00, 124999.00, 40, 4.5, 'Mobiles', 50, 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80'),
('iPhone 15 Pro Max', '6.7" Super Retina XDR, A17 Pro chip, 48MP Camera, Titanium Design, 256GB', 134900.00, 159900.00, 16, 4.7, 'Mobiles', 30, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&q=80'),
('OnePlus 12', '6.82" LTPO AMOLED, Snapdragon 8 Gen 3, 50MP Hasselblad Camera, 100W Charging', 64999.00, 69999.00, 7, 4.4, 'Mobiles', 80, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80'),
('Redmi Note 13 Pro+', '6.67" AMOLED 120Hz, 200MP Camera, Dimensity 7200, 12GB RAM, 5000mAh', 29999.00, 34999.00, 14, 4.2, 'Mobiles', 150, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80'),

-- Electronics (4)
('Sony WH-1000XM5 Headphones', 'Industry-leading noise cancellation, 30hr battery, Hi-Res Audio, multipoint connection', 24990.00, 34990.00, 29, 4.6, 'Electronics', 100, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80'),
('Apple MacBook Air M2', '13.6" Liquid Retina, M2 chip, 8GB RAM, 256GB SSD, 18hr battery, MagSafe', 99990.00, 119900.00, 17, 4.8, 'Electronics', 25, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80'),
('Samsung 55" Crystal 4K UHD TV', '4K UHD, Crystal Processor 4K, HDR10+, Smart TV with Tizen OS', 42990.00, 64900.00, 34, 4.3, 'Electronics', 40, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80'),
('JBL Charge 5 Bluetooth Speaker', 'IP67 waterproof, 20hr playtime, Partyboost, Dual bass radiators', 12999.00, 18999.00, 32, 4.4, 'Electronics', 200, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80'),

-- Fashion (4)
('Nike Air Max 270 Sneakers', 'Max Air 270 unit, mesh upper, foam midsole, iconic lifestyle shoe', 8995.00, 13995.00, 36, 4.3, 'Fashion', 120, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80'),
('Levi\'s 511 Slim Fit Jeans', 'Slim from hip to ankle, stretch denim, classic 5-pocket styling', 2799.00, 4599.00, 39, 4.1, 'Fashion', 300, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80'),
('Ray-Ban Aviator Classic', 'Gold frame, green G-15 lenses, 100% UV protection, iconic pilot shape', 7490.00, 12990.00, 42, 4.5, 'Fashion', 80, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80'),
('Fossil Grant Chronograph Watch', 'Stainless steel case, leather strap, chronograph movement, water resistant', 8995.00, 14995.00, 40, 4.2, 'Fashion', 60, 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&q=80'),

-- Appliances (4)
('Dyson V15 Detect Cordless Vacuum', 'Laser dust detection, LCD screen, 60min runtime, HEPA filtration', 52990.00, 62990.00, 16, 4.6, 'Appliances', 35, 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80'),
('Samsung 253L Frost Free Refrigerator', 'Digital inverter compressor, convertible 5-in-1, all-around cooling', 24990.00, 32990.00, 24, 4.3, 'Appliances', 45, 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&q=80'),
('Philips Air Fryer HD9200', '4.1L capacity, Rapid Air technology, touch screen, dishwasher safe', 6999.00, 11995.00, 42, 4.4, 'Appliances', 90, 'https://images.unsplash.com/photo-1626509653291-18d9a934b9db?w=400&q=80'),
('LG 8kg Front Load Washing Machine', 'AI Direct Drive, Steam wash, 6 Motion DD, Smart Diagnosis', 35990.00, 47990.00, 25, 4.5, 'Appliances', 30, 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&q=80'),

-- Home (4)
('IKEA KALLAX Shelf Unit', '4x4 compartments, versatile storage, white, 147x147 cm', 12990.00, 16990.00, 24, 4.1, 'Home', 50, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80'),
('Prestige Omega Deluxe Cookware Set', '3-piece induction base, non-stick, GREBLON coating, cool-touch handles', 3499.00, 5999.00, 42, 4.3, 'Home', 200, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80'),
('Wakefit Orthopedic Memory Foam Mattress', 'Queen size, 8-inch, medium firm, CertiPUR-US certified foam', 11999.00, 19999.00, 40, 4.4, 'Home', 70, 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80'),
('Philips Hue White Ambiance Starter Kit', '3 smart bulbs + bridge, warm to cool white, voice control, app control', 8999.00, 13999.00, 36, 4.2, 'Home', 110, 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&q=80');

-- ============================================================
-- SEED: Product images for carousel (3 images per product)
-- ============================================================
INSERT INTO product_images (product_id, image_url) VALUES
(1, 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80'),
(1, 'https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=600&q=80'),
(1, 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=600&q=80'),
(2, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80'),
(2, 'https://images.unsplash.com/photo-1591337676887-a217a6c3e8e7?w=600&q=80'),
(2, 'https://images.unsplash.com/photo-1580910051074-3eb694886f3b?w=600&q=80'),
(3, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80'),
(3, 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=600&q=80'),
(3, 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&q=80'),
(4, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80'),
(4, 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80'),
(4, 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&q=80'),
(5, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80'),
(5, 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80'),
(5, 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80'),
(6, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80'),
(6, 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&q=80'),
(6, 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&q=80'),
(7, 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&q=80'),
(7, 'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=600&q=80'),
(7, 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80'),
(8, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80'),
(8, 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80'),
(8, 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600&q=80'),
(9, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80'),
(9, 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&q=80'),
(9, 'https://images.unsplash.com/photo-1556048219-bb6978360b84?w=600&q=80'),
(10, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80'),
(10, 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80'),
(10, 'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&q=80'),
(11, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80'),
(11, 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80'),
(11, 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=600&q=80'),
(12, 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80'),
(12, 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&q=80'),
(12, 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=600&q=80'),
(13, 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80'),
(13, 'https://images.unsplash.com/photo-1527515637462-cee1395c108b?w=600&q=80'),
(13, 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80'),
(14, 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&q=80'),
(14, 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&q=80'),
(14, 'https://images.unsplash.com/photo-1536353284924-9220c464e262?w=600&q=80'),
(15, 'https://images.unsplash.com/photo-1626509653291-18d9a934b9db?w=600&q=80'),
(15, 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&q=80'),
(15, 'https://images.unsplash.com/photo-1648480109546-0e63f61e7e80?w=600&q=80'),
(16, 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&q=80'),
(16, 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=600&q=80'),
(16, 'https://images.unsplash.com/photo-1635274605638-d44babc08a4f?w=600&q=80'),
(17, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80'),
(17, 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80'),
(17, 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80'),
(18, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80'),
(18, 'https://images.unsplash.com/photo-1584990347449-a2d4c2c044c9?w=600&q=80'),
(18, 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&q=80'),
(19, 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80'),
(19, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80'),
(19, 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80'),
(20, 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600&q=80'),
(20, 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&q=80'),
(20, 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80');
