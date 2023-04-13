const { server } = require('../src/server');
const supertest = require('supertest');
const mockRequest = supertest(server);

// Import the authentication middleware for testing
const basicAuth = require('../src/auth/middleware/basic');
const bearerAuth = require('../src/auth/middleware/bearer');

// Import the Users model for testing purposes
const Users = require('../src/models/users');

// Create a mock user for testing
const testUser = {
  username: 'testuser',
  password: 'testpassword',
};

describe('Auth Middleware', () => {
  // Clean up: remove the test user from the database after testing
  afterEach(async () => {
    await Users.destroy({ where: { username: testUser.username } });
  });

  describe('Basic Auth', () => {
    it('should authenticate a user with valid credentials', async () => {
      // Create the test user in the database
      const user = await Users.create(testUser);

      // Generate the base64 encoded username:password string
      const base64Credentials = Buffer.from(`${testUser.username}:${testUser.password}`).toString('base64');
      const req = { headers: { authorization: `Basic ${base64Credentials}` } };
      const res = {};
      const next = jest.fn();

      await basicAuth(req, res, next);

      expect(next).toHaveBeenCalledWith();
      expect(req.user).toBeDefined();
      expect(req.user.username).toEqual(testUser.username);
    });

    it('should not authenticate a user with invalid credentials', async () => {
      // Generate the base64 encoded username:wrongpassword string
      const base64Credentials = Buffer.from(`${testUser.username}:wrongpassword`).toString('base64');
      const req = { headers: { authorization: `Basic ${base64Credentials}` } };
      const res = {};
      const next = jest.fn();

      await basicAuth(req, res, next);

      // The middleware should call next with an error
      expect(next).toHaveBeenCalledWith(expect.any(Error));
      expect(req.user).toBeUndefined();
    });
  });

  describe('Bearer Auth', () => {
    it('should authenticate a user with a valid token', async () => {
      // Create the test user in the database
      const user = await Users.create(testUser);

      // Generate a token for the test user
      const token = user.generateToken();
      const req = { headers: { authorization: `Bearer ${token}` } };
      const res = {};
      const next = jest.fn();

      await bearerAuth(req, res, next);

      expect(next).toHaveBeenCalledWith();
      expect(req.user).toBeDefined();
      expect(req.user.username).toEqual(testUser.username);
    });

    it('should not authenticate a user with an invalid token', async () => {
      const req = { headers: { authorization: `Bearer invalidtoken` } };
      const res = {};
      const next = jest.fn();

      await bearerAuth(req, res, next);

      // The middleware should call next with an error
      expect(next).toHaveBeenCalledWith(expect.any(Error));
      expect(req.user).toBeUndefined();
    });
  });
});
