const pgp = require('pg-promise')();
const config = require('./config');
const connection = config.pg;
const db = pgp(connection);

module.exports = {
    query: (queryText, params) => {
        return db.query(queryText, params);
    }
}