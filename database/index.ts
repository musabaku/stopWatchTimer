import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

// This function gets the connection, opening it only if it's not already open.
function getDbConnection() {
  if (db === null) {
    db = SQLite.openDatabaseSync('sessions.db');
  }
  return db;
}
export const initializeDatabase = () => {
    const db = getDbConnection();

  // execSync is correct here because there are no parameters.
  db.execSync(
    `CREATE TABLE IF NOT EXISTS sessions(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tag TEXT NOT NULL,
      duration INTEGER NOT NULL,
      end_time TEXT NOT NULL
    );`
  );
};

// Use runSync for INSERT statements with parameters.
export const addSession = (tag: string, duration: number) => {
  const endTime = new Date().toISOString();
  db.runSync(
    'INSERT INTO sessions (tag, duration, end_time) VALUES (?, ?, ?)',
    [tag, duration, endTime]
  );
};

// Use getAllSync for SELECT statements to get all rows.
export const getAllSessions = (): any[] => {
  // This function returns the array of rows directly.
  return db.getAllSync('SELECT * FROM sessions ORDER BY end_time DESC');
};