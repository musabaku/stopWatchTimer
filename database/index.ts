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
// db.execSync('DROP TABLE IF EXISTS sessions;'); 
  db.execSync(
    `CREATE TABLE IF NOT EXISTS sessions(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      selectedCategory TEXT NOT NULL,
      description TEXT,
      duration INTEGER NOT NULL,
      end_time TEXT NOT NULL
    );`
  );
};

// Inserting data uses the on-demand connection
export const addSession = (selectedCategory: string,description: string, duration: number) => {
  const db = getDbConnection();
  const endTime = new Date().toISOString();
  db.runSync(
    'INSERT INTO sessions (selectedCategory,description, duration, end_time) VALUES (?,?, ?, ?)',
    [selectedCategory,description, duration, endTime]
  );
};

// Fetching data uses the on-demand connection
export const getAllSessions = (filter:'day'|'week'|'month'|'all'='all'): any[] => {
  const db = getDbConnection();
  let query = 'SELECT * FROM sessions'
  if(filter==='day'){
    query+=" WHERE date(end_time)=date('now','localtime')"
  }
  if(filter==='week'){
    query+=" WHERE date(end_time)>=date('now','-6 days','localtime')"
  }
  if(filter==='month'){
    query+=" WHERE date(end_time)>=date('now','-29 days','localtime')"
  }
  query+=' ORDER BY end_time DESC'
  return db.getAllSync(query);
};


export const deleteSession = (id:number)=>{
const db = getDbConnection();
db.runSync('DELETE FROM sessions WHERE id = ?',[id])
}