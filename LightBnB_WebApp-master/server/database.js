const db = require('./db')


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  const queryStr = `
  SELECT * FROM users
  WHERE email = $1;
  `;

  return db.query(queryStr, [email])
    .then(res => {
      if (res.rows) {
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch(err => {
      return console.log('ERROR OCCURED:', err);
    })
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  const queryStr = `
  SELECT * FROM users
  WHERE id = $1;
  `;
  return db.query(queryStr, [id])
    .then(res => {
      if (res.rows) {
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch(err => {
      return console.log('ERROR OCCURED:', err);
    })
};

exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const queryStr = `
  INSERT INTO
  users (name, email, password) 
  VALUES ($1, $2, $3)
  RETURNING *
  ;
  `
  const values = [user.name, user.email, user.password];

  return db.query(queryStr, values)
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      return console.log('ERROR OCCURED:', err);
    })
};

exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  const queryStr = `
  SELECT
  reservations.*,
  properties.*,
  AVG(property_reviews.rating) as average_rating
FROM
  reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
WHERE
  reservations.guest_id = $1
  AND reservations.end_date < now() :: DATE
GROUP BY
  properties.id,
  reservations.id
ORDER BY
  reservations.start_date
LIMIT
  $2;`
  return db.query(queryStr, [guest_id, limit])
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      return console.log('ERROR OCCURED:', err);
    })
};

exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  const queryParams = [];
  let queryStr = `SELECT
properties.*,
AVG(property_reviews.rating) as average_rating
FROM
properties
JOIN property_reviews ON property_id = properties.id `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryStr += `WHERE city LIKE $${queryParams.length} `;
  }
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    if (queryParams.length === 1) {
      queryStr += `WHERE owner_id = ${queryParams.length} `;
    } else {
      queryStr += `AND owner_id = ${queryParams.length} `;
    }
  }
  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`, `${options.maximum_price_per_night}`);
    if (queryParams.length === 2) {
      queryStr += `WHERE cost_per_night > $${queryParams.length - 1} AND cost_per_night < $${queryParams.length} `;
    } else {
      queryStr += `AND cost_per_night > $${queryParams.length - 1} AND cost_per_night < $${queryParams.length} `;
    }
  }
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    if (queryParams.length === 1) {
      queryStr += `WHERE rating >= $${queryParams.length} `;
    } else {
      queryStr += `AND rating >= $${queryParams.length} `;
    }
  }

  queryParams.push(limit);
  queryStr += `GROUP BY properties.id
ORDER BY cost_per_night
LIMIT $${queryParams.length};`

  // console.log(queryStr, queryParams);

  return db.query(queryStr, queryParams)
    .then(res => {
      return res.rows
    })
    .catch(err => {
      return console.log('ERROR OCCURED:', err);
    })
};

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const queryStr = `
  INSERT INTO
  properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;`;

  const values = [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.street, property.city, property.province, property.post_code, property.country, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms];

  return db.query(queryStr, values)
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      return console.log('ERROR OCCURED:', err);
    })
};

exports.addProperty = addProperty;