// const app = require('./app');
// const dotenv = require('dotenv')
// const connectDatabase = require('./config/database');
// const WebSocket = require('ws');
// const express = require('express');
// //const axios = require('axios');
// const { MongoClient } = require('mongodb');

// dotenv.config({ path: "config/config.env" });

// connectDatabase();
// const server = app.listen(process.env.PORT, () => {
//     console.log(`server listening to the port : ${process.env.PORT} in ${process.env.NODE_ENV}`)
// })
// process.on('unhandledRejection', (err) => {
//     console.log(`Error:${err.message}`);
//     console.log('Shutting down the server due to unhandled rejection')
//     server.close(() => {
//         process.exit(1)
//     })
//})


// process.on('uncaughtException', (err) => {
//     console.log(`Error:${err.message}`);
//     console.log('Shutting down the server due to uncaught exception')
//     server.close(() => {
//         process.exit(1)
//     })
// })


// //const app = express();
// /*
// const server = app.listen(8000, () => {
//     console.log('Server listening on port 8000');
// }); */


// const wss = new WebSocket.Server({ server });



// // wss.on('connection', async (ws) => {
// //     console.log('WebSocket connection established');

// //     const uri = 'mongodb://newUser:newUserPassword@103.214.132.20:27017/'; // Replace with your MongoDB URI
// //     const client = new MongoClient(uri);


// //     ws.onmessage = async (event) => {
// //         const receivedData = JSON.parse(event.data);
// //         console.log('Received data2:', Object.keys(receivedData).length);

// //         // Here, insert the received data as a new document in the database
// //         // Assuming receivedData is an object containing the fields you want to insert

// //         try {
// //             await client.connect();

// //             const db = client.db('test'); // Replace with your database name
// //             const collection = db.collection('location_tracking'); // Replace with your collection name
// //             if (Object.keys(receivedData).length > 2) {
// //                 const insertResult = await collection.insertOne(receivedData);
// //                 console.log('Insert result:', insertResult);
// //             }
// //             else {
// //                 const query = collection.findOne({ driver_id: receivedData.driverId });

// //                 // Wait for the query to complete and send the result to the client
// //                 const result = await query;
// //                 console.log(result, 'result')
// //                 ws.send(JSON.stringify({ result }));
// //             }
// //         } catch (error) {
// //             console.error('Error while inserting data:', error.message);
// //         }
// //     };

// //     // ws.onmessage = async (event) => {
// //     //     const receivedData2 = JSON.parse(event.data);
// //     //     console.log('Received data2:', receivedData2);

// //     //     // Here, insert the received data as a new document in the database
// //     //     // Assuming receivedData is an object containing the fields you want to insert

// //     //     try {
// //     //         await client.connect();

// //     //         const db = client.db('test'); // Replace with your database name
// //     //         const collection = db.collection('location_tracking'); // Replace with your collection name
// //     //         const query = collection.findOne({});

// //     //         // Wait for the query to complete and send the result to the client
// //     //         const result = await query;
// //     //         console.log(result, 'result')
// //     //         ws.send(JSON.stringify({ result }));
// //     //     } catch (error) {
// //     //         console.error('Error while inserting data:', error.message);
// //     //     }
// //     // };

// //     const callAPIs = async () => {

// //         await client.connect();

// //         const db = client.db('test'); // Replace with your database name
// //         const collection = db.collection('location_tracking'); // Replace with your collection name

// //         // Get the last data posted in the tasks collection

// //         const query = collection.findOne({});

// //         // Wait for the query to complete and send the result to the client
// //         const result = await query;
// //         // console.log(result, 'result')
// //         ws.send(JSON.stringify({ result }));
// //     }
// //     const interval = setInterval(callAPIs, 10000); // Call APIs every 10 seconds
// //     callAPIs();

// //     //code for website to get particular driver route




// //     // const callAPIs1 = async () => {

// //     //     await client.connect();

// //     //     const db = client.db('test'); // Replace with your database name
// //     //     const collection = db.collection('location_tracking'); // Replace with your collection name

// //     //     // Get the last data posted in the tasks collection

// //     //     const query = collection.findOne({});

// //     //     // Wait for the query to complete and send the result to the client
// //     //     const result = await query;
// //     //     console.log(result, 'result')
// //     //     ws.send(JSON.stringify({ result }));
// //     // }
// //     // callAPIs1();
// //     // const interval1 = setInterval(callAPIs, 10000); // Call APIs every 10 seconds

// //     // Clean up the interval and WebSocket connection on disconnect
// //     ws.on('close', () => {
// //         console.log('WebSocket connection closed');
// //         clearInterval(interval);
// //         // clearInterval(interval1);
// //     });
// //     ws.onclose = () => {
// //         console.log('WebSocket connection closed');
// //     };
// // });

// const mongoURI = 'mongodb://newUser:newUserPassword@103.214.132.20:27017/';
// const dbName = 'test';

// let db;

// const clients = new Map();

// wss.on('connection', (ws, req) => {
//     const uri = 'mongodb://newUser:newUserPassword@103.214.132.20:27017/'; // Replace with your MongoDB URI
//     const client = new MongoClient(uri);
//     const userId = req.headers['sec-websocket-key'];
//     clients.set(userId, ws);

//     console.log(`WebSocket connected for user ${userId}`);

//     ws.on('message', async (message) => {
//         try {
//             const data = JSON.parse(message);
//             const { action } = data;
//             await client.connect();

//             const db = client.db('test'); // Replace with your database name
//             const collection = db.collection('location_tracking'); // Replace with your collection name
//             if (Object.keys(data).length > 2) {
//                 const insertResult = await collection.insertOne(data);
//                 console.log('Insert result:', insertResult);
//             }
//             else {
//                 console.log(data.userId, "action.userId")
//                 const query = collection.find({ driver_id: data.userId }).sort({ _id: -1 }) // Sort by _id in descending order
//                     .limit(1);

//                 // Wait for the query to complete and send the result to the client
//                 const result = await query.toArray();

//                 // Wait for the query to complete and send the result to the client
//                 // const result = await query;
//                 console.log(result, 'result')
//                 ws.send(JSON.stringify({ action: 'userData', data: result?.[0] }));
//             }
//             // if (action === 'getData') {
//             //     // Fetch data from the database based on user ID


//             //     // Send the fetched data back to the user
//             //     ws.send(JSON.stringify({ action: 'userData', data: userData }));
//             // }
//         } catch (error) {
//             console.error('Error processing WebSocket message:', error);
//         }
//     });

//     ws.on('close', () => {
//         console.log(`WebSocket disconnected for user ${userId}`);
//         clients.delete(userId);
//     });
// });







//////////////////////////////////////////orgenel code /////////////////////////////////////////////////////


// const app = require('./app');
// const dotenv = require('dotenv');
// const connectDatabase = require('./config/database');
// const WebSocket = require('ws');
// const { MongoClient } = require('mongodb');

// // Load environment variables
// dotenv.config({ path: "config/config.env" });

// // Connect to the database
// connectDatabase();

// const server = app.listen(process.env.PORT, () => {
//     console.log(`Server listening on port: ${process.env.PORT} in ${process.env.NODE_ENV}`);
// });

// // Handle unhandled promise rejections
// process.on('unhandledRejection', (err) => {
//     console.log(`Error: ${err.message}`);
//     console.log('Shutting down the server due to unhandled rejection');
//     server.close(() => {
//         process.exit(1);
//     });
// });

// // Handle uncaught exceptions
// process.on('uncaughtException', (err) => {
//     console.log(`Error: ${err.message}`);
//     console.log('Shutting down the server due to uncaught exception');
//     server.close(() => {
//         process.exit(1);
//     });
// });


// // Set up WebSocket server
// const wss = new WebSocket.Server({ server });

// // MongoDB connection URI (from your image)
// // const mongoURI = 'mongodb://localhost:27017'; // Connect to MongoDB on localhost
// //const mongoURI = 'mongodb://127.0.0.1:27017';
// const mongoURI = 'mongodb://newUser:newUserPassword@103.214.132.20:27017/';

// const dbName = 'test'; // Ensure this matches the actual database name

// let db;
// const clients = new Map();

// wss.on('connection', (ws, req) => {
//     const client = new MongoClient(mongoURI);
//     const userId = req.headers['sec-websocket-key']; // Using WebSocket's unique ID as userId
//     clients.set(userId, ws);

//     console.log(`WebSocket connected for user1 ${userId}`);

//     ws.on('message', async (message) => {
//         try {
//             const data = JSON.parse(message);

//             // Connect to MongoDB
//             await client.connect();
//             const db = client.db(dbName);
//             const collection = db.collection('location_tracking'); // Replace with your collection name

//             if (Object.keys(data).length > 2) {
//                 // Insert data into the MongoDB collection
//                 const insertResult = await collection.insertOne(data);
//                 console.log('Insert result:', insertResult);
//             } else {
//                 // Retrieve the latest data from the collection for the specific driver
//                 const query = collection.find({ driver_id: data.userId }).sort({ _id: -1 }).limit(1);
//                 const result = await query.toArray();

//                 // Send the result back to the WebSocket client
//                 ws.send(JSON.stringify({ action: 'userData', data: result?.[0] }));
//             }
//         } catch (error) {
//             console.error('Error processing WebSocket message:', error);
//         }
//     });

//     ws.on('close', () => {
//         console.log(`WebSocket disconnected for user ${userId}`);
//         clients.delete(userId);
//     });
// });





///////////////////////////////////////////////////////update code /////////////////////////////////////////////////



const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
const WebSocket = require('ws');
const { MongoClient } = require('mongodb');

// Load environment variables
dotenv.config({ path: "config/config.env" });

// Connect to the database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server listening on port: ${process.env.PORT} in ${process.env.NODE_ENV}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error(`Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error(`Uncaught Exception: ${err.message}`);
    server.close(() => process.exit(1));
});

// Set up WebSocket server
const wss = new WebSocket.Server({ server });

// MongoDB connection
const mongoURI = process.env.DB_LOCAL_URI || 'mongodb://localhost:27017/bustracking';
const dbName = 'test';
const client = new MongoClient(mongoURI);

let db;
const clients = new Map();

async function initDB() {
    try {
        await client.connect();
        db = client.db(dbName);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}

// Initialize database connection
initDB();

wss.on('connection', (ws, req) => {
    const userId = req.headers['sec-websocket-key']; // WebSocket unique ID
    clients.set(userId, ws);

    console.log(`WebSocket connected for user: ${userId}`);

    ws.on('message', async (message) => {
        try {
            const data = JSON.parse(message);
            const locationCollection = db.collection('location_tracking');
            const waitingCollection = db.collection('waiting_locations');

            if (!data.driver_id || !data.latitude || !data.longitude) {
                console.warn('Missing driver_id, latitude, or longitude in message:', data);
                return;
            }

            // Get today's date in YYYY-MM-DD format
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Normalize to start of the day

            // Check if the same driver_id, latitude, and longitude exist for today
            const existingLocation = await locationCollection.findOne({
                driver_id: data.driver_id,
                latitude: data.latitude,
                longitude: data.longitude,
                createdAt: { $gte: today }
            });

            if (existingLocation) {
                // Update waiting_locations to track duration
                const waitEntry = await waitingCollection.findOne({
                    driver_id: data.driver_id,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    date: today
                });

                if (waitEntry) {
                    // Update end_time in waiting_locations
                    await waitingCollection.updateOne(
                        { _id: waitEntry._id },
                        { $set: { end_time: new Date() } }
                    );
                    console.log(`Updated waiting location for driver_id: ${data.driver_id}`);
                } else {
                    // Insert a new waiting entry
                    await waitingCollection.insertOne({
                        driver_id: data.driver_id,
                        route_id: data.route_id,
                        latitude: data.latitude,
                        longitude: data.longitude,
                        start_time: new Date(),
                        end_time: new Date(),
                        date: today
                    });
                    console.log(`Inserted new waiting location for driver_id: ${data.driver_id}`);
                }
            } else {
                // Insert a new location into location_tracking
                await locationCollection.insertOne({
                    driver_id: data.driver_id,
                    route_id: data.route_id,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    createdAt: new Date(),
                    end_time: new Date()
                });
                console.log(`Inserted new location for driver_id: ${data.driver_id}`);
            }

            // Send updated data to the client
            const latestData = await locationCollection.findOne({ driver_id: data.driver_id });
            ws.send(JSON.stringify({ action: 'userData', data: latestData }));

        } catch (error) {
            console.error('Error processing WebSocket message:', error);
        }
    });

    ws.on('close', () => {
        console.log(`WebSocket disconnected for user ${userId}`);
        clients.delete(userId);
    });
});
