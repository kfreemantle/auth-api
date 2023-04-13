'use strict';

// Update the path to the users.js file
const Users = require('../../models/users');

module.exports = async (req, res, next) => {
  // Check if the authorization header is present
  if (!req.headers.authorization) {
    next('Invalid Login');
    return;
  }

  // Extract the token from the authorization header
  let token = req.headers.authorization.split(' ').pop();

  try {
    // Authenticate the user using the token
    req.user = await Users.authenticateToken(token);
    // If authentication is successful, call the next middleware
    next();
  } catch (error) {
    // If authentication fails, return an error with status 403
    res.status(403).send('Invalid Login');
  }
};
