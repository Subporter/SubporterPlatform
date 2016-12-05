const express = require('express'),
	router = express.Router(),
	jwt = require('express-jwt'),
	config = require('../../config/subporter.config'),
	auth = jwt({
		secret: config.jwt_secret,
		userProperty: 'payload'
	});

let authenticationController = require('../controllers/authentication');
let profileController = require('../controllers/profile');

// authentication
router.post('/register', authenticationController.register);
router.post('/login', authenticationController.login);

// profile
router.get('/profile', auth, profileController.getProfile);