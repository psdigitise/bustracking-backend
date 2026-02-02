const mongoose = require('mongoose');
const Parent = require('../models/parentModel');
const Driver = require('../models/driverModel');
const Route = require('../models/routeModel');
const Routeasign = require('../models/routeasignModel');
const schoolList = require('../models/schoolistModel');
const AddRoute = require('../models/newrouteModel');
const CatchAsyncError = require('../middlewares/CatchAysncError')
const APIFeatures = require('../utils/apiFeatures');
//const Route = require('../models/routeModel');
const Student = require('../models/parentModel');
//const Driver =mongoose.model('driver_list');

exports.parent_login = async (req, res, next) => {
    try {
        const login_status = await Parent.findOne({
            parent_email: req.body.user_name,
            parent_password: req.body.password
        }).select({ _id: 0 });

        const routeid = login_status?.route_id;

        const asigned_data = await Routeasign.find({ route_id: routeid }).select({ _id: 0 }).sort({ _id: -1 });

        const driverid = asigned_data?.[0]?.driver_id;
        const driverdetails = await Driver.find({ _id: driverid });
        const findSource = await Route.find({ route_id: routeid });
       
        const student_stop = await findSource.filter((e) => e._id == login_status?.bus_station)
        const destination_details = await schoolList.find();
        if (login_status) {
            await Parent.updateOne(
                { parent_email: req.body.user_name },
                {
                    $set: {
                        fcmToken: req.body.fcmToken,
                        serverKey: req.body.serverKey
                    }
                }
            );

            req.session.loggedIn = true;
            res.status(200).json({
                status: true,
                login_status,
                driverdetails,
                student_stop,
                source_details: [findSource?.[0]],
                destination_details
            });
        } else {
            res.status(200).json({
                status: false,
                message: "Enter correct username and password"
            });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
};




exports.fetch_driver = async (req, res, next) => {

    if (req.body.parent_id != null && req.body.route_id != null) {

        const routeid = req.body.route_id;
        const fetch_details = await AddRoute.find({ route_id: routeid }).select({ _id: 0 }); //check with current date and time also

        if (fetch_details != '') {
            //fetch_details
            const asigned_data = await Routeasign.findOne({ route_id: routeid }).select({ _id: 0 }).sort({ _id: -1 });
            //let driverid=asigned_data.driver_id;
            const driverdetails = await Driver.find().select({ _id: 0 }); //check with
            const route_details = await AddRoute.find({ route_id: routeid }).select({ _id: 0 });
            console.log(route_details, "route_details")
            res.status(200).json({
                status: true,
                route_details: route_details,
                driver_details: driverdetails
            })


        }
        else {
            res.status(200).json({
                status: false,
                message: "can't find route details"
            })

        }

    }
    else {
        res.status(200).json({
            status: false,
            message: "Authetication failed"
        })
    }

}

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











// exports.fetchPickupDropStations = async (req, res, next) => {
//     try {
//         const { route_id } = req.body;
//         if (!route_id) {
//             return res.status(400).json({
//                 status: false,
//                 message: "Route ID is required"
//             });
//         }
//         // Fetch all stations matching the route_id
//         const stations = await Route.find({ route_id: route_id }).select({ _id: 0, __v: 0 }); // Exclude MongoDB's _id and __v fields
//         if (stations.length === 0) {
//             return res.status(404).json({
//                 status: false,
//                 message: "No stations found for the given route ID"
//             });
//         }
//         res.status(200).json({
//             status: true,
//             stations: stations
//         });
//     } catch (error) {
//         console.error("Error fetching pickup/drop stations:", error);
//         res.status(500).json({
//             status: false,
//             message: "Internal server error"
//         });
//     }
// };


exports.fetchPickupDropStations = async (req, res, next) => {
    try {
    const { route_id } = req.body;
    if (!route_id) {
    return res.status(400).json({
    status: false,
    message: "Route ID is required"
    });
    }
    // Fetch all stations matching the route_id
    // const stations = await Route.find({ route_id: route_id }).select({ id: 0, _v: 0 }); // Exclude MongoDB's id and _v fields
    // if (stations.length === 0) {
    // return res.status(404).json({
    // status: false,
    // message: "No stations found for the given route ID"
    // });
    // }
    // res.status(200).json({
    // status: true,
    // stations: stations
    // });
    const stations = await Route.find({ route_id: route_id })
    .select({ _v: 0 }) // Only exclude _v
    .lean(); // Convert to plain JavaScript objects
    // Rename _id to bustop_id in each station
    const formattedStations = stations.map(station => {
    const { _id, ...rest } = station;
    return { bustop_id: _id, ...rest };
    });
    res.status(200).json({
    status: true,
    stations: formattedStations
    });
    } catch (error) {
    console.error("Error fetching pickup/drop stations:", error);
    res.status(500).json({
    status: false,
    message: "Internal server error"
    });
    }
    };

//Update--> Added preferred bustop_id in student_list collections
exports.setStudentBusStop = async (req, res) => {
    try {
        const { student_id, bustop_id } = req.body;
        
        // Validate required fields
        if (!student_id || !bustop_id) {
            return res.status(400).json({
                success: false,
                message: "Student ID and Bustop ID are required"
            });
        }
        
        // Find the student
        const student = await Student.findOne({ student_id: student_id });
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "No student found with the provided ID"
            });
        }
        
        // Check if the bustop_id exists (without fetching full details)
        const stationExists = await mongoose.model('pickupdrop_station').exists({ _id: bustop_id });
        if (!stationExists) {
            return res.status(404).json({
                success: false,
                message: "No pickup/drop station found with the provided ID"
            });
        }
        
        // Update the student's preferred_bustop_id
        student.preferred_bustop_id = bustop_id;
        await student.save();
        
        // Return success response (without bus stop details)
        res.status(200).json({
            success: true,
            message: "Student's preferred bus stop updated successfully",
            data: {
                student_id: student.student_id,
                preferred_bustop_id: student.preferred_bustop_id
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error while setting student's bus stop"
        });
    }
};