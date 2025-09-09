import { openDatabaseAsync } from 'expo-sqlite';
import * as Crypto from 'expo-crypto';

interface User {
  id: number;
  email: string;
  password?: string; // Add password as optional for now, will be selected in auth
}

// Simple hash function using crypto
const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await Crypto.digest(Crypto.CryptoDigestAlgorithm.SHA256, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

let db: Awaited<ReturnType<typeof openDatabaseAsync>> | null = null;

const getDatabase = async () => {
  if (!db) {
    try {
      console.log('Opening database...');
      db = await openDatabaseAsync('app.db');
      console.log('Database opened successfully');
      
      if (!db) {
        throw new Error('openDatabaseAsync returned null');
      }
      
      // Test de connexion simple
      await db.execAsync('SELECT 1');
      console.log('Database connection test passed');
      
    } catch (error) {
      console.error('Failed to open database:', error);
      db = null;
      throw new Error(`Database connection failed: ${error}`);
    }
  }
  
  return db;
};

export const initDatabase = async () => {
  try {
    // Reset database instance to force new connection
    db = null;
    
    const database = await getDatabase();
    console.log('Database initialized.');
    
    // Attendre un peu avant d'exécuter les commandes
    await new Promise(resolve => setTimeout(resolve, 100));
    
    try {
      // Set WAL mode first, outside of any transaction
      console.log('Setting WAL mode...');
      await database.execAsync('PRAGMA journal_mode = WAL;');
      console.log('WAL mode set successfully');
      
      // Attendre un peu avant la transaction
      await new Promise(resolve => setTimeout(resolve, 100));
      
      console.log('Creating users table...');
      await database.withTransactionAsync(async () => {
        await database.execAsync(
          'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, email TEXT NOT NULL UNIQUE, password TEXT NOT NULL);'
        );
      });
      console.log('Users table created successfully');
      
    } catch (execError) {
      console.error('Error during database setup:', execError);
      // Reset database connection on error
      db = null;
      throw execError;
    }
    
  } catch (error) {
    console.error('Database initialization error:', error);
    // Reset database instance on error
    db = null;
    throw error;
  }
};

export const registerUser = async (email: string, password: string): Promise<User> => {
  try {
    const database = await getDatabase();

    if (typeof password !== 'string') {
      console.error('Password is not a string:', password);
      throw new Error('Invalid password type provided.');
    }

    const hashedPassword = await hashPassword(password);
    let newUser: User | null = null;

    await database.withTransactionAsync(async () => {
      const result = await database.runAsync(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [email, hashedPassword]
      );
      if (result.lastInsertRowId) {
        newUser = { id: result.lastInsertRowId, email };
      } else {
        throw new Error('Failed to register user');
      }
    });
    
    if (newUser) {
      return newUser;
    } else {
      throw new Error('Failed to retrieve registered user');
    }
  } catch (error) {
    console.error('Registration error:', error);
    if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
      throw new Error('An account with this email already exists.');
    }
    throw error;
  }
};

export const authenticateUser = async (email: string, password: string): Promise<User> => {
  try {
    const database = await getDatabase();
    let authenticatedUser: User | null = null;

    await database.withTransactionAsync(async () => {
      const user = await database.getFirstAsync<User>(
        'SELECT id, email, password FROM users WHERE email = ?',
        [email]
      );

      if (user) {
        const hashedInputPassword = await hashPassword(password);
        const isPasswordValid = hashedInputPassword === user.password;

        if (isPasswordValid) {
          authenticatedUser = { id: user.id, email: user.email };
        } else {
          throw new Error('Invalid credentials');
        }
      } else {
        throw new Error('User not found');
      }
    });
    
    if (authenticatedUser) {
      return authenticatedUser;
    } else {
      throw new Error('Failed to authenticate user');
    }
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}; 