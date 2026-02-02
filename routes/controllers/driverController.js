const mongoose = require('mongoose');
const Driver = require('../models/driverModel');
const Route = require('../models/routeModel');
const CatchAsyncError = require('../middlewares/CatchAysncError')
const APIFeatures = require('../utils/apiFeatures');
const Routeasign = require('../models/routeasignModel');
//const Driver =mongoose.model('driver_list');

exports.login = async (req, res, next) => {

    //let buildQuery = () => {

    //return new APIFeatures(Comment.find({ user_name: req.body.user_name,password:req.body.password} )).filter() //




    //}
    //const login_status =await Driver.find({ driver_email: req.body.user_name,driver_password:req.body.password });

    //const login_status =await Driver.find({ driver_email: req.body.user_name,driver_password:req.body.password }).select({ id: 0 });

    const login_status = await Driver.find({ driver_email: req.body.user_name, driver_password: req.body.password, fcmToken: req.body.fcmToken, serverKey: req.body.serverKey }).select({ _id: 0 });


    //const login_status = await buildQuery().query;

    //console.log(req);
    // return next(new ErrorHandler('Unable to send products!', 400))

    // await new Promise(resolve => setTimeout(resolve, 3000))

    if (login_status != '') {
        const user = await Driver.findOne({ driver_email });
        user.fcmToken = fcmToken;
        user.serverKey = serverKey;
        await user.save();
        req.session.loggedIn = true;
        res.status(200).json({
            status: true,
            login_status,

        })
    }
    else {
        res.status(200).json({
            status: false,
            message: "enter correct username password of driver"
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

exports.fetch_route = async (req, res, next) => {

    if (req.body.driver_id != null) {


        // if(req.body.pctype ==='pickup')
        // {
        //     const stations =await Route.find().select({ _id: 0 }).sort({order_no: 1});

        // }
        // else
        // {
        //     const stations =await Route.find().select({ _id: 0 }).sort({order_no: -1});

        // }

        //const stations =await Route.find().select({ _id: 0 }).sort({order_no: -1});

        const asigned_data = await Routeasign.findOne().select({ _id: 0 }).sort({ _id: -1 });
        const rid = asigned_data.route_id
        const stations = await Route.find({ route_id: rid }).select({ _id: 0 }).sort({ order_no: 0, });


        let studentData = [{
            student_name: 'vinoth',
            roll_no: '12160',
            parent_no: '9087408476'
        }, {
            student_name: 'vinothk1216',
            roll_no: '1216012160',
            parent_no: '8608933316'
        }];


        let scount = stations.length;
        let i = 0;
        /* for (let i = 0; i < stations.length; i++) {
             stations[i] = {
                 ...stations[i],
                 ...studentData
             };
         }
         */
        let jsonArray = [];
        //let jsonArray1=[ studentData ];
        for (const bus_station of stations) {
            //data
            /*
            data.push({
                "student_name": 'vinoth',
                "roll_no":'12160',
                "parent_no":'9087408476'
             });
             */

            //  const jsonArray1 = Object.keys(stations).map(key => ({
            //     key,
            //     value: data[key]
            // }));

            let jsonObjectToAppend = {
                bus_station,
                studentData
            };

            // Append the jsonObjectToAppend to the jsonArray
            jsonArray.push(jsonObjectToAppend);

            //console.log(jsonArray);


            // stations.dataObject = {
            //     key1: 'value1',
            //     key2: 'value2'
            //     // Add more key-value pairs as needed
            // };

            //await stations.save();

            //res.write((data) + '\n');

        }

        //res.json(data);

        res.status(200).json({
            status: true,
            message: jsonArray
        });

        // res.write('Hello, ');
        // res.end();

        //res.status(JSON.stringify(stations) + '\n');

        //for (const stations of allData) {
        //  res.write(JSON.stringify(dataItem) + '\n');
        //}
    }
    else {
        res.status(200).json({
            status: false,
            message: "Please enter the driver id"
        });


    }

}