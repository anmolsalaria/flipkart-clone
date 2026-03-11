-- ============================================================
-- Flipkart Clone — Extended Seed Data (80 additional products)
-- ============================================================
-- Run AFTER the initial seedProducts.sql.
-- Assumes products with id 1–20 already exist.
--
-- Categories covered:
--   Mobiles, Electronics, Fashion, Home, Appliances, Accessories
--
-- Usage:
--   mysql -u root -p flipkart_clone < seed/seedMore.sql
-- ============================================================

USE flipkart_clone;

-- ============================================================
-- PRODUCTS (80 new — ids will auto-increment from 21)
-- ============================================================

INSERT INTO products (name, description, price, original_price, discount_percent, rating, category, stock, image_url) VALUES

-- ─── MOBILES (14) ──────────────────────────────────────────
('iPhone 14', '6.1" Super Retina XDR, A15 Bionic chip, Dual 12MP cameras, Ceramic Shield, 128GB', 57999.00, 69900.00, 17, 4.5, 'Mobiles', 65, 'https://images.unsplash.com/photo-1632633173522-47456de71b76?w=400&q=80'),
('Samsung Galaxy A54 5G', '6.4" Super AMOLED 120Hz, Exynos 1380, 50MP Triple Camera, 5000mAh, IP67', 27999.00, 38999.00, 28, 4.2, 'Mobiles', 120, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&q=80'),
('Google Pixel 8 Pro', '6.7" LTPO OLED 120Hz, Tensor G3, 50MP Camera with AI features, 7 yrs updates', 84999.00, 106999.00, 21, 4.6, 'Mobiles', 40, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80'),
('Realme GT Neo 5', '6.74" AMOLED 144Hz, Snapdragon 8+ Gen 1, 50MP Sony IMX890, 150W charging', 26999.00, 35999.00, 25, 4.1, 'Mobiles', 90, 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&q=80'),
('Vivo V29 Pro', '6.78" 3D Curved AMOLED, Dimensity 8200, 50MP Aura Light Portrait, 80W Flash Charge', 31999.00, 39999.00, 20, 4.0, 'Mobiles', 75, 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&q=80'),
('Samsung Galaxy Z Flip5', '6.7" Dynamic AMOLED + 3.4" Cover, Snapdragon 8 Gen 2, Flex Mode', 84999.00, 109999.00, 23, 4.4, 'Mobiles', 25, 'https://images.unsplash.com/photo-1628744876497-eb30460be9f6?w=400&q=80'),
('OnePlus Nord CE 3', '6.72" AMOLED 120Hz, Snapdragon 782G, 50MP Sony IMX890, 80W SUPERVOOC', 22999.00, 27999.00, 18, 4.1, 'Mobiles', 140, 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&q=80'),
('iPhone 13', '6.1" Super Retina XDR, A15 Bionic, Dual 12MP cameras, Cinematic mode, 128GB', 49999.00, 59900.00, 17, 4.6, 'Mobiles', 55, 'https://images.unsplash.com/photo-1632661674596-df8be57c9969?w=400&q=80'),
('Nothing Phone (2)', '6.7" LTPO OLED 120Hz, Snapdragon 8+ Gen 1, Glyph Interface, 50MP dual camera', 39999.00, 49999.00, 20, 4.3, 'Mobiles', 60, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80'),
('Motorola Edge 40 Pro', '6.67" pOLED 165Hz, Snapdragon 8 Gen 2, 50MP OIS, 125W TurboPower charging', 44999.00, 59999.00, 25, 4.2, 'Mobiles', 45, 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&q=80'),
('Poco F5 5G', '6.67" AMOLED 120Hz, Snapdragon 7+ Gen 2, 64MP OIS, 67W turbo charge, IR blaster', 24999.00, 29999.00, 17, 4.3, 'Mobiles', 100, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80'),
('iQOO Neo 9 Pro', '6.78" LTPO AMOLED 144Hz, Snapdragon 8 Gen 2, 50MP flagship camera, 120W charge', 33999.00, 39999.00, 15, 4.3, 'Mobiles', 70, 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&q=80'),
('Samsung Galaxy S24', '6.2" Dynamic AMOLED 120Hz, Snapdragon 8 Gen 3, Galaxy AI, 50MP triple camera', 69999.00, 79999.00, 13, 4.7, 'Mobiles', 35, 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80'),
('Redmi 13C 5G', '6.74" 90Hz display, Dimensity 6100+, 50MP AI camera, 5000mAh, Side fingerprint', 10999.00, 14999.00, 27, 3.9, 'Mobiles', 200, 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&q=80'),

-- ─── ELECTRONICS (14) ─────────────────────────────────────
('Sony WF-1000XM5 Earbuds', 'True wireless, best-in-class ANC, Hi-Res Audio, 24hr battery with case, IPX4', 19990.00, 27990.00, 29, 4.7, 'Electronics', 80, 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&q=80'),
('Apple iPad Air M1', '10.9" Liquid Retina, M1 chip, 64GB, Touch ID, USB-C, Apple Pencil support', 49900.00, 59900.00, 17, 4.8, 'Electronics', 30, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80'),
('Dell XPS 13 Plus', '13.4" 3.5K OLED, Intel Core i7-1360P, 16GB RAM, 512GB SSD, Thunderbolt 4', 129990.00, 159990.00, 19, 4.5, 'Electronics', 20, 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400&q=80'),
('Samsung Galaxy Tab S9 FE', '10.9" TFT LCD 90Hz, Exynos 1380, S Pen included, IP68, 8000mAh', 36999.00, 49999.00, 26, 4.3, 'Electronics', 50, 'https://images.unsplash.com/photo-1561154464-82e9aeb8d7b0?w=400&q=80'),
('Bose QuietComfort Ultra Headphones', 'Spatial Audio, CustomTune ANC, 24hr battery, Snapdragon Sound', 29990.00, 39990.00, 25, 4.6, 'Electronics', 55, 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80'),
('Marshall Stanmore III Bluetooth Speaker', 'Iconic design, dynamic loudness, HDMI connectivity, multi-room support', 34999.00, 44999.00, 22, 4.4, 'Electronics', 40, 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&q=80'),
('Sony PlayStation 5 Slim', 'Ultra HD Blu-ray, 1TB SSD, DualSense controller, 4K 120fps gaming', 49990.00, 54990.00, 9, 4.8, 'Electronics', 15, 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&q=80'),
('Canon EOS R50 Mirrorless Camera', '24.2MP APS-C sensor, 4K video, eye-detect AF, RF-S 18-45mm kit lens', 62990.00, 74990.00, 16, 4.5, 'Electronics', 25, 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80'),
('Apple AirPods Pro 2nd Gen', 'Adaptive Audio, USB-C, IP54, 6hr battery, MagSafe charging case, Find My', 20900.00, 24900.00, 16, 4.7, 'Electronics', 100, 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&q=80'),
('Logitech MX Master 3S Mouse', '8K DPI, quiet clicks, MagSpeed scroll, USB-C, multi-device, ergonomic', 8995.00, 11495.00, 22, 4.6, 'Electronics', 85, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80'),
('JBL Tour One M2 Headphones', 'True Adaptive ANC, spatial sound, 50hr battery, multi-point, Hi-Res Audio', 17999.00, 24999.00, 28, 4.3, 'Electronics', 60, 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80'),
('Samsung 980 PRO 2TB NVMe SSD', 'PCIe Gen 4.0, 7000MB/s sequential read, NVMe 1.3c, heat spreader label', 13999.00, 22999.00, 39, 4.7, 'Electronics', 110, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80'),
('LG UltraGear 27" Gaming Monitor', '27" QHD IPS 165Hz, 1ms GTG, NVIDIA G-SYNC, HDR10, 99% sRGB', 22990.00, 31990.00, 28, 4.4, 'Electronics', 35, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80'),
('Kindle Paperwhite Signature Edition', '6.8" 300ppi, 32GB, wireless charging, auto-adjusting light, waterproof', 14999.00, 18999.00, 21, 4.6, 'Electronics', 90, 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&q=80'),

-- ─── FASHION (14) ──────────────────────────────────────────
('Adidas Ultraboost 22 Running Shoes', 'BOOST midsole, Primeknit+ upper, Continental rubber outsole, responsive run', 11999.00, 16999.00, 29, 4.4, 'Fashion', 80, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80'),
('Tommy Hilfiger Slim Fit Polo', 'Classic flag logo, piqué cotton, slim fit, ribbed collar and cuffs', 3499.00, 5499.00, 36, 4.1, 'Fashion', 150, 'https://images.unsplash.com/photo-1625910513413-5fc421e0e2f0?w=400&q=80'),
('Allen Solly Formal Blazer', 'Slim-fit, notched lapel, double-button closure, viscose blend, lined interior', 5999.00, 8999.00, 33, 4.0, 'Fashion', 60, 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80'),
('Puma RS-X Reinvention Sneakers', 'Running System tech, mesh & leather upper, EVA midsole, bold colorway', 6999.00, 9999.00, 30, 4.2, 'Fashion', 100, 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&q=80'),
('H&M Regular Fit Oxford Shirt', '100% cotton, button-down collar, chest pocket, regular fit, versatile wear', 1499.00, 2299.00, 35, 4.0, 'Fashion', 200, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80'),
('Woodland Leather Boots', 'Full-grain leather upper, rubber sole, padded collar, trekking-style lacing', 4499.00, 6995.00, 36, 4.3, 'Fashion', 70, 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&q=80'),
('Monte Carlo Wool Sweater', 'Merino wool blend, cable-knit pattern, ribbed cuffs and hem, crew neck', 2299.00, 3999.00, 42, 4.1, 'Fashion', 90, 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80'),
('Fastrack Aviator Sunglasses', 'Metal frame, gradient brown lenses, UV400 protection, spring hinges', 1299.00, 2199.00, 41, 4.0, 'Fashion', 180, 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80'),
('Nike Dri-FIT Training T-Shirt', 'Moisture-wicking, lightweight knit, standard fit, swoosh logo, polyester', 1799.00, 2495.00, 28, 4.3, 'Fashion', 160, 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&q=80'),
('Wildcraft Laptop Backpack 35L', 'Water-resistant fabric, padded laptop sleeve, ergonomic straps, multiple pockets', 1999.00, 3299.00, 39, 4.2, 'Fashion', 130, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80'),
('U.S. Polo Assn. Chinos', 'Slim tapered fit, stretch cotton, flat front, USPA branding on back pocket', 1899.00, 3199.00, 41, 4.0, 'Fashion', 140, 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80'),
('Armani Exchange Leather Belt', 'Reversible black/brown, AX logo buckle, genuine leather, adjustable size', 3999.00, 6999.00, 43, 4.2, 'Fashion', 75, 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400&q=80'),
('Peter England Formal Trousers', 'Regular fit, flat front, polyester-viscose blend, crease-resistant fabric', 1599.00, 2499.00, 36, 3.9, 'Fashion', 110, 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&q=80'),
('Reebok Classic Club C 85', 'Soft leather upper, die-cut EVA midsole, padded tongue, iconic silhouette', 4999.00, 7999.00, 38, 4.3, 'Fashion', 85, 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&q=80'),

-- ─── HOME (12) ─────────────────────────────────────────────
('Sleepyhead Original Mattress (Queen)', '3-layer foam, 78x60 inches, medium firm, removable zipper cover, 100-night trial', 12990.00, 19990.00, 35, 4.3, 'Home', 50, 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80'),
('Amazon Basics Microfiber Comforter', 'Queen size, soft microfiber fill, hypoallergenic, reversible, machine washable', 1799.00, 3299.00, 45, 4.1, 'Home', 180, 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80'),
('Solimo Engineered Wood Bookshelf', '5-shelf, walnut finish, adjustable shelves, anti-topple hardware included', 6499.00, 9999.00, 35, 4.0, 'Home', 40, 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&q=80'),
('Pigeon Stovekraft Dinner Set 37pcs', 'Opalware, microwave safe, dishwasher safe, floral design, chip resistant', 1599.00, 2999.00, 47, 4.2, 'Home', 120, 'https://images.unsplash.com/photo-1603199506016-5794e27e3f53?w=400&q=80'),
('Nilkamal Freedom Plastic Cabinet', 'Weather-proof, 4-shelf, mirror attachment, adjustable shelves, multi-use', 3999.00, 5999.00, 33, 3.8, 'Home', 55, 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&q=80'),
('Wipro 10W Smart LED Bulb (Pack of 4)', '16 million colors, voice control (Alexa/Google), app scheduling, energy saving', 1499.00, 2799.00, 46, 4.1, 'Home', 200, 'https://images.unsplash.com/photo-1565814329452-e1432b984590?w=400&q=80'),
('Cortina Velvet Blackout Curtains (2pc)', '7ft, thermal insulated, noise reducing, machine washable, rod pocket style', 999.00, 1999.00, 50, 4.0, 'Home', 150, 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80'),
('eCraftIndia Metal Wall Clock', '16-inch diameter, silent quartz movement, antique copper finish, decorative', 1299.00, 2499.00, 48, 4.3, 'Home', 90, 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&q=80'),
('Bathla Advance 5-Step Foldable Ladder', 'Steel frame, anti-skid steps, platform tray, compact fold, 150kg capacity', 3299.00, 4999.00, 34, 4.4, 'Home', 65, 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80'),
('Cello Opalware Mixing Bowl Set (5pc)', 'Stackable, microwave-safe, dishwasher-safe, BPA-free, gradient design', 799.00, 1499.00, 47, 4.1, 'Home', 170, 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=400&q=80'),
('Urban Ladder Prius Upholstered Bed', 'Queen size, tufted headboard, hydraulic storage, sheesham wood frame', 28999.00, 42999.00, 33, 4.5, 'Home', 15, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80'),
('Kuber Industries Cotton 6-Seater Table Cover', 'Floral printed, washable, anti-slip, 60x90 inches, dining room décor', 499.00, 999.00, 50, 3.8, 'Home', 200, 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&q=80'),

-- ─── APPLIANCES (13) ──────────────────────────────────────
('Samsung 7kg Top Load Washing Machine', 'Wobble technology, digital inverter motor, magic filter, diamond drum', 17990.00, 23990.00, 25, 4.3, 'Appliances', 40, 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&q=80'),
('Bajaj Majesty ICX 7 Induction Cooktop', '1900W, feather touch, auto-off, 8 preset menus, timer, voltage regulator', 2199.00, 3499.00, 37, 4.1, 'Appliances', 120, 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=400&q=80'),
('Havells Instanio Prime Geyser 15L', 'LED temperature indicator, color changing body, whirlflow technology, ISI mark', 8999.00, 12999.00, 31, 4.2, 'Appliances', 55, 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80'),
('Voltas 1.5 Ton 3 Star Split AC', 'Copper condenser, turbo cooling, anti-dust filter, auto-restart, R32 gas', 32990.00, 44990.00, 27, 4.4, 'Appliances', 30, 'https://images.unsplash.com/photo-1631567091046-8bcfb1c3b220?w=400&q=80'),
('Prestige IRIS 750W Mixer Grinder', '3 stainless steel jars, super efficient motor, 3-speed control + pulse', 3499.00, 5499.00, 36, 4.2, 'Appliances', 100, 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&q=80'),
('Haier 190L Direct Cool Refrigerator', '1-door, stabilizer-free operation (135–290V), diamond edge freezing, BEE 4-star', 12990.00, 17490.00, 26, 4.1, 'Appliances', 45, 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&q=80'),
('IFB 20L Convection Microwave Oven', '71 auto-cook menus, steam clean, multi-stage cooking, child lock, LED display', 11990.00, 16490.00, 27, 4.3, 'Appliances', 60, 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&q=80'),
('Crompton Energion HS 1200mm Ceiling Fan', 'BLDC motor, remote control, 35W power consumption, 5-star rated, inverter', 3299.00, 4999.00, 34, 4.4, 'Appliances', 150, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80'),
('Kent Grand Plus 8L RO+UV+UF Water Purifier', 'Mineral RO technology, UV + UF, TDS controller, 20L/hr flow rate, ISI mark', 15999.00, 21999.00, 27, 4.5, 'Appliances', 35, 'https://images.unsplash.com/photo-1564419320461-6eb9c0dfa2a2?w=400&q=80'),
('Bosch 2kg Semi-Automatic Washing Machine', 'Compact portable, gentle wash, ideal for baby clothes, spin dry, energy efficient', 8990.00, 11990.00, 25, 4.0, 'Appliances', 50, 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&q=80'),
('Morphy Richards OTG 52L', 'Convection rotisserie, motorized rotisserie, inner light, 2000W, 60-min timer', 9999.00, 14499.00, 31, 4.2, 'Appliances', 40, 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&q=80'),
('Eureka Forbes Quick Clean DX Vacuum Cleaner', '1200W, reusable dust bag, blower function, HEPA filter, lightweight 3.5kg', 4999.00, 7999.00, 38, 4.1, 'Appliances', 80, 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80'),
('Blue Star IC312DATU 1 Ton Inverter Split AC', 'Precision cooling, 3-star, copper condenser, self-clean, turbo cool', 29990.00, 42990.00, 30, 4.3, 'Appliances', 20, 'https://images.unsplash.com/photo-1631567091046-8bcfb1c3b220?w=400&q=80'),

-- ─── ACCESSORIES (13) ─────────────────────────────────────
('Apple Watch Series 9 (45mm)', 'Always-On Retina LTPO, S9 SiP, double tap gesture, blood oxygen, GPS', 41900.00, 49900.00, 16, 4.7, 'Accessories', 35, 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&q=80'),
('Samsung Galaxy Watch6 Classic', '1.47" Super AMOLED, rotating bezel, BioActive sensor, IP68, Wear OS', 28999.00, 37999.00, 24, 4.4, 'Accessories', 45, 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&q=80'),
('boAt Airdopes 141 TWS Earbuds', '42hr playback, ENx noise cancellation, 8mm drivers, IPX4, USB-C, ASAP charge', 999.00, 2990.00, 67, 3.9, 'Accessories', 200, 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400&q=80'),
('Noise ColorFit Pro 5 Smartwatch', '1.85" AMOLED, Bluetooth calling, SpO2, 100+ sports modes, 7-day battery', 2999.00, 5999.00, 50, 4.1, 'Accessories', 150, 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&q=80'),
('Ambrane 20000mAh Power Bank', '22.5W fast charge, USB-C PD, dual output, Li-polymer, LED indicator', 1299.00, 2499.00, 48, 4.2, 'Accessories', 180, 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&q=80'),
('Spigen Tough Armor iPhone 15 Case', 'Dual-layer protection, kickstand, Air Cushion, mil-grade drop tested', 1499.00, 2499.00, 40, 4.5, 'Accessories', 140, 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&q=80'),
('Belkin 3-in-1 MagSafe Charger', '15W MagSafe, Apple Watch charger, AirPods pad, Qi2, foldable travel design', 8999.00, 12999.00, 31, 4.4, 'Accessories', 50, 'https://images.unsplash.com/photo-1618478594486-c65b899c4936?w=400&q=80'),
('Fire-Boltt Phoenix Smartwatch', '1.3" HD, Bluetooth calling, 120+ sports modes, SpO2, heart rate, IP67', 1799.00, 4999.00, 64, 4.0, 'Accessories', 160, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80'),
('Anker 735 GaN 65W USB-C Charger', '3-port, GaN II, USB-C PD 3.0, laptop + phone simultaneous charge, compact', 3999.00, 5999.00, 33, 4.6, 'Accessories', 100, 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80'),
('Skullcandy Dime 3 True Wireless Earbuds', '20hr total battery, secure ear hook, IPX4 sweat & water resistant, mic', 1599.00, 2999.00, 47, 3.8, 'Accessories', 120, 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&q=80'),
('Samsung 25W Travel Adapter (USB-C)', 'Super fast charging, USB-C to C cable included, compact, PPS adaptive', 999.00, 1999.00, 50, 4.3, 'Accessories', 190, 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80'),
('Portronics SoundDrum 1 BT Speaker', '10W, TWS pairing, 6hr playtime, USB-C, AUX, FM radio, micro-SD slot', 1299.00, 2499.00, 48, 4.0, 'Accessories', 110, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80'),
('Zebronics Zeb-Juke Bar 9500 Pro Soundbar', '525W, 5.1 channel, wireless subwoofer, Bluetooth 5.0, HDMI ARC, LED display', 7999.00, 13999.00, 43, 4.2, 'Accessories', 30, 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&q=80');


-- ============================================================
-- PRODUCT IMAGES — 2-4 images per new product for carousel
-- ============================================================
-- Product IDs 21–100 (auto-increment after 20 existing products)
-- We group them by category for readability.

INSERT INTO product_images (product_id, image_url) VALUES

-- ─── MOBILES (id 21–34) ────────────────────────────────────
-- 21: iPhone 14
(21, 'https://images.unsplash.com/photo-1632633173522-47456de71b76?w=600&q=80'),
(21, 'https://images.unsplash.com/photo-1591337676887-a217a6c3e8e7?w=600&q=80'),
(21, 'https://images.unsplash.com/photo-1580910051074-3eb694886f3b?w=600&q=80'),
-- 22: Samsung Galaxy A54
(22, 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80'),
(22, 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80'),
(22, 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=600&q=80'),
-- 23: Pixel 8 Pro
(23, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80'),
(23, 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=600&q=80'),
(23, 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&q=80'),
-- 24: Realme GT Neo 5
(24, 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=600&q=80'),
(24, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80'),
-- 25: Vivo V29 Pro
(25, 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&q=80'),
(25, 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80'),
(25, 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&q=80'),
-- 26: Galaxy Z Flip5
(26, 'https://images.unsplash.com/photo-1628744876497-eb30460be9f6?w=600&q=80'),
(26, 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80'),
(26, 'https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=600&q=80'),
-- 27: OnePlus Nord CE 3
(27, 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80'),
(27, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80'),
-- 28: iPhone 13
(28, 'https://images.unsplash.com/photo-1632661674596-df123a1eb820?w=600&q=80'),
(28, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80'),
(28, 'https://images.unsplash.com/photo-1591337676887-a217a6c3e8e7?w=600&q=80'),
-- 29: Nothing Phone (2)
(29, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80'),
(29, 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=600&q=80'),
(29, 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&q=80'),
-- 30: Motorola Edge 40 Pro
(30, 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&q=80'),
(30, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80'),
-- 31: Poco F5 5G
(31, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80'),
(31, 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80'),
(31, 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&q=80'),
-- 32: iQOO Neo 9 Pro
(32, 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=600&q=80'),
(32, 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80'),
-- 33: Galaxy S24
(33, 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80'),
(33, 'https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=600&q=80'),
(33, 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=600&q=80'),
-- 34: Redmi 13C 5G
(34, 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&q=80'),
(34, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80'),

-- ─── ELECTRONICS (id 35–48) ───────────────────────────────
-- 35: Sony WF-1000XM5
(35, 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&q=80'),
(35, 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&q=80'),
(35, 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80'),
-- 36: iPad Air M1
(36, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80'),
(36, 'https://images.unsplash.com/photo-1561154464-82e9aeb8d7b0?w=600&q=80'),
(36, 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=600&q=80'),
-- 37: Dell XPS 13 Plus
(37, 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=600&q=80'),
(37, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80'),
(37, 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&q=80'),
-- 38: Galaxy Tab S9 FE
(38, 'https://images.unsplash.com/photo-1561154464-82e9aeb8d7b0?w=600&q=80'),
(38, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80'),
-- 39: Bose QuietComfort Ultra
(39, 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=80'),
(39, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80'),
(39, 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80'),
-- 40: Marshall Stanmore III
(40, 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80'),
(40, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80'),
(40, 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600&q=80'),
-- 41: PS5 Slim
(41, 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&q=80'),
(41, 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&q=80'),
(41, 'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?w=600&q=80'),
-- 42: Canon EOS R50
(42, 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80'),
(42, 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&q=80'),
(42, 'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=600&q=80'),
-- 43: AirPods Pro 2
(43, 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&q=80'),
(43, 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&q=80'),
-- 44: Logitech MX Master 3S
(44, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80'),
(44, 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&q=80'),
(44, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80'),
-- 45: JBL Tour One M2
(45, 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80'),
(45, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80'),
-- 46: Samsung SSD
(46, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&q=80'),
(46, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&q=80'),
-- 47: LG UltraGear Monitor
(47, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80'),
(47, 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=600&q=80'),
(47, 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80'),
-- 48: Kindle Paperwhite
(48, 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=600&q=80'),
(48, 'https://images.unsplash.com/photo-1544716281-17c42105b252?w=600&q=80'),

-- ─── FASHION (id 49–62) ──────────────────────────────────
-- 49: Adidas Ultraboost
(49, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80'),
(49, 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&q=80'),
(49, 'https://images.unsplash.com/photo-1556048219-bb6978360b84?w=600&q=80'),
-- 50: Tommy Polo
(50, 'https://images.unsplash.com/photo-1625910513413-5fc421e0e2f0?w=600&q=80'),
(50, 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&q=80'),
-- 51: Allen Solly Blazer
(51, 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80'),
(51, 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80'),
(51, 'https://images.unsplash.com/photo-1593030103066-0093718e7177?w=600&q=80'),
-- 52: Puma RS-X
(52, 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&q=80'),
(52, 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80'),
-- 53: H&M Oxford
(53, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80'),
(53, 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&q=80'),
(53, 'https://images.unsplash.com/photo-1625910513413-5fc421e0e2f0?w=600&q=80'),
-- 54: Woodland Boots
(54, 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&q=80'),
(54, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80'),
-- 55: Monte Carlo Sweater
(55, 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80'),
(55, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80'),
-- 56: Fastrack Sunglasses
(56, 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80'),
(56, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80'),
(56, 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=600&q=80'),
-- 57: Nike Dri-FIT
(57, 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&q=80'),
(57, 'https://images.unsplash.com/photo-1625910513413-5fc421e0e2f0?w=600&q=80'),
-- 58: Wildcraft Backpack
(58, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80'),
(58, 'https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=600&q=80'),
(58, 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=600&q=80'),
-- 59: USPA Chinos
(59, 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80'),
(59, 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80'),
-- 60: Armani Belt
(60, 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&q=80'),
(60, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80'),
-- 61: Peter England Trousers
(61, 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80'),
(61, 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80'),
-- 62: Reebok Club C
(62, 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80'),
(62, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80'),
(62, 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&q=80'),

-- ─── HOME (id 63–74) ─────────────────────────────────────
-- 63: Sleepyhead Mattress
(63, 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80'),
(63, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80'),
(63, 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80'),
-- 64: Comforter
(64, 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80'),
(64, 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80'),
-- 65: Bookshelf
(65, 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&q=80'),
(65, 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80'),
(65, 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80'),
-- 66: Dinner Set
(66, 'https://images.unsplash.com/photo-1603199506016-5794e27e3f53?w=600&q=80'),
(66, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80'),
-- 67: Nilkamal Cabinet
(67, 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80'),
(67, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80'),
-- 68: Smart LED Bulbs
(68, 'https://images.unsplash.com/photo-1565814329452-e1432b984590?w=600&q=80'),
(68, 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600&q=80'),
(68, 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80'),
-- 69: Blackout Curtains
(69, 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80'),
(69, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80'),
-- 70: Wall Clock
(70, 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=600&q=80'),
(70, 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80'),
-- 71: Foldable Ladder
(71, 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80'),
(71, 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80'),
-- 72: Mixing Bowl Set
(72, 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&q=80'),
(72, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80'),
-- 73: Upholstered Bed
(73, 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80'),
(73, 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80'),
(73, 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80'),
-- 74: Table Cover
(74, 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80'),
(74, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80'),

-- ─── APPLIANCES (id 75–87) ───────────────────────────────
-- 75: Samsung Top Load
(75, 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&q=80'),
(75, 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=600&q=80'),
-- 76: Bajaj Induction
(76, 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&q=80'),
(76, 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&q=80'),
-- 77: Havells Geyser
(77, 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80'),
(77, 'https://images.unsplash.com/photo-1564419320461-6eb9c0dfa2a2?w=600&q=80'),
-- 78: Voltas AC
(78, 'https://images.unsplash.com/photo-1631567091046-8bcfb1c3b220?w=600&q=80'),
(78, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80'),
(78, 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80'),
-- 79: Prestige Mixer
(79, 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&q=80'),
(79, 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=600&q=80'),
-- 80: Haier Fridge
(80, 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&q=80'),
(80, 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&q=80'),
(80, 'https://images.unsplash.com/photo-1536353284924-9220c464e262?w=600&q=80'),
-- 81: IFB Microwave
(81, 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=600&q=80'),
(81, 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&q=80'),
-- 82: Crompton Fan
(82, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80'),
(82, 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80'),
-- 83: Kent Water Purifier
(83, 'https://images.unsplash.com/photo-1564419320461-6eb9c0dfa2a2?w=600&q=80'),
(83, 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80'),
(83, 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80'),
-- 84: Bosch Portable Washer
(84, 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&q=80'),
(84, 'https://images.unsplash.com/photo-1635274605638-d44babc08a4f?w=600&q=80'),
-- 85: Morphy Richards OTG
(85, 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=600&q=80'),
(85, 'https://images.unsplash.com/photo-1648480109546-0e63f61e7e80?w=600&q=80'),
-- 86: Eureka Forbes Vacuum
(86, 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80'),
(86, 'https://images.unsplash.com/photo-1527515637462-cee1395c108b?w=600&q=80'),
-- 87: Blue Star AC
(87, 'https://images.unsplash.com/photo-1631567091046-8bcfb1c3b220?w=600&q=80'),
(87, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80'),

-- ─── ACCESSORIES (id 88–100) ─────────────────────────────
-- 88: Apple Watch Series 9
(88, 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600&q=80'),
(88, 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=80'),
(88, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80'),
-- 89: Galaxy Watch6 Classic
(89, 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&q=80'),
(89, 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80'),
(89, 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&q=80'),
-- 90: boAt Airdopes 141
(90, 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&q=80'),
(90, 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&q=80'),
-- 91: Noise ColorFit Pro 5
(91, 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=80'),
(91, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80'),
(91, 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600&q=80'),
-- 92: Ambrane Power Bank
(92, 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80'),
(92, 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80'),
-- 93: Spigen Case
(93, 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80'),
(93, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80'),
-- 94: Belkin MagSafe Charger
(94, 'https://images.unsplash.com/photo-1618478594486-c65b899c4936?w=600&q=80'),
(94, 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80'),
(94, 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80'),
-- 95: Fire-Boltt Smartwatch
(95, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80'),
(95, 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=80'),
-- 96: Anker 65W Charger
(96, 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80'),
(96, 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80'),
-- 97: Skullcandy Dime 3
(97, 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&q=80'),
(97, 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&q=80'),
(97, 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80'),
-- 98: Samsung 25W Adapter
(98, 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80'),
(98, 'https://images.unsplash.com/photo-1618478594486-c65b899c4936?w=600&q=80'),
-- 99: Portronics SoundDrum
(99, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80'),
(99, 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80'),
-- 100: Zebronics Soundbar
(100, 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80'),
(100, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80'),
(100, 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600&q=80');
