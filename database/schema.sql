-- database/schema.sql

-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) UNIQUE,
    cashtag VARCHAR(50) UNIQUE, -- e.g., '$JohnDoe'
    balance DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL REFERENCES users(id),
    receiver_id INTEGER NOT NULL REFERENCES users(id),
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    type VARCHAR(50) NOT NULL, -- e.g., 'send', 'receive', 'withdrawal', 'deposit'
    status VARCHAR(50) NOT NULL, -- e.g., 'pending', 'completed', 'failed'
    transaction_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    CONSTRAINT chk_amount_positive CHECK (amount > 0)
);

-- Create Linked_Accounts Table (for bank/debit linking - mocked for MVP, but good for schema)
CREATE TABLE IF NOT EXISTS linked_accounts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    account_type VARCHAR(50) NOT NULL, -- 'bank' or 'debit'
    account_number_last_four VARCHAR(4), -- Storing last four for display
    bank_name VARCHAR(100),
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
CREATE INDEX IF NOT EXISTS idx_users_cashtag ON users (cashtag);
CREATE INDEX IF NOT EXISTS idx_transactions_sender_id ON transactions (sender_id);
CREATE INDEX IF NOT EXISTS idx_transactions_receiver_id ON transactions (receiver_id);
