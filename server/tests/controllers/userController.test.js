const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../server.js");
require("dotenv").config();
const User = require('../../models/userModel');
// TODO: Create a separate database for testing
describe('User Controller', () => {
  let user;

  beforeEach(async () => {
    // Create a user for testing
    await mongoose.connect(process.env.MONGO_URI);
    
    user = await User.signup("testuser@example.com","ABCabc1!StrongPassword")
  });

  afterEach(async () => {
    // Delete the user after each test
    await User.findOneAndDelete({email: "testuser@example.com"});
    await User.findOneAndDelete({email: "newuser@example.com"});
    await mongoose.disconnect();
  });

  describe('POST /signup', () => {
    it('should create a new user and return a token', async () => {
      const response = await request(app)
        .post('/api/user/signup')
        .send({
          email: 'newuser@example.com',
          password: 'ABCabc1!StrongPassword',
        })
        .expect(200);

      expect(response.body.email).toBe('newuser@example.com');
      expect(response.body.token).toBeDefined();
    });

    it('should return an error if password is weak', async () => {
      const response = await request(app)
        .post('/api/user/signup')
        .send({
          email: 'newuser@example.com',
          password: 'weakpassword',
        })
        .expect(400)
      
        expect(response.body.error).toBe('Password not strong enough');
    })

    it('should return an error if email is already in use', async () => {
      
      const response = await request(app)
        .post('/api/user/signup')
        .send({
          email: 'testuser@example.com',
          password: 'newpassword',
        })
        .expect(400);

      expect(response.body.error).toBe('Email already in use');
    });
  });

  describe('POST /login', () => {
    it('should log in an existing user and return a token', async () => {
      const response = await request(app)
        .post('/api/user/login')
        .send({
          email: 'testuser@example.com',
          password: 'ABCabc1!StrongPassword',
        })
        .expect(200);

      expect(response.body.email).toBe('testuser@example.com');
      expect(response.body.token).toBeDefined();
    });

    it('should return an error if email is not found', async () => {
      const response = await request(app)
        .post('/api/user/login')
        .send({
          email: 'nonexistentuser@example.com',
          password: 'testpassword',
        })
        .expect(400);

      expect(response.body.error).toBe('Incorrect email');
    });

    it('should return an error if password is incorrect', async () => {
      const response = await request(app)
        .post('/api/user/login')
        .send({
          email: 'testuser@example.com',
          password: 'wrongpassword',
        })
        .expect(400);

      expect(response.body.error).toBe('Incorrect password');
    });
  });
});