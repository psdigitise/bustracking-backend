const mongoose = require('mongoose');
const Driver = require('../models/driverModel');
const Route = require('../models/routeModel');
const Student = require('../models/parentModel');
const CatchAsyncError = require('../middlewares/CatchAysncError')
const APIFeatures = require('../utils/apiFeatures');
const Routeasign = require('../models/routeasignModel');
const schoolList = require('../models/schoolistModel');
//const Driver =mongoose.model('driver_list');

exports.login = async (req, res, next) => {
    const { user_name, password, fcmToken, serverKey } = req.body;

    try {
        const login_status = await Driver.findOneAndUpdate(
            { driver_email: user_name, driver_password: password },
            { $set: { fcmToken, serverKey } },
            { new: true } // to return the updated document
        );
        const destination_details = await schoolList.find();
        if (login_status) {
            req.session.loggedIn = true;

            // Extract the _id field
            const { _id, ...responseWithoutId } = login_status.toObject();

            res.status(200).json({
                status: true,
                login_status: [{ _id, ...responseWithoutId }],
                destination_details
            });
        } else {
            res.status(200).json({
                status: false,
                message: "Enter correct username and password for the driver",
            });
        }
    } catch (error) {
        // Handle errors appropriately
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
};






/*
exports.add_stations = async (req, res, next) => {


    const stations =await Route.find().select({ });

    
    //for (const data of stations) {
         
        //data

        // myItems.push({
        //     key1: 'value1',
        //     key2: 'value2',
        // });


        // stations.dataObject = {
        //     key1: 'value1',
        //     key2: 'value2'
        //     // Add more key-value pairs as needed
        // };

        //await stations.save();

      //res.write((data) + '\n');
        
     //}

     //res.json(data);


    res.status(200).json({
        status: true,
        message:stations
    })
    

    // res.write('Hello, ');
    // res.end();

    
    //res.status(JSON.stringify(stations) + '\n');
        
    //for (const stations of allData) {
      //  res.write(JSON.stringify(dataItem) + '\n');
    //}

}
*/

exports.fetch_route = async (req, res, next) => {
    let driver_id = "64e0292171c025df24944a05"
    if (req.body.driver_id != null) {
        console.log(req.body, "req.body.driver_id")
        const asigned_data = await Routeasign.findOne({
            driver_id: req.body.driver_id
        }).select({ _id: 0 }).sort({ _id: -1 });
        if (asigned_data) {
            const rid = asigned_data.route_id
            const stations = await Route.find({ route_id: rid }).sort({ order_no: 0, });
            const studdata = await Student.find({ route_id: rid });
            const driverData = await Driver.find({ _id: req.body.driver_id });

            let jsonArray = [];
            for (const bus_station of stations) {
                let jsonObjectToAppend = {
                    bus_station,
                    studentData: studdata.filter((e) => e.bus_station == bus_station?.id)
                };
                jsonArray.push(jsonObjectToAppend);
            }
            res.status(200).json({
                status: true,
                message: jsonArray,
                driverData
            });
        }
        else {
            res.status(200).json({
                status: true,
                message: "No assigned routes for driver"
            });
        }
    }
    else {
        res.status(200).json({
            status: false,
            message: "Please enter the driver id"
        });


    }
}



exports.fetch_Driver_route = async (req, res, next) => {
    if (!req.body.route_id) {
        return res.status(400).json({
            status: false,
            message: "Please enter the route ID"
        });
    }

    try {
        const rid = req.body.route_id;
        
        // Find stations for the given route ID
        const stations = await Route.find({ route_id: rid }).sort({ order_no: 1 });
        
        // Find students assigned to this route
        const studdata = await Student.find({ route_id: rid });

        // Find the assigned driver for this route (if any)
        const assignedRoute = await Routeasign.findOne({ route_id: rid }).select({ driver_id: 1 });
        let driverData = null;

        if (assignedRoute) {
            driverData = await Driver.findOne({ _id: assignedRoute.driver_id });
        }

        let jsonArray = [];
        for (const bus_station of stations) {
            let jsonObjectToAppend = {
                bus_station,
                studentData: studdata.filter((e) => e.bus_station == bus_station?.id)
            };
            jsonArray.push(jsonObjectToAppend);
        }

        res.status(200).json({
            status: true,
            message: jsonArray,
            driverData
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};
