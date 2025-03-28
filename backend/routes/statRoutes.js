const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const { getAdminDashboardStats } = require('../controllers/statController');

router.get('/adminDashboardStats', authenticate, getAdminDashboardStats);

module.exports = router;