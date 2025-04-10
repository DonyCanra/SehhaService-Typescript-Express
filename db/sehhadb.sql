CREATE TABLE facilities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255),
    contact_number VARCHAR(50),
    email VARCHAR(100) UNIQUE
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'Active',
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role_id INT REFERENCES roles(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_facilities (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    facility_id INT REFERENCES facilities(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, facility_id)
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    facility_id INT REFERENCES facilities(id) ON DELETE CASCADE,
    name VARCHAR(50)
);


CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    code VARCHAR(100) NOT NULL unique,
    description VARCHAR(250)
);

CREATE TABLE role_permissions (
    role_id INT REFERENCES roles(id) ON DELETE CASCADE,
    permission_id INT REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);


-- Insert data ke tabel facilities
INSERT INTO facilities (name, address, contact_number, email) VALUES
('RS Sehat', 'Jl. Sehat No. 1', '081234567890', 'rssehat@example.com'),
('Klinik Medika', 'Jl. Medis No. 2', '081234567891', 'klinikmedika@example.com');

-- Insert data ke tabel roles
INSERT INTO roles (facility_id, name) VALUES
(1, 'admin'),
(1, 'doctor'),
(2, 'nurse');

-- Insert data ke tabel users
INSERT INTO users (username, email, password, status, first_name, last_name, role_id) VALUES
('donycanra', 'donycanra@gmail.com', 'hashedpassword1', "Active", 'Budi', 'Santoso', 1),
('andi456', 'andi@example.com', 'hashedpassword2', "InActive", 'Andi', 'Wijaya', 2),
('siti789', 'siti@example.com', 'hashedpassword3', "Active", 'Siti', 'Rahma', 3);

-- Insert data ke tabel user_facilities (Menghubungkan users dengan facilities)
INSERT INTO user_facilities (user_id, facility_id) VALUES
(1, 1),
(2, 1),
(3, 2),
(1, 2);

-- Insert data ke tabel permissions
INSERT INTO permissions (code, description) VALUES
('VIEW_PATIENT_DATA', 'Dapat melihat data pasien'),
('EDIT_PATIENT_RECORDS', 'Dapat mengedit rekam medis pasien'),
('MANAGE_USERS', 'Dapat mengelola pengguna'),
('ACCESS_REPORTS', 'Dapat mengakses laporan');

-- Insert data ke tabel role_permissions (Menghubungkan roles dengan permissions)
-- Admin memiliki semua izin
INSERT INTO role_permissions (role_id, permission_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4);

-- Dokter hanya memiliki izin melihat & mengedit data pasien
INSERT INTO role_permissions (role_id, permission_id) VALUES
(2, 1), (2, 2);

-- Perawat hanya bisa melihat data pasien
INSERT INTO role_permissions (role_id, permission_id) VALUES
(3, 1);