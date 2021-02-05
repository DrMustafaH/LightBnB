const { Pool } = require('pg');

const pool = new Pool({
  database: 'lightbnb'
});


module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params)
      .then(callback)
  },
}