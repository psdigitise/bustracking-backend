

// const mongoose = require('mongoose');
// const Driver = require('../models/driverModel.js');
// const Parent = require('../models/parentModel.js');
// const admin = require('firebase-admin');

// // Initialize Firebase Admin
// admin.initializeApp({
//   credential: admin.credential.cert('./bustrackingparent-a3182-firebase-adminsdk-t86sm-c50c3964b7.json'),
// });

// exports.parentDriverNotificationMessage = async (req, res) => {
//     try {
      
//         const parentTokens = await Parent.find().select('fcmToken');
//         const driverTokens = await Driver.find().select('fcmToken');
     

       
//     const allTokens = [
//       ...parentTokens.map(doc => ({ fcmToken: doc.fcmToken, type: 'parent' })),
//       ...driverTokens.map(doc => ({ fcmToken: doc.fcmToken, type: 'driver' }))
//   ];

//         // Send response with all tokens
//         res.status(200).json(allTokens);
//     } catch (error) {
//         // Log the error and send a generic response
//         console.error('Error fetching FCM tokens:', error.message || error);
//         res.status(500).json({ message: 'Error fetching FCM tokens', error: error.message });
//     }
// };


// exports.fcmNotification = async (req, res) => {
//   const { tokens, title, message } = req.body;

//   if (!tokens || !Array.isArray(tokens) || tokens.length === 0) {
//     return res.status(400).json({ success: false, error: 'No tokens provided' });
//   }
//   if (!title || !message) {
//     return res.status(400).json({ success: false, error: 'Title and message are required' });
//   }

//   try {
//     const payload = {
//       notification: {
//         title,
//         body: message,
//       },
//     };

//     // Send notifications to multiple devices using sendMulticast
//     //don't use sendMulticast use sendEachForMulticast
//     const response = await admin.messaging().sendEachForMulticast({
//       tokens: tokens,  // Send array of tokens
//       notification: payload.notification,
//     });

//     res.status(200).json({ success: true, response });
//   } catch (error) {
//     console.error('Error sending notification:', error);
//     res.status(500).json({ success: false, error: error.message || 'Failed to send notification' });
//   }
// };





const mongoose = require('mongoose');
const Driver = require('../models/driverModel.js');
const Parent = require('../models/parentModel.js');
const admin = require('firebase-admin');


// Initialize Firebase Admin for Parent
const parentApp = admin.initializeApp({
  credential: admin.credential.cert('./bustrackingparent-a3182-firebase-adminsdk-t86sm-c50c3964b7.json',),
}, 'parentApp');

// Initialize Firebase Admin for Driver
const driverApp = admin.initializeApp({
  credential: admin.credential.cert('./bustrackingdriver-563c6-firebase-adminsdk-nf0p6-9f23bdcfda.json'),
}, 'driverApp');

exports.parentDriverNotificationMessage = async (req, res) => {
    try {
        // Select only the fcmToken field from both collections
        const parentTokens = await Parent.find().select('fcmToken');
        const driverTokens = await Driver.find().select('fcmToken');
     

        
    
    const allTokens = [
      ...parentTokens.map(doc => ({ fcmToken: doc.fcmToken, type: 'parent' })),
      ...driverTokens.map(doc => ({ fcmToken: doc.fcmToken, type: 'driver' }))
  ];
        // Send response with all tokens
        res.status(200).json(allTokens);
    } catch (error) {
        // Log the error and send a generic response
        console.error('Error fetching FCM tokens:', error.message || error);
        res.status(500).json({ message: 'Error fetching FCM tokens', error: error.message });
    }
};



exports.fcmNotification = async (req, res) => {
  const { tokens, title, message, type } = req.body;

  if (!title || !message) {
    return res.status(400).json({ success: false, error: 'Title and message are required' });
  }
  if (!type || !['parent', 'driver', 'both'].includes(type)) {
    return res.status(400).json({ success: false, error: 'Invalid type. Must be "parent", "driver", or "both".' });
  }

  try {
    const payload = {
      notification: {
        title,
        body: message,
      },
    };

    let parentResponse = null;
    let driverResponse = null;

    // Send notifications based on type
    if (type === 'parent' || type === 'both') {
      const parentTokens = await Parent.find().select('fcmToken');
      const parentAppTokens = parentTokens.map(doc => doc.fcmToken).filter(Boolean);
      if (parentAppTokens.length) {
        parentResponse = await parentApp.messaging().sendEachForMulticast({
          tokens: parentAppTokens,
          notification: payload.notification,
        });
      }
    }

    if (type === 'driver' || type === 'both') {
      const driverTokens = await Driver.find().select('fcmToken');
      const driverAppTokens = driverTokens.map(doc => doc.fcmToken).filter(Boolean);
      if (driverAppTokens.length) {
        driverResponse = await driverApp.messaging().sendEachForMulticast({
          tokens: driverAppTokens,
          notification: payload.notification,
        });
      }
    }

    res.status(200).json({
      success: true,
      message: 'Notifications sent',
      parentResponse,
      driverResponse,
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to send notification' });
  }
};


