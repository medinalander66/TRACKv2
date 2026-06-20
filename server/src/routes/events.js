const express = require('express');
const router = express.Router();
const { createEvent, listMyLocations } = require('../controllers/eventsController');
const { authenticate } = require('../middleware/auth');
const requireOfficials = require('../middleware/requireOfficials');

// Create event (RBAC for campus/department)
router.post('/', authenticate, (req, res, next) => {
  const visibility = req.body.visibility;
  if (visibility === 'campus' || visibility === 'department') {
    return requireOfficials(req, res, next);
  }
  next();
}, createEvent);

// Get locations created by the authenticated user (for reuse)
router.get('/locations', authenticate, listMyLocations);

module.exports = router;