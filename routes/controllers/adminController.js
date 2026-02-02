const mongoose = require('mongoose');
const Comment = require('../models/adminModel');
const Station = require('../models/routeModel');
const Notification = require('../models/notificationModel');
const Driver = require('../models/driverModel');
const AddRoute = require('../models/newrouteModel');
const Routeasign = require('../models/routeasignModel');
const RouteDetails = require('../models/newrouteModel')
const Bus = require('../models/busModel')
const CatchAsyncError = require('../middlewares/CatchAysncError')
const APIFeatures = require('../utils/apiFeatures');
const User = mongoose.model('admin_users');
const Student = require('../models/parentModel');
//const jwt = require('jsonwebtoken');
//const session = require('express-session');

exports.newComment = CatchAsyncError(async (req, res, next) => {

    const comment = await Comment.create(req.body);
    res.status(201).json({
        success: true,
        comment
    })

})

exports.getComments = async (req, res, next) => {

    let buildQuery = () => {
        return new APIFeatures(User.find({ user_name: req.body.user_name, password: req.body.password })).filter() //
    }
    const comments = await buildQuery().query;

    //console.log(req);
    // return next(new ErrorHandler('Unable to send products!', 400))

    // await new Promise(resolve => setTimeout(resolve, 3000))

    if (comments != '') {
        res.status(200).json({
            success: true,
            comments
        })
    }
    else {
        res.status(200).json({
            success: false,
            message: "enter correct username password"
        })

    }

}

exports.login = async (req, res, next) => {

    //let buildQuery = () => {

    //return new APIFeatures(Comment.find({ user_name: req.body.user_name,password:req.body.password} )).filter() //




    //}
    const login_status = await Comment.find({
        user_name: req.body.user_name, password: req.body.password,
        // fcmToken: req.body.fcmToken, serverKey: req.body.serverKey 
    }).select({ user_name: 1, email_id: 1, permissions: 1, _id: 0 });

    //const login_status = await buildQuery().query;

    //console.log(req);
    // return next(new ErrorHandler('Unable to send products!', 400))

    // await new Promise(resolve => setTimeout(resolve, 3000))

    if (login_status != '') {
        // const user = await Comment.findOne({ user_name });
        // user.fcmToken = fcmToken;
        // user.serverKey = serverKey;
        // await user.save();
        req.session.loggedIn = true;
        res.status(200).json({
            status: true,
            login_status,

        })
    }
    else {
        res.status(200).json({
            status: false,
            message: "enter correct username password"
        })

    }

}


exports.add_stations = CatchAsyncError(async (req, res, next) => {

    const routes = await Station.create(req.body);
    res.status(201).json({
        success: "true",
        routes
    })

})

exports.add_notification = CatchAsyncError(async (req, res, next) => {

    const notifications = await Notification.create(req.body);
    res.status(201).json({
        success: "true"
    })

})

exports.add_bus = CatchAsyncError(async (req, res, next) => {

    const bus = await Bus.create(req.body);
    res.status(201).json({
        success: "true",
        bus
    })

})

exports.add_route = CatchAsyncError(async (req, res, next) => {

    const routes = await AddRoute.create(req.body);
    res.status(201).json({
        success: true,
        routes
    })

})


exports.getroutedetails = async (req, res, next) => {

    let buildQuery = () => {
        return new APIFeatures(RouteDetails.find(), req.query).filter()
    }
    const routedetails = await buildQuery().query;

    // return next(new ErrorHandler('Unable to send products!', 400))

    // await new Promise(resolve => setTimeout(resolve, 3000))
    res.status(200).json({
        success: true,
        routedetails
    })
}

exports.getstudentdetails = async (req, res, next) => {

    let buildQuery = () => {
        return new APIFeatures(Student.find(), req.query).filter()
    }
    const studentdetails = await buildQuery().query;

    // return next(new ErrorHandler('Unable to send products!', 400))

    // await new Promise(resolve => setTimeout(resolve, 3000))
    res.status(200).json({
        success: true,
        studentdetails
    })
}

exports.getdrivers = async (req, res, next) => {

    let buildQuery = () => {
        return new APIFeatures(Driver.find(), req.query).filter()
    }
    const drivers = await buildQuery().query;

    // return next(new ErrorHandler('Unable to send products!', 400))

    // await new Promise(resolve => setTimeout(resolve, 3000))
    res.status(200).json({
        success: true,
        drivers
    })
}

exports.getstations = async (req, res, next) => {

    let buildQuery = () => {
        return new APIFeatures(Station.find(), req.query).filter()
    }
    const stations = await buildQuery().query;

    // return next(new ErrorHandler('Unable to send products!', 400))

    // await new Promise(resolve => setTimeout(resolve, 3000))
    res.status(200).json({
        success: true,
        stations
    })
}

exports.getbus = async (req, res, next) => {

    let buildQuery = () => {
        return new APIFeatures(Bus.find(), req.query).filter()
    }
    const buses = await buildQuery().query;

    // return next(new ErrorHandler('Unable to send products!', 400))

    // await new Promise(resolve => setTimeout(resolve, 3000))
    res.status(200).json({
        success: true,
        buses
    })
}

/*
exports.login = async (req, res, next) => {

    let buildQuery = () => {
        return User.find({ user_name: req.body.user_name,password:req.body.password}).select('user_name password') //

       //const sdata= await Model.find({}).select('user_name password');
    }
    const login_status = await buildQuery().query;

    //console.log(req);
    // return next(new ErrorHandler('Unable to send products!', 400))

    // await new Promise(resolve => setTimeout(resolve, 3000))
    
    if(login_status !='')
    {    
    res.status(200).json({
        status: true,
        login_status
    })
    }
    else
    {
        res.status(200).json({
            status: false,
            message:"enter correct username password"
        })

    }

}
*/
exports.asign_route = async (req, res, next) => {


    //const check_asign =await Routeasign.find({ route_id: req.body.route_id,driver_id:req.body.driver_id,asign_type:req.body.asign_type}); //createdAt:req.body.createdAt


    //if(check_asign.length==0)
    //{    

    const insert_asign = await Routeasign.create(req.body);

    res.status(201).json({
        success: true,
        message: insert_asign
    })

    // }
    // else
    // {
    //         res.status(201).json({
    //         success: false,
    //         message:check_asign.length
    //     })    
    // }

}


exports.edit_stations = async (req, res, next) => {

    //const comment = await Comment.findByIdAndUpdate(req.params.route_id);

    const updateCondition = {

        bus_station_id: req.body.bus_station_id // The condition for selecting documents to update

    };

    const updateData = {
        $set: {
            bus_station_id: req.body.bus_station_id,
            bus_stopname: req.body.bus_stopname,
            lattitude: req.body.lattitude,
            longitude: req.body.longitude,
            status: req.body.status,
            description: req.body.description,
        }
    };

    // Update all documents that match the condition
    const updatedDocs = await Route.updateOne(updateCondition, updateData);

    if (!updatedDocs) {
        res.status(404).json({
            success: false,
            message: "Comment not found"
        })
    }
    res.status(200).json({
        success: true,
        message: req.body.bus_station_id
    })

}


exports.deleteComment = async (req, res, next) => {

    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
        res.status(404).json({
            success: false,
            message: "Comment not found"
        })
    }
    res.status(200).json({
        success: true,
        message: "Comment deleted successfully"
    })


}