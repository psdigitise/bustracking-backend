const Comment = require('../models/commentModel');
const CatchAsyncError = require('../middlewares/CatchAysncError')
const APIFeatures = require('../utils/apiFeatures');


exports.newComment = CatchAsyncError(async (req, res, next) => {

    const comment = await Comment.create(req.body);
    res.status(201).json({
        success: true,
        comment
    })

})

exports.getComments = async (req, res, next) => {

    let buildQuery = () => {
        return new APIFeatures(Comment.find({ name: req.body.name, password: req.body.password })).filter() //
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

    let buildQuery = () => {
        return new APIFeatures(Comment.find({
            name: req.body.user_name, password: req.body.password,
            // fcmToken: req.body.fcmToken, serverKey: req.body.serverKey 
        })).filter() //
    }
    const login_status = await buildQuery().query;

    //console.log(req);
    // return next(new ErrorHandler('Unable to send products!', 400))

    // await new Promise(resolve => setTimeout(resolve, 3000))

    if (login_status != '') {
        // const user = await Comment.findOne({ name });
        // user.fcmToken = fcmToken;
        // user.serverKey = serverKey;
        // await user.save();
        res.status(200).json({
            status: true,
            login_status
        })
    }
    else {
        res.status(200).json({
            status: false,
            message: "enter correct username password"
        })

    }

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