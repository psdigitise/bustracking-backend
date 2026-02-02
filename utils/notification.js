
const express = require('express');
const { parentDriverNotificationMessage, fcmNotification } = require("../controllers/notificationController");



const router = express.Router();

router.get('/get_all_fcm_tokens',parentDriverNotificationMessage)
router.post('/send-notification',fcmNotification)
module.exports = router;