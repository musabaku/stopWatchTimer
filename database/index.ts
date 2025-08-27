// database/index.ts - FINAL CORRECT VERSION
import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

// This function gets the connection, opening it only if it's not already open.
function getDbConnection() {
  if (db === null) {
    db = SQLite.openDatabaseSync('sessions.db');
  }
  return db;
}

// Initialization now uses the on-demand connection
export const initializeDatabase = () => {
  const db = getDbConnection();
  db.execSync(
    `CREATE TABLE IF NOT EXISTS sessions(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tag TEXT NOT NULL,
      duration INTEGER NOT NULL,
      end_time TEXT NOT NULL
    );`
  );
};

// Inserting data uses the on-demand connection
export const addSession = (tag: string, duration: number) => {
  const db = getDbConnection();
  const endTime = new Date().toISOString();
  db.runSync(
    'INSERT INTO sessions (tag, duration, end_time) VALUES (?, ?, ?)',
    [tag, duration, endTime]
  );
};

// Fetching data uses the on-demand connection
export const getAllSessions = (): any[] => {
  const db = getDbConnection();
  return db.getAllSync('SELECT * FROM sessions ORDER BY end_time DESC');
};