create table product(
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  brand VARCHAR(50),
  name VARCHAR(50),
  slug VARCHAR(50),
  reference VARCHAR(50),
  description VARCHAR(500),
  stock INTEGER,
  price INTEGER,
  picture VARCHAR(200),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);