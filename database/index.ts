import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabaseSync('session.db')

const create_database_table =
`
CREATE TABLE IF NOT EXISTS sessions(
id INTEGER PRIMARY KEY AUTOINCREMENT,
tag TEXT NOT NULL,
duration INTEGER NOT NULL,
end_time TEXT NOT NULL
);
`;

export async function inititalizeDatabase(){
await db.execAsync(create_database_table)
return db
}

export async function addSession(insert_session,params){
await db.runAsync(insert_session,params)
return db
}