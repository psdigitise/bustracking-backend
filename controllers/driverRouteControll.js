// const mongoose = require('mongoose');
// const Driver = require('../models/driverModel');
// const Route = require('../models/routeModel');
// const Student = require('../models/parentModel');
// const CatchAsyncError = require('../middlewares/CatchAysncError')
// const APIFeatures = require('../utils/apiFeatures');
// const Routeasign = require('../models/routeasignModel');
// const schoolList = require('../models/schoolistModel');




// exports.fetch_Driver_route = async (req, res, next) => {
//     if (!req.body.route_id) {
//         return res.status(400).json({
//             status: false,
//             message: "Please enter the route ID"
//         });
//     }

//     try {
//         const rid = req.body.route_id;
        
//         // Find stations for the given route ID
//         const stations = await Route.find({ route_id: rid }).sort({ order_no: 1 });
        
//         // Find students assigned to this route
//         const studdata = await Student.find({ route_id: rid });

//         // Find the assigned driver for this route (if any)
//         const assignedRoute = await Routeasign.findOne({ route_id: rid }).select({ driver_id: 1 });
//         let driverData = null;

//         if (assignedRoute) {
//             driverData = await Driver.findOne({ _id: assignedRoute.driver_id });
//         }

//         let jsonArray = [];
//         for (const bus_station of stations) {
//             let jsonObjectToAppend = {
//                 bus_station,
//                 studentData: studdata.filter((e) => e.bus_station == bus_station?.id)
//             };
//             jsonArray.push(jsonObjectToAppend);
//         }

//         res.status(200).json({
//             status: true,
//             message: jsonArray,
//             driverData
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             status: false,
//             message: "Internal Server Error",
//             error: error.message
//         });
//     }
// };
