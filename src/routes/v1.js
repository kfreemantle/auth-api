'use strict';

const express = require('express');
const dataModules = require('../models'); // Update this line: Import models from correct path

const router = express.Router();

const logger = require('../auth/middleware/logger'); // Import the logger middleware

// The following block of code is a router.param middleware function that gets called
// when a parameter named "model" is present in the URL. It sets the correct data model
// for the requested route.
router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

// Define route handlers with the logger middleware
router.get('/:model', logger, handleGetAll);
router.get('/:model/:id', logger, handleGetOne);
router.post('/:model', logger, handleCreate);
router.put('/:model/:id', logger, handleUpdate);
router.delete('/:model/:id', logger, handleDelete);

// Route handler for GET requests to fetch all records for a given model
async function handleGetAll(req, res) {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
}

// Route handler for GET requests to fetch a single record by ID for a given model
async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.get(id);
  res.status(200).json(theRecord);
}

// Route handler for POST requests to create a new record for a given model
async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

// Route handler for PUT requests to update an existing record by ID for a given model
async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj);
  res.status(200).json(updatedRecord);
}

// Route handler for DELETE requests to delete a record by ID for a given model
async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}

// Export the router for use in other files
module.exports = router;
