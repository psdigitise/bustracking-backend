const express = require('express');
const { login , fetch_route ,add_stations} = require('../controllers/driverController');
const { parent_login ,fetch_driver} = require('../controllers/parentController');
const { fetch_Driver_route } = require('../../controllers/driverController');
const router = express.Router();


//router.post('/newcomment', newComment);
//router.get('/comments', getComments);
//router.delete('/comment/:id', deleteComment);
//router.post('/login', login);
router.post('/driver_login', login);
//router.post('/add_stations',add_stations);
router.post('/fetch_route', fetch_route);
router.post('/fetch_Driver_route', fetch_Driver_route);
router.post('/parent_login', parent_login);
router.post('/fetch_driver', fetch_driver);

module.exports = router;