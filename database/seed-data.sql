-- VillageEats Seed Data
-- Run this after schema.sql to populate your database with sample data

-- Insert sample locations
INSERT INTO locations (id, name, name_marathi, taluka, district, state) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Pune City', 'पुणे शहर', 'Pune', 'Pune', 'Maharashtra'),
('550e8400-e29b-41d4-a716-446655440002', 'Nashik', 'नाशिक', 'Nashik', 'Nashik', 'Maharashtra'),
('550e8400-e29b-41d4-a716-446655440003', 'Aurangabad', 'औरंगाबाद', 'Aurangabad', 'Aurangabad', 'Maharashtra'),
('550e8400-e29b-41d4-a716-446655440004', 'Kolhapur', 'कोल्हापूर', 'Kolhapur', 'Kolhapur', 'Maharashtra'),
('550e8400-e29b-41d4-a716-446655440005', 'Satara', 'सातारा', 'Satara', 'Satara', 'Maharashtra');

-- Insert sample shops
INSERT INTO shops (id, name, location_id, phone, address, is_open) VALUES
('650e8400-e29b-41d4-a716-446655440001', 'Sharma Kirana', '550e8400-e29b-41d4-a716-446655440001', '+91 9876543210', 'Shop No. 1, Main Road', true),
('650e8400-e29b-41d4-a716-446655440002', 'Village Grocery', '550e8400-e29b-41d4-a716-446655440001', '+91 9876543211', 'Shop No. 5, Market Area', true),
('650e8400-e29b-41d4-a716-446655440003', 'Fresh Mart', '550e8400-e29b-41d4-a716-446655440001', '+91 9876543212', 'Shop No. 10, New Market', true),
('650e8400-e29b-41d4-a716-446655440004', 'Vegetable Market', '550e8400-e29b-41d4-a716-446655440001', '+91 9876543213', 'Vegetable Market, Main Road', true);

-- Insert sample restaurants
INSERT INTO restaurants (id, name, name_marathi, image, rating, delivery_time, location_id, phone, address, is_open) VALUES
('750e8400-e29b-41d4-a716-446655440001', 'Spice Garden', 'स्पाइस गार्डन', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=400&fit=crop', 4.5, '25-30 mins', '550e8400-e29b-41d4-a716-446655440001', '+91 9876543220', 'Near Bus Stand, Main Road', true),
('750e8400-e29b-41d4-a716-446655440002', 'Village Dhaba', 'व्हिलेज ढाबा', 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=400&fit=crop', 4.2, '20-25 mins', '550e8400-e29b-41d4-a716-446655440001', '+91 9876543221', 'Highway Road, Near Petrol Pump', true),
('750e8400-e29b-41d4-a716-446655440003', 'Pizza Corner', 'पिझ्झा कॉर्नर', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop', 4.3, '30-35 mins', '550e8400-e29b-41d4-a716-446655440001', '+91 9876543222', 'Market Square, Shop No. 15', true);

-- Insert sample food items
INSERT INTO food_items (id, restaurant_id, name, name_marathi, image, price, category, category_marathi, description, is_available) VALUES
('850e8400-e29b-41d4-a716-446655440001', '750e8400-e29b-41d4-a716-446655440001', 'Vada Pav', 'वडा पाव', 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=400&fit=crop', 25.00, 'Fast Food', 'फास्ट फूड', 'Mumbai style vada pav with chutneys', true),
('850e8400-e29b-41d4-a716-446655440002', '750e8400-e29b-41d4-a716-446655440001', 'Misal Pav', 'मिसळ पाव', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=400&fit=crop', 45.00, 'Fast Food', 'फास्ट फूड', 'Spicy misal with pav and onions', true),
('850e8400-e29b-41d4-a716-446655440003', '750e8400-e29b-41d4-a716-446655440002', 'Dal Tadka', 'दाळ तडका', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=400&fit=crop', 120.00, 'Main Course', 'मुख्य जेवण', 'Yellow lentils with tempering', true),
('850e8400-e29b-41d4-a716-446655440004', '750e8400-e29b-41d4-a716-446655440003', 'Margherita Pizza', 'मार्गेरिटा पिझ्झा', 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=400&fit=crop', 299.00, 'Pizza', 'पिझ्झा', 'Classic pizza with tomato and mozzarella', true);

-- Insert sample general store items
INSERT INTO general_store_items (id, name, name_marathi, image, category, category_marathi, brand, rating, delivery_time, base_price, discount, description) VALUES
('950e8400-e29b-41d4-a716-446655440001', 'Colgate Toothpaste', 'कॉलगेट टूथपेस्ट', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop', 'Personal Care', 'वैयक्तिक काळजी', 'Colgate', 4.5, '15 mins', 45.00, 10, 'Advanced whitening toothpaste'),
('950e8400-e29b-41d4-a716-446655440002', 'Lux Soap', 'लक्स साबण', 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop', 'Personal Care', 'वैयक्तिक काळजी', 'Lux', 4.3, '15 mins', 35.00, 5, 'Beauty soap with moisturizers'),
('950e8400-e29b-41d4-a716-446655440003', 'Parle-G Biscuits', 'पार्ले-जी बिस्कीट', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop', 'Snacks', 'स्नॅक्स', 'Parle', 4.4, '10 mins', 20.00, 0, 'Glucose biscuits for energy'),
('950e8400-e29b-41d4-a716-446655440004', 'Clinic Plus Shampoo', 'क्लिनिक प्लस शॅम्पू', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop', 'Personal Care', 'वैयक्तिक काळजी', 'Clinic Plus', 4.2, '15 mins', 85.00, 15, 'Hair strengthening shampoo');

-- Insert sample grocery items
INSERT INTO grocery_items (id, name, name_marathi, image, category, category_marathi, brand, rating, delivery_time, discount, description) VALUES
('a50e8400-e29b-41d4-a716-446655440001', 'Basmati Rice', 'बासमती तांदूळ', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop', 'Grains', 'धान्य', 'India Gate', 4.6, '15 mins', 5, 'Premium long grain basmati rice'),
('a50e8400-e29b-41d4-a716-446655440002', 'Amul Milk', 'अमूल दूध', 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop', 'Dairy', 'दुग्धजन्य', 'Amul', 4.7, '10 mins', 0, 'Fresh full cream milk'),
('a50e8400-e29b-41d4-a716-446655440003', 'Tata Salt', 'टाटा मीठ', 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=400&h=400&fit=crop', 'Spices', 'मसाले', 'Tata', 4.3, '10 mins', 10, 'Iodized salt for healthy cooking'),
('a50e8400-e29b-41d4-a716-446655440004', 'Britannia Bread', 'ब्रिटानिया ब्रेड', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop', 'Bakery', 'बेकरी', 'Britannia', 4.2, '10 mins', 5, 'Soft and fresh white bread'),
('a50e8400-e29b-41d4-a716-446655440005', 'Onions', 'कांदे', 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop', 'Vegetables', 'भाज्या', 'Fresh', 4.0, '10 mins', 5, 'Fresh red onions from local farms'),
('a50e8400-e29b-41d4-a716-446655440006', 'Maggi Noodles', 'मॅगी नूडल्स', 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=400&fit=crop', 'Instant Food', 'तत्काळ खाद्य', 'Maggi', 4.4, '10 mins', 8, '2-minute instant noodles with masala');

-- Insert weight options for grocery items
INSERT INTO weight_options (grocery_item_id, weight, base_price) VALUES
-- Basmati Rice
('a50e8400-e29b-41d4-a716-446655440001', '500g', 45.00),
('a50e8400-e29b-41d4-a716-446655440001', '1kg', 85.00),
('a50e8400-e29b-41d4-a716-446655440001', '5kg', 400.00),
-- Amul Milk
('a50e8400-e29b-41d4-a716-446655440002', '500ml', 25.00),
('a50e8400-e29b-41d4-a716-446655440002', '1L', 48.00),
-- Tata Salt
('a50e8400-e29b-41d4-a716-446655440003', '100g', 5.00),
('a50e8400-e29b-41d4-a716-446655440003', '500g', 20.00),
('a50e8400-e29b-41d4-a716-446655440003', '1kg', 38.00),
-- Britannia Bread
('a50e8400-e29b-41d4-a716-446655440004', '200g', 12.00),
('a50e8400-e29b-41d4-a716-446655440004', '400g', 25.00),
('a50e8400-e29b-41d4-a716-446655440004', '800g', 48.00),
-- Onions
('a50e8400-e29b-41d4-a716-446655440005', '250g', 12.00),
('a50e8400-e29b-41d4-a716-446655440005', '500g', 22.00),
('a50e8400-e29b-41d4-a716-446655440005', '1kg', 40.00),
('a50e8400-e29b-41d4-a716-446655440005', '2kg', 75.00),
-- Maggi Noodles
('a50e8400-e29b-41d4-a716-446655440006', '70g', 14.00),
('a50e8400-e29b-41d4-a716-446655440006', '140g', 26.00),
('a50e8400-e29b-41d4-a716-446655440006', '280g', 48.00);

-- Insert shop-product relationships for general store items
INSERT INTO shop_products (shop_id, product_id, product_type, price_multiplier, distance, is_available) VALUES
-- Colgate Toothpaste
('650e8400-e29b-41d4-a716-446655440001', '950e8400-e29b-41d4-a716-446655440001', 'general', 1.0, '0.3 km', true),
('650e8400-e29b-41d4-a716-446655440002', '950e8400-e29b-41d4-a716-446655440001', 'general', 0.95, '0.8 km', true),
('650e8400-e29b-41d4-a716-446655440003', '950e8400-e29b-41d4-a716-446655440001', 'general', 1.05, '1.5 km', true),
-- Lux Soap
('650e8400-e29b-41d4-a716-446655440001', '950e8400-e29b-41d4-a716-446655440002', 'general', 1.0, '0.3 km', true),
('650e8400-e29b-41d4-a716-446655440002', '950e8400-e29b-41d4-a716-446655440002', 'general', 0.97, '0.8 km', true),
('650e8400-e29b-41d4-a716-446655440003', '950e8400-e29b-41d4-a716-446655440002', 'general', 1.03, '1.5 km', true),
-- Parle-G Biscuits
('650e8400-e29b-41d4-a716-446655440001', '950e8400-e29b-41d4-a716-446655440003', 'general', 1.0, '0.3 km', true),
('650e8400-e29b-41d4-a716-446655440002', '950e8400-e29b-41d4-a716-446655440003', 'general', 0.95, '0.8 km', true),
('650e8400-e29b-41d4-a716-446655440003', '950e8400-e29b-41d4-a716-446655440003', 'general', 1.0, '1.5 km', true),
-- Clinic Plus Shampoo
('650e8400-e29b-41d4-a716-446655440001', '950e8400-e29b-41d4-a716-446655440004', 'general', 1.0, '0.3 km', true),
('650e8400-e29b-41d4-a716-446655440002', '950e8400-e29b-41d4-a716-446655440004', 'general', 0.92, '0.8 km', true),
('650e8400-e29b-41d4-a716-446655440003', '950e8400-e29b-41d4-a716-446655440004', 'general', 1.08, '1.5 km', true);

-- Insert shop-product relationships for grocery items
INSERT INTO shop_products (shop_id, product_id, product_type, price_multiplier, distance, is_available) VALUES
-- Basmati Rice
('650e8400-e29b-41d4-a716-446655440001', 'a50e8400-e29b-41d4-a716-446655440001', 'grocery', 1.05, '0.3 km', true),
('650e8400-e29b-41d4-a716-446655440002', 'a50e8400-e29b-41d4-a716-446655440001', 'grocery', 1.0, '0.8 km', true),
('650e8400-e29b-41d4-a716-446655440003', 'a50e8400-e29b-41d4-a716-446655440001', 'grocery', 1.1, '1.5 km', true),
-- Amul Milk
('650e8400-e29b-41d4-a716-446655440001', 'a50e8400-e29b-41d4-a716-446655440002', 'grocery', 1.0, '0.3 km', true),
('650e8400-e29b-41d4-a716-446655440002', 'a50e8400-e29b-41d4-a716-446655440002', 'grocery', 0.98, '0.8 km', true),
('650e8400-e29b-41d4-a716-446655440003', 'a50e8400-e29b-41d4-a716-446655440002', 'grocery', 1.02, '1.5 km', true),
-- Tata Salt
('650e8400-e29b-41d4-a716-446655440001', 'a50e8400-e29b-41d4-a716-446655440003', 'grocery', 1.1, '0.3 km', true),
('650e8400-e29b-41d4-a716-446655440002', 'a50e8400-e29b-41d4-a716-446655440003', 'grocery', 1.0, '0.8 km', true),
('650e8400-e29b-41d4-a716-446655440003', 'a50e8400-e29b-41d4-a716-446655440003', 'grocery', 1.2, '1.5 km', true),
-- Britannia Bread
('650e8400-e29b-41d4-a716-446655440001', 'a50e8400-e29b-41d4-a716-446655440004', 'grocery', 1.0, '0.3 km', true),
('650e8400-e29b-41d4-a716-446655440002', 'a50e8400-e29b-41d4-a716-446655440004', 'grocery', 0.96, '0.8 km', true),
('650e8400-e29b-41d4-a716-446655440003', 'a50e8400-e29b-41d4-a716-446655440004', 'grocery', 1.04, '1.5 km', true),
-- Onions
('650e8400-e29b-41d4-a716-446655440004', 'a50e8400-e29b-41d4-a716-446655440005', 'grocery', 0.9, '0.2 km', true),
('650e8400-e29b-41d4-a716-446655440003', 'a50e8400-e29b-41d4-a716-446655440005', 'grocery', 1.0, '1.5 km', true),
('650e8400-e29b-41d4-a716-446655440002', 'a50e8400-e29b-41d4-a716-446655440005', 'grocery', 1.1, '0.8 km', true),
-- Maggi Noodles
('650e8400-e29b-41d4-a716-446655440001', 'a50e8400-e29b-41d4-a716-446655440006', 'grocery', 1.0, '0.3 km', true),
('650e8400-e29b-41d4-a716-446655440002', 'a50e8400-e29b-41d4-a716-446655440006', 'grocery', 0.93, '0.8 km', true),
('650e8400-e29b-41d4-a716-446655440003', 'a50e8400-e29b-41d4-a716-446655440006', 'grocery', 1.07, '1.5 km', true);
