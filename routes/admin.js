const express = require('express');
const { getComments, newComment, deleteComment, login, add_stations, add_route, getdrivers, getroutedetails, getbus, getstudentdetails,
    editGeneralSettings, getstations, edit_stations, asign_route, add_bus, add_parent, add_student, add_driver, deleteroutedetails,
    deleteGeneralSettings, addCollegeSchool, add_notification, delete_student, edit_driver, edit_bus, edit_route,
    editCollegeSchool, delete_stations, delete_bus, delete_driver, update_student_attendance, addGeneralSettings,getBusDetails,
    deleteCollegeSchool, edit_student, edit_parent, delete_parent, editTransportService,transportChoose,getTransportService,
    getCollegeSchools, addTransportService, deleteTransportService, getTransportServices,registerSuperAdmin,addTransportCredential,
    getTransportCredentials,
    editTransportCredential,createNotification,getNotifications,
    deleteTransportCredential, getWaitingLocations, addWaitingLocation, updateWaitingLocation,deleteWaitingLocation,
    getGeneralSettings,fetch_school } = require('../controllers/adminController');
const router = express.Router();
router.post('/newcomment', newComment);
router.get('/comments', getComments);
router.delete('/comment/:id', deleteComment);
router.post('/login', login);
router.post('/add_stations', add_stations);
router.post('/add_notifications', add_notification);
router.post('/add_parent', add_parent);
router.patch('/edit_parent', edit_parent);
router.post('/add_student', add_student);
router.post('/add_driver', add_driver);
router.patch('/edit_driver', edit_driver);
router.post('/getstations', getstations);
router.patch('/edit_stations', edit_stations);
router.post('/getstudents', getstudentdetails);
router.patch('/edit_student', edit_student);
router.post('/getdrivers', getdrivers);
router.post('/getroutedetails', getroutedetails);
router.post('/deleteroutedetails', deleteroutedetails);
router.post('/delete_stations', delete_stations);
router.post('/delete_bus', delete_bus);
router.post('/delete_driver', delete_driver);
router.post('/delete_student', delete_student);
router.post('/delete_parent', delete_parent);
router.post('/asign_route', asign_route);
router.post('/add_route', add_route);
router.patch('/edit_route', edit_route);
router.post('/add_bus', add_bus);
router.patch('/edit_bus', edit_bus);
router.post('/getbus', getbus);
router.post('/student_attendance', update_student_attendance);
router.post('/general_settings', addGeneralSettings);
router.patch('/general_settings/:id', editGeneralSettings);
router.delete('/general_settings/:id', deleteGeneralSettings);
router.get('/general_settings', getGeneralSettings);
router.post('/college_school', addCollegeSchool);
router.get('/college_school', getCollegeSchools);
router.patch('/college_school/:id', editCollegeSchool);
router.delete('/college_school/:id', deleteCollegeSchool);
router.post('/busdetails', addTransportService);
router.get('/busdetails', getTransportServices);
router.patch('/busdetails/:id', editTransportService);
router.delete('/busdetails/:id', deleteTransportService);
router.post('/transport-credentials', addTransportCredential);
router.get('/transport-credentials', getTransportCredentials);
router.patch('/transport-credentials/:id', editTransportCredential);
router.delete('/transport-credentials/:id', deleteTransportCredential);
router.post('/superadmin/register', registerSuperAdmin);
router.post("/transportchoose", transportChoose);
router.get("/transportchoose", getTransportService);

router.get("/busdetails/:id", getBusDetails);
// router.get("/busdetails/:id", getBusDetails);

router.get('/waiting_locations', getWaitingLocations);
router.post('/waiting_locations', addWaitingLocation);
router.put('/waiting_locations/:id', updateWaitingLocation);
router.delete('/waiting_locations/:id', deleteWaitingLocation);


// Create notification
router.post('/notifications',createNotification);

// Get all notifications
router.get('/notifications',getNotifications);

//// Fetch school details///////////
router.post('/fetch_school',fetch_school);
// router.post('/fetch_busroute',fetch_busroute);
// router.post('/fetch_pickupdrop_station',fetch_pickupdrop_station);





module.exports = router;

