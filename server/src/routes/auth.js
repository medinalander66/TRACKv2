const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');
const {
  googleLoginUrl,
  googleCallback,
  completeGoogleRegistration
} = require('../controllers/googleAuthController');

// Local admin login
router.post('/login', login);
router.post('/register', register);   // (old registration, may be unused later)

// Google SSO
router.get('/google', googleLoginUrl);
router.get('/google/callback', googleCallback);
router.post('/complete-google-registration', completeGoogleRegistration);

module.exports = router;