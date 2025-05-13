CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    login VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    type VARCHAR(10) CHECK (type IN ('user', 'company')) NOT NULL
);

-- Insert some sample users
INSERT INTO users (login, password, type) VALUES
('user1', 'password123', 'user'),
('company1', 'password123', 'company')
ON CONFLICT (login) DO NOTHING;
