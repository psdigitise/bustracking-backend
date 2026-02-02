const express = require('express');
const { getComments, newComment, deleteComment, login, add_stations, getstations, edit_stations, asign_route, add_route, getdrivers, getroutedetails, getbus, getstudentdetails, add_notification, add_bus } = require('../controllers/adminController');
// const busModel = require('../models/busModel');
const { add_parent, add_student } = require('../controllers/adminController - 240823');
const router = express.Router();


router.post('/newcomment', newComment);
router.get('/comments', getComments);
router.delete('/comment/:id', deleteComment);
router.post('/login', login);
router.post('/add_stations', add_stations);
router.post('/add_notifications', add_notification);
router.post('/add_parent', add_parent);
router.post('/add_student', add_student);
router.post('/getstations', getstations);
router.post('/getstudents', getstudentdetails);
router.post('/getdrivers', getdrivers);
router.post('/getroutedetails', getroutedetails);
router.post('/edit_stations', edit_stations);
router.post('/asign_route', asign_route);
router.post('/add_route', add_route);
router.post('/add_bus', add_bus);
router.post('/getbus', getbus);
//router.post('/delete_station', delete_station);
module.exports = router;