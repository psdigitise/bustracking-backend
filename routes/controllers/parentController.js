const mongoose = require('mongoose');
const Parent = require('../models/parentModel');
const Driver = require('../models/driverModel');
const Route = require('../models/routeModel');
const Routeasign = require('../models/routeasignModel');
const AddRoute = require('../models/newrouteModel');
const CatchAsyncError = require('../middlewares/CatchAysncError')
const APIFeatures = require('../utils/apiFeatures');
//const Driver =mongoose.model('driver_list');

exports.parent_login = async (req, res, next) => {


    const login_status = await Parent.find({ parent_email: req.body.user_name, parent_password: req.body.password, fcmToken: req.body.fcmToken, serverKey: req.body.serverKey }).select({ _id: 0 });

    const routeid = 2; //login_status.route_id ;

    const asigned_data = await Routeasign.findOne().select({ _id: 0 }).sort({ _id: -1 });

    const driverid = 1; //asigned_data.driver_id;
    const driverdetails = await Driver.find().select({ _id: 0 }); //check with

    const source_details = await AddRoute.find({ route_id: routeid }).select({ _id: 0 });

    const destination_details = await Route.find({ bus_stopname: "Paalpannai" }).select({ _id: 0 });
    //const destination_details =await Route.findOne().sort({ _id: -1 });

    if (login_status != '') {
        const user = await Parent.findOne({ name });
        user.fcmToken = fcmToken;
        user.serverKey = serverKey;
        await user.save();
        req.session.loggedIn = true;
        res.status(200).json({
            status: true,
            login_status,
            driverdetails,
            source_details,
            destination_details
        })
    }
    else {
        res.status(200).json({
            status: false,
            message: "enter correct username and password "
        })

    }

}




exports.fetch_driver = async (req, res, next) => {

    if (req.body.parent_id != null && req.body.route_id != null) {

        const routeid = req.body.route_id;
        const fetch_details = await AddRoute.find({ route_id: "1" }).select({ _id: 0 }); //check with current date and time also

        if (fetch_details != '') {

            //fetch_details

            const asigned_data = await Routeasign.findOne({ route_id: routeid }).select({ _id: 0 }).sort({ _id: -1 });
            //let driverid=asigned_data.driver_id;
            const driverdetails = await Driver.find().select({ _id: 0 }); //check with

            const route_details = await AddRoute.find({ route_id: routeid }).select({ _id: 0 });

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