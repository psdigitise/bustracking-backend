

/////////////Permision_id:0///////////////////////---super-admin

/////////////Permision_id:1///////////////////////---School-details

/////////////Permision_id:2///////////////////////---Transport-details 


///////////User_type////////////////////////
///////////User_Id/////////////////////////


const mongoose = require('mongoose');
const crypto = require('crypto');
const Comment = require('../models/adminModel');
const Station = require('../models/routeModel');
const Notification = require('../models/notificationModel');
const Route = require('../models/routeModel');
const AddRoute = require('../models/newrouteModel');
const Routeasign = require('../models/routeasignModel');
const RouteDetails = require('../models/newrouteModel')
const Bus = require('../models/busModel')
const CatchAsyncError = require('../middlewares/CatchAysncError')
const APIFeatures = require('../utils/apiFeatures');
const User = mongoose.model('admin_users');
const Student = require('../models/parentModel');
const Parent = require('../models/sparentModel');
const Driver = require('../models/driverModel');
const attendanceModel = require('../models/attendanceModel');
const GeneralSettings = require('../models/generalSettingsModel');
const SuperAdmin = require('../models/SuperAdmin');









const TransportCredential = require('../models/TransportCredential');
// const route_details=require("../models/newrouteModel")
// const pickupdrop_station = require("../models/routeModel")


const multer = require('multer');
const path = require('path');

// Set up multer to store the file locally
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Path where files are stored
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

// File filter to accept only PNG or JPEG formats
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only PNG and JPEG formats are allowed'));
    }
};

// Initialize multer
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // limit file size to 5MB
    fileFilter
}).single('logo'); // Expect a field 'logo' for file upload

exports.newComment = CatchAsyncError(async (req, res, next) => {
    const { name, password, userId, comment: commentText } = req.body;

    if (!name || !password || !userId || !commentText) {
          return res.status(400).json({ success: false, message: "Missing required fields for comment" });
    }

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

exports.deleteComment = CatchAsyncError(async (req, res, next) => {

    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
        return res.status(404).json({
            success: false,
            message: "Comment not found"
        })
    }
    res.status(200).json({
        success: true,
        message: "Comment deleted successfully"
    })


})

exports.login = async (req, res, next) => {
    const { user_name, password } = req.body;

    try {

        let user = await SuperAdmin.findOne({ username: user_name }).select('+password');
        if (user) {
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (isPasswordMatch) {
                req.session.loggedIn = true;
                req.session.userType = 'superadmin';
                return res.status(200).json({
                    success: true,
                    userType: 'superadmin',
                    user: {
                        username: user.username,
                        email_address: user.email_address
                    }
                });
            }
        }
        // Check admin_users table
        user = await Comment.findOne({ user_name }).select('+password');
        if (user) {
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (isPasswordMatch) {
                req.session.loggedIn = true;
                req.session.userType = 'admin';
                return res.status(200).json({
                    success: true,
                    userType: 'admin',
                    user: {

                        user_name: user.user_name,
                        email_id: user.email_id,
                        permissions: user.permissions
                    }
                });
            }
        }

        // Check CollegeSchool table
        user = await CollegeSchool.findOne({ email_address: user_name }).select('+password');
        if (user) {
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (isPasswordMatch) {
                req.session.loggedIn = true;
                req.session.userType = 'school';
                return res.status(200).json({
                    success: true,
                    userType: 'school',
                    user: {
                        _id: user._id,
                        name_of_institution: user.name_of_institution,
                        email_address: user.email_address,
                        phone_number: user.phone_number
                    }
                });
            }
        }

        // Check TransportService table
        user = await TransportService.findOne({ username: user_name }).select('+password');
        if (user) {
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (isPasswordMatch) {
                req.session.loggedIn = true;
                req.session.userType = 'transport';
                return res.status(200).json({
                    success: true,
                    userType: 'transport',
                    user: {
                        _id: user._id,
                        name_of_transport_service: user.name_of_transport_service,
                        username: user.username,
                        email_address: user.email_address
                    }
                });
            }
        }

        user = await TransportService.findOne({ username: user_name }).select('+password');
        if (user) {
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (isPasswordMatch) {
                req.session.loggedIn = true;
                req.session.userType = 'transport';
                return res.status(200).json({
                    success: true,
                    userType: 'transport',
                    user: {
                        name_of_transport_service: user.name_of_transport_service,
                        username: user.username,
                        email_address: user.email_address
                    }
                });
            }
        }

        // If none of the tables matched, return an error
        return res.status(401).json({
            success: false,
            message: "Invalid username or password"
        });
    }
    
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server",
            error: error.message
        });
    }
};


const TransportChoice = require("../models/TransportChoice");

// POST: Save selected transport service
exports.transportChoose = async (req, res) => {
    const { serviceName, school_id } = req.body;

    if (!serviceName) {
        return res.status(400).json({ error: "Service name is required." });
    }

    if (!school_id) {
        return res.status(400).json({ error: "School ID is required." });
    }

    try {
        const newChoice = new TransportChoice({ serviceName, school_id });
        await newChoice.save();

        res.status(201).json({
            message: "Transport service selected successfully!",
            data: newChoice,
        });
    } catch (error) {
        console.error("Error saving transport choice:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getTransportService = async (req, res) => {
    const { school_id } = req.query;

    if (!school_id) {
        return res.status(400).json({ error: "School ID is required." });
    }

    try {
        const transportChoice = await TransportChoice.findOne({ school_id });

        if (!transportChoice) {
            return res.status(404).json({ error: "No transport service found for the provided School ID." });
        }

        res.status(200).json({
            message: "Transport service retrieved successfully!",
            data: {
                serviceName: transportChoice.serviceName,
            },
        });
    } catch (error) {
        console.error("Error retrieving transport choice:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getBusDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const service = await TransportChoice.findById(id); // Fetch the service using the ID
        if (!service) {
            return res.status(404).json({ error: "Service not found" });
        }
        res.status(200).json(service);
    } catch (error) {
        console.error("Error fetching service:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};





////////////////////////////////////////////////  studentdetail_and_parentdetail Permision_id:1  //////////////////////////////////////////

////////////////////////////////////////////////////////////parent functionalities  /////////////////////////////////////////////////
exports.add_parent = CatchAsyncError(async (req, res, next) => {
    const { student_id, father_name, parent_email, parent_password } = req.body;

    if (!student_id || !father_name || !parent_email || !parent_password) {
        return res.status(400).json({ success: false, message: "Missing required parent details" });
    }

    const parents = await Parent.create(req.body);
    console.log(parents, "parents")
    res.status(201).json({
        success: true,
        parents
    })

})

exports.edit_parent = CatchAsyncError(async (req, res, next) => {
    console.log(req.body.id + "edit parent", "req.body.id")
    const parents = await Parent.findByIdAndUpdate(req.body.id, req.body);
    res.status(201).json({
        success: true,
        parents
    })

})

exports.delete_parent = async (req, res, next) => {
    try {
        const parentId = req.body.id;
        const deletedParent = await Parent.findByIdAndDelete(parentId);
        if (!deletedParent) {
            return res.status(404).json({ success: false, message: 'Parent detail not found' });
        }
        res.status(200).json({ success: true, deletedParent });
    } catch (error) {
        // Handle any unexpected errors
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


// ////////////////////////////////////////////////////////////student functionalities ///////////////////////////////////////


exports.add_student = CatchAsyncError(async (req, res, next) => {
    const { student_id, student_name, parent_email, parent_password } = req.body;

    if (!student_id || !student_name || !parent_email || !parent_password) {
        return res.status(400).json({ success: false, message: "Missing required student details" });
    }

    // Ensure `localid` is received from the request body
    const studentData = {
        ...req.body,
        localid: req.body.localid || '123',  // Use provided localid or default to '123' if missing
    };

    const students = await Student.create(studentData);

    res.status(201).json({
        success: true,
        students,
    });
});


exports.getstudentdetails = async (req, res, next) => {
    // Get the logged-in user's localid from the request (assumes it’s sent with the request body or headers)
    const userLocalId = req.headers['x-localid'] || req.body.localid;

    if (!userLocalId) {
        return res.status(400).json({
            success: false,
            message: "Local ID is required"
        });
    }

    // Find students that have the same localid as the logged-in user
    const students = await Student.find({ localid: userLocalId });

    res.status(200).json({
        success: true,
        studentdetails: students,
        studentdetails: students,
        studentscount: students.length,
        active_students_count: students.filter(student => student.status === 'Active').length
    });
};

//     });
// };


exports.edit_student = CatchAsyncError(async (req, res, next) => {
    const students = await Student.findByIdAndUpdate(req.body.id, req.body, { new: true });
    res.status(201).json({
        success: true,
        students
    });
});


exports.delete_student = async (req, res, next) => {
    try {
        const studentId = req.body.id;
        if (!studentId) {
            return res.status(400).json({ success: false, message: 'ID is missing in the request body' });
        }
        const deletedStation = await Student.findByIdAndDelete(studentId);
        if (!deletedStation) {
            return res.status(404).json({ success: false, message: 'Student detail not found' });
        }
        res.status(200).json({ success: true, deletedStation });
    } catch (error) {
        // Handle any unexpected errors
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

/////////////////////////////////////////////////////////////////end//////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////Driver Details  Permision_id:2/////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////driver functionalities//////////////////////////////////////////////////////


exports.add_driver = CatchAsyncError(async (req, res, next) => {
    const { driver_name, driver_email, driver_password } = req.body;

    if (!driver_name || !driver_email || !driver_password) {
        return res.status(400).json({ success: false, message: "Missing required driver details" });
    }

    // Clone the request body
    const driverData = { ...req.body };

    // Automatically set driver_id to match _id
    const driver = await Driver.create(driverData);
    driver.driver_id = driver._id; // Assign the _id value to driver_id
    await driver.save(); // Save the updated document

    res.status(201).json({
        success: true,
        driver,
    });
});


exports.edit_driver = CatchAsyncError(async (req, res, next) => {
    const drivers = await Driver.findByIdAndUpdate(req.body.driver_id, req.body);
    console.log(req.query)
    console.log(req.body)
    res.status(201).json({
        success: true,
        drivers
    })
})


exports.getdrivers = async (req, res, next) => {
    const userLocalId = req.headers['x-localid'];

    if (!userLocalId) {
        return res.status(400).json({
            success: false,
            message: "Local ID is required"
        });
    }

    try {
        // Fetch drivers based on localid
        const drivers = await Driver.find({ localid: userLocalId });

        res.status(200).json({
            success: true,
            drivers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch driver details",
        });
    }
};



exports.delete_driver = async (req, res, next) => {
    try {
        const driverId = req.body.id;
        if (!driverId) {
            return res.status(400).json({ success: false, message: 'ID is missing in the request body' });
        }
        const deletedStation = await Driver.findByIdAndDelete(driverId);
        if (!deletedStation) {
            return res.status(404).json({ success: false, message: 'Driver detail not found' });
        }
        res.status(200).json({ success: true, deletedStation });
    } catch (error) {
        // Handle any unexpected errors
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

///////////////////////////////////////////////////////////////////////end////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////station functionalities///////////////////////////////////////////////////
exports.add_stations = CatchAsyncError(async (req, res, next) => {
    const { route_id, bus_stopname, lattitude, longitude } = req.body;

    if (!route_id || !bus_stopname || !lattitude || !longitude) {
        return res.status(400).json({
            success: false,
            message: "Please provide route_id, bus_stopname, lattitude, and longitude"
        });
    }

    const routes = await Station.create(req.body);
    res.status(201).json({
        success: true,
        routes
    })

})

exports.getstations = async (req, res, next) => {

    let buildQuery = () => {
        return new APIFeatures(Station.find(), req.query).filter()
    }
    const stations = await buildQuery().query;
    res.status(200).json({
        success: true,
        stations
    })
}

exports.edit_stations = CatchAsyncError(async (req, res, next) => {
    const routes = await Station.findByIdAndUpdate(req.body.id, req.body);
    res.status(201).json({
        success: "true",
        routes
    })
})

exports.delete_stations = async (req, res, next) => {
    try {
        const stationId = req.body.id;
        if (!stationId) {
            return res.status(400).json({ success: false, message: 'ID is missing in the request body' });
        }
        const deletedStation = await Station.findByIdAndDelete(stationId);
        if (!deletedStation) {
            return res.status(404).json({ success: false, message: 'Station detail not found' });
        }
        res.status(200).json({ success: true, deletedStation });
    } catch (error) {
        // Handle any unexpected errors
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


///////////////////////////////////////////////////////////End////////////////////////////////////////////////////////////////

///////////////////////////////////////////////bus functionalities Permision_id:0///////////////////////////////////////////////////


exports.getbus = async (req, res, next) => {

    let buildQuery = () => {
        return new APIFeatures(Bus.find(), req.query).filter()
    }
    const buses = await buildQuery().query;
    res.status(200).json({
        success: true,
        buses
    })
}

exports.add_bus = CatchAsyncError(async (req, res, next) => {
    const { localid, bus_id, bus_name, status } = req.body;

    if (!localid || !bus_id || !bus_name || !status) {
        return res.status(400).json({ success: false, message: "Missing required bus details" });
    }

    const bus = await Bus.create({ localid, bus_id, bus_name, status });

    res.status(201).json({
        success: true,
        bus
    });
});

exports.edit_bus = CatchAsyncError(async (req, res, next) => {
    const { id, localid, bus_id, bus_name, status } = req.body;

    const bus = await Bus.findByIdAndUpdate(id, { localid, bus_id, bus_name, status }, { new: true });

    res.status(201).json({
        success: true,
        bus
    });
});


exports.delete_bus = async (req, res, next) => {
    try {
        const busId = req.body.id;
        if (!busId) {
            return res.status(400).json({ success: false, message: 'ID is missing in the request body' });
        }
        const deletedStation = await Bus.findByIdAndDelete(busId);
        if (!deletedStation) {
            return res.status(404).json({ success: false, message: 'Bus detail not found' });
        }
        res.status(200).json({ success: true, deletedStation });
    } catch (error) {
        // Handle any unexpected errors
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


//////////////////////////////////////////////////Route Details Permision_id:1 and 2/////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////route functionalities/////////////////////////////////////////////////////

exports.add_route = CatchAsyncError(async (req, res, next) => {
    const { route_name } = req.body;
    
    // Auto-generate route_id
    const route_id = 'R-' + crypto.randomBytes(4).toString('hex').toUpperCase();

    if (!req.body.localid) {
         return res.status(400).json({ success: false, message: "Missing required route details" });
    }

    const routes = await AddRoute.create({ ...req.body, route_id, localid: req.body.localid });
    res.status(201).json({
        success: true,
        routes
    });
});


exports.getroutedetails = async (req, res, next) => {

    let buildQuery = () => {
        return new APIFeatures(RouteDetails.find(), req.query).filter()
    }
    const routedetails = await buildQuery().query;
    res.status(200).json({
        success: true,
        routedetails
    })
}

exports.edit_route = CatchAsyncError(async (req, res, next) => {
    const routes = await AddRoute.findByIdAndUpdate(req.body.id, req.body);
    res.status(201).json({
        success: true,
        routes
    })
})
exports.deleteroutedetails = async (req, res, next) => {
    try {
        const routeDetailId = req.body.id;
        console.log(req, "routeDetailId")
        if (!routeDetailId) {
            return res.status(400).json({ success: false, message: 'ID is missing in the request body' });
        }
        const deletedRouteDetail = await RouteDetails.findByIdAndDelete(routeDetailId);
        if (!deletedRouteDetail) {
            return res.status(404).json({ success: false, message: 'Route detail not found' });
        }
        res.status(200).json({ success: true, deletedRouteDetail });
    } catch (error) {
        // Handle any unexpected errors
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// exports.asign_route = async (req, res, next) => {
//     const insert_asign = await Routeasign.create(req.body);

//     res.status(201).json({
//         success: true,
//         message: insert_asign
//     })

// }

exports.asign_route = async (req, res, next) => {
    try {
        // Check for required fields before creating the record
        if (!req.body.route_id || !req.body.driver_id || !req.body.asign_type) {
            return res.status(400).json({
                success: false,
                message: "Validation Error",
                errors: {
                    route_id: req.body.route_id ? undefined : "Route ID is required",
                    driver_id: req.body.driver_id ? undefined : "Driver ID is required",
                    asign_type: req.body.asign_type ? undefined : "Please enter pickup/drop"
                }
            });
        }

        const insert_asign = await Routeasign.create(req.body);

        res.status(201).json({
            success: true,
            message: "Route assigned successfully!",
            data: insert_asign
        });

    } catch (error) {
        // Catch Mongoose validation errors
        if (error.name === "ValidationError") {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            return res.status(400).json({ success: false, message: "Validation Error", errors });
        }

        // Catch other errors
        res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
    }
};

///////////////////////////////////////////////////////////////////End//////////////////////////////////////////////////////////////////

/////////////////////////student attendance////////////////////

exports.update_student_attendance = CatchAsyncError(async (req, res, next) => {
    const { route_id, bus_station, bus_details, student_id, student_name, student_attendance, attendance_time, driver_details, status } = req.body;

    if (!route_id || !student_id || !status) {
         return res.status(400).json({ success: false, message: "Missing required attendance details" });
    }

    const attendance = await attendanceModel.create(req.body);
    console.log(attendance, "parents")
    res.status(201).json({
        success: true,
        attendancel: attendance
    })

})

////////////////////////notification functionalities//////////////////////////////////
exports.add_notification = CatchAsyncError(async (req, res, next) => {
    const { title, message } = req.body;

    if (!title && !message) {
         // If generic notification body is missing
          return res.status(400).json({ success: false, message: "Missing notification details" });
    }

    const notifications = await Notification.create(req.body);
    console.log(notifications, "notifications")
    res.status(201).json({
        success: "true"
    })

})

////////////////////////////////////////////////////////////// Add general settings with file upload////////////////////////////////////////
exports.addGeneralSettings = CatchAsyncError(async (req, res, next) => {
    // Helper to process logic after parsing (or skipping) file
    const processRequest = async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ success: false, message: err.message });
        } else if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }

        const { site_name, mobile_no, email_id, support_no, google_api_key } = req.body;
        const logo = req.file ? `/uploads/${req.file.filename}` : null;

        if (!site_name || !mobile_no || !email_id || !support_no || !google_api_key || !logo) {
             return res.status(400).json({ success: false, message: "Missing required fields or logo" });
        }

        const generalSettings = await GeneralSettings.create({
            site_name,
            logo,
            mobile_no,
            email_id,
            support_no,
            google_api_key
        });

        res.status(201).json({
            success: true,
            generalSettings
        });
    };

    if (req.is('multipart/form-data')) {
        upload(req, res, processRequest);
    } else {
        await processRequest();
    }
});

// Update general settings with file upload
exports.editGeneralSettings = CatchAsyncError(async (req, res, next) => {
    // Helper to process logic
    const processRequest = async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ success: false, message: err.message });
        } else if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }

        const { site_name, mobile_no, email_id, support_no, google_api_key } = req.body;
        const updatedFields = {
            site_name,
            mobile_no,
            email_id,
            support_no,
            google_api_key
        };

        if (req.file) {
            updatedFields.logo = `/uploads/${req.file.filename}`;
        }

        const generalSettings = await GeneralSettings.findByIdAndUpdate(req.params.id, updatedFields, {
            new: true,
            runValidators: true
        });

        if (!generalSettings) {
            return res.status(404).json({
                success: false,
                message: 'Settings not found'
            });
        }

        res.status(200).json({
            success: true,
            generalSettings
        });
    };

    if (req.is('multipart/form-data')) {
        upload(req, res, processRequest);
    } else {
        await processRequest();
    }
});


exports.deleteGeneralSettings = CatchAsyncError(async (req, res, next) => {
    const generalSettings = await GeneralSettings.findByIdAndDelete(req.params.id);

    if (!generalSettings) {
        return res.status(404).json({
            success: false,
            message: 'Settings not found'
        });
    }

    res.status(200).json({
        success: true,
        message: 'Settings deleted successfully'
    });
});


// Get all general settings
exports.getGeneralSettings = CatchAsyncError(async (req, res, next) => {
    const generalSettings = await GeneralSettings.find();
    res.status(200).json({
        success: true,
        generalSettings
    });
});

///////////////////////////////////////////////////////////////////End/////////////////////////////////////////////////////////////////

// ////////////////////////////////////////////////////Add new College/School/////////////////////////////////////////////////////////////
// controllers/collegeSchoolController.js

// const CollegeSchool = require('../models/testCollegeSchool');
// const bcrypt = require('bcryptjs');
// exports.addCollegeSchool = CatchAsyncError(async (req, res, next) => {
//     const {
//         name_of_institution,
//         address,
//         city,
//         state,
//         zip_code,
//         phone_number,
//         email_address,
//         website,
//         username,
//         password
//     } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newCollegeSchool = await CollegeSchool.create({
//         name_of_institution,
//         address,
//         city,
//         state,
//         zip_code,
//         phone_number,
//         email_address,
//         website,
//         username,
//         password: hashedPassword
//     });

//     res.status(201).json({
//         success: true,
//         newCollegeSchool
//     });
// });

// // Update College/School
// exports.editCollegeSchool = CatchAsyncError(async (req, res, next) => {
//     const {
//         name_of_institution,
//         address,
//         city,
//         state,
//         zip_code,
//         phone_number,
//         email_address,
//         website,
//         username,
//         password
//     } = req.body;

//     const updatedFields = {
//         name_of_institution,
//         address,
//         city,
//         state,
//         zip_code,
//         phone_number,
//         email_address,
//         website,
//         username
//     };

//     if (password) {
//         updatedFields.password = await bcrypt.hash(password, 10);
//     }

//     const updatedCollegeSchool = await CollegeSchool.findByIdAndUpdate(req.params.id, updatedFields, {
//         new: true,
//         runValidators: true,
//     });

//     if (!updatedCollegeSchool) {
//         return res.status(404).json({
//             success: false,
//             message: 'College/School not found',
//         });
//     }

//     res.status(200).json({
//         success: true,
//         updatedCollegeSchool,
//     });
// });



// // Delete College/School
// exports.deleteCollegeSchool = CatchAsyncError(async (req, res, next) => {
//     const collegeSchool = await CollegeSchool.findByIdAndDelete(req.params.id);

//     if (!collegeSchool) {
//         return res.status(404).json({
//             success: false,
//             message: 'College/School not found',
//         });
//     }

//     res.status(200).json({
//         success: true,
//         message: 'College/School deleted successfully',
//     });
// });

// exports.getCollegeSchools = async (req, res, next) => {
//     try {
//         const collegeSchools = await CollegeSchool.find();
//         res.status(200).json({
//             success: true,
//             collegeSchools
//         });
//     } catch (err) {
//         res.status(500).json({
//             success: false,
//             message: 'Server error'
//         });
//     }
// };



// exports.loginCollegeSchool = async (req, res, next) => {
//     const { username, password } = req.body;

//     try {
//         // Find the user by username
//         const collegeSchool = await CollegeSchool.findOne({ username });

//         if (!collegeSchool) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Invalid username or password',
//             });
//         }

//         // Compare the provided password with the stored hashed password
//         const isPasswordCorrect = await bcrypt.compare(password, collegeSchool.password);

//         if (!isPasswordCorrect) {
//             return res.status(401).json({
//                 success: false,
//                 message: 'Invalid username or password',
//             });
//         }

//         // Set session if login is successful (assuming session handling is implemented)
//         req.session.loggedIn = true;
//         req.session.user = {
//             id: collegeSchool._id,
//             username: collegeSchool.username,
//             email: collegeSchool.email_address
//         };

//         res.status(200).json({
//             success: true,
//             message: 'Login successful',
//             user: {
//                 id: collegeSchool._id,
//                 username: collegeSchool.username,
//                 email: collegeSchool.email_address
//             },
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Server error',
//         });
//     }
// };




const CollegeSchool = require('../models/testCollegeSchool');
const bcrypt = require('bcryptjs');
exports.addCollegeSchool = CatchAsyncError(async (req, res, next) => {
    const {
        name_of_institution,
        address,
        city,
        state,
        zip_code,
        phone_number,
        email_address,
        website,
        username,
        password
    } = req.body;

    if (!password) {
        return res.status(400).json({ success: false, message: "Password is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCollegeSchool = await CollegeSchool.create({
        name_of_institution,
        address,
        city,
        state,
        zip_code,
        phone_number,
        email_address,
        website,
        password: hashedPassword
    });

    res.status(201).json({
        success: true,
        newCollegeSchool
    });
});

// Update College/School
exports.editCollegeSchool = CatchAsyncError(async (req, res, next) => {
    const {
        name_of_institution,
        address,
        city,
        state,
        zip_code,
        phone_number,
        email_address,
        website,
        username,
        password
    } = req.body;

    const updatedFields = {
        name_of_institution,
        address,
        city,
        state,
        zip_code,
        phone_number,
        email_address,
        website
    };

    if (password) {
        updatedFields.password = await bcrypt.hash(password, 10);
    }

    const updatedCollegeSchool = await CollegeSchool.findByIdAndUpdate(req.params.id, updatedFields, {
        new: true,
        runValidators: true,
    });

    if (!updatedCollegeSchool) {
        return res.status(404).json({
            success: false,
            message: 'College/School not found',
        });
    }

    res.status(200).json({
        success: true,
        updatedCollegeSchool,
    });
});



// Delete College/School
exports.deleteCollegeSchool = CatchAsyncError(async (req, res, next) => {
    const collegeSchool = await CollegeSchool.findByIdAndDelete(req.params.id);

    if (!collegeSchool) {
        return res.status(404).json({
            success: false,
            message: 'College/School not found',
        });
    }

    res.status(200).json({
        success: true,
        message: 'College/School deleted successfully',
    });
});

exports.getCollegeSchools = async (req, res, next) => {
    try {
        const collegeSchools = await CollegeSchool.find();
        res.status(200).json({
            success: true,
            collegeSchools
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};



exports.loginCollegeSchool = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const collegeSchool = await CollegeSchool.findOne({ username });

        if (!collegeSchool) {
            return res.status(404).json({
                success: false,
                message: 'Invalid username or password',
            });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordCorrect = await bcrypt.compare(password, collegeSchool.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password',
            });
        }

        // Set session if login is successful (assuming session handling is implemented)
        req.session.loggedIn = true;
        req.session.user = {
            id: collegeSchool._id,
            username: collegeSchool.username,
            email: collegeSchool.email_address
        };

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                id: collegeSchool._id,
                username: collegeSchool.username,
                email: collegeSchool.email_address
            },
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};
/////////////////////////////////////////////////////////////End//////////////////////////////////////////////////////////////////





/////////////////////////////////////////////////////////////Add new transport service///////////////////////////////////////////////



const TransportService = require('../models/TransportService');

exports.addTransportService = async (req, res) => {
    try {
        const {
            name_of_transport_service, address, city, state, zip_code,
            phone_number, email_address, website, username, password
        } = req.body;

        if (!password) {
            return res.status(400).json({ success: false, message: "Password is required" });
        }

        // Encrypt password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newTransportService = new TransportService({
            name_of_transport_service,
            address,
            city,
            state,
            zip_code,
            phone_number,
            email_address,
            website,
            username,
            password: hashedPassword
        });

        await newTransportService.save();

        res.status(201).json({
            success: true,
            newTransportService
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get all transport services
exports.getTransportServices = async (req, res) => {
    try {
        const transportServices = await TransportService.find();
        res.status(200).json({
            success: true,
            transportServices
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};


exports.editTransportService = async (req, res) => {
    try {
        const {
            name_of_transport_service, address, city, state, zip_code,
            phone_number, email_address, website, username, password
        } = req.body;

        const updatedFields = {
            name_of_transport_service,
            address,
            city,
            state,
            zip_code,
            phone_number,
            email_address,
            website,
            username
        };

        if (password) {
            updatedFields.password = await bcrypt.hash(password, 10);
        }

        const updatedTransportService = await TransportService.findByIdAndUpdate(req.params.id, updatedFields, {
            new: true,
            runValidators: true
        });

        if (!updatedTransportService) {
            return res.status(404).json({
                success: false,
                message: 'Transport service not found'
            });
        }

        res.status(200).json({
            success: true,
            updatedTransportService
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

exports.deleteTransportService = async (req, res) => {
    try {
        const transportService = await TransportService.findByIdAndDelete(req.params.id);

        if (!transportService) {
            return res.status(404).json({
                success: false,
                message: 'Transport service not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Transport service deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
////////////////////////////////////////////////////////////////////End///////////////////////////////////////////////////////////////////




exports.registerSuperAdmin = async (req, res, next) => {
    const { username, email_address, password } = req.body;

    if (!username || !email_address || !password) {
        return res.status(400).json({ success: false, message: "Username, email, and password are required" });
    }

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new SuperAdmin
        const newSuperAdmin = new SuperAdmin({
            username,
            email_address,
            password: hashedPassword
        });

        // Save the superadmin to the database
        await newSuperAdmin.save();

        return res.status(201).json({
            success: true,
            message: 'Superadmin created successfully!',
            superadmin: {
                username: newSuperAdmin.username,
                email_address: newSuperAdmin.email_address
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};



// const TransportCredential = require('../models/TransportCredential');
// const bcrypt = require('bcrypt');

// Add Transport Credential
// exports.addTransportCredential = async (req, res) => {
//     try {
//         const { transport_service, email, password } = req.body;

//         // Hash password before storing
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newTransportCredential = new TransportCredential({
//             transport_service,
//             email,
//             password: hashedPassword
//         });

//         await newTransportCredential.save();

//         res.status(201).json({
//             success: true,
//             message: 'Transport credential added successfully',
//             newTransportCredential
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Server error',
//             error: error.message
//         });
//     }
// };
exports.addTransportCredential = async (req, res) => {
    try {
        const { transport_service, email, password, school_id } = req.body;

        if (!password) {
            return res.status(400).json({ success: false, message: "Password is required" });
        }

        // Hash password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        const newTransportCredential = new TransportCredential({
            transport_service,
            email,
            password: hashedPassword,
            school_id
        });

        await newTransportCredential.save();

        res.status(201).json({
            success: true,
            message: 'Transport credential added successfully',
            newTransportCredential
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get All Transport Credentials
exports.getTransportCredentials = async (req, res) => {
    try {
        const credentials = await TransportCredential.find().select('-password'); // Exclude password in response
        res.status(200).json({
            success: true,
            credentials
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Edit Transport Credential


// exports.editTransportCredential = async (req, res) => {
//     try {
//         const { transport_service, email, password } = req.body;

//         const updatedFields = {
//             transport_service,
//             email
//         };

//         if (password) {
//             updatedFields.password = await bcrypt.hash(password, 10);
//         }

//         const updatedCredential = await TransportCredential.findByIdAndUpdate(req.params.id, updatedFields, {
//             new: true,
//             runValidators: true
//         });

//         if (!updatedCredential) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Transport credential not found'
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: 'Transport credential updated successfully',
//             updatedCredential
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Server error',
//             error: error.message
//         });
//     }
// };


exports.editTransportCredential = async (req, res) => {
    try {
        const { transport_service, email, password, school_id } = req.body;

        const updatedFields = {
            transport_service,
            email,
            school_id
        };

        if (password) {
            updatedFields.password = await bcrypt.hash(password, 10);
        }

        const updatedCredential = await TransportCredential.findByIdAndUpdate(req.params.id, updatedFields, {
            new: true,
            runValidators: true
        });

        if (!updatedCredential) {
            return res.status(404).json({
                success: false,
                message: 'Transport credential not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Transport credential updated successfully',
            updatedCredential
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


// Delete Transport Credential
exports.deleteTransportCredential = async (req, res) => {
    try {
        const credential = await TransportCredential.findByIdAndDelete(req.params.id);

        if (!credential) {
            return res.status(404).json({
                success: false,
                message: 'Transport credential not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Transport credential deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};



// const WaitingLocation = require('../models/waitingLocation');
// // const CatchAsyncError = require('../middlewares/catchAsyncError');

// // Get all waiting locations
// exports.getWaitingLocations = CatchAsyncError(async (req, res, next) => {
//     const waitingLocations = await WaitingLocation.find();
//     res.status(200).json({
//         success: true,
//         waitingLocations
//     });
// });

// // Add a new waiting location
// exports.addWaitingLocation = CatchAsyncError(async (req, res, next) => {
//     const newLocation = await WaitingLocation.create(req.body);
//     res.status(201).json({
//         success: true,
//         message: "Waiting location added successfully",
//         newLocation
//     });
// });

// // Update a waiting location
// exports.updateWaitingLocation = CatchAsyncError(async (req, res, next) => {
//     const updatedLocation = await WaitingLocation.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedLocation) {
//         return res.status(404).json({ success: false, message: "Location not found" });
//     }
//     res.status(200).json({
//         success: true,
//         message: "Waiting location updated successfully",
//         updatedLocation
//     });
// });

// // Delete a waiting location
// exports.deleteWaitingLocation = CatchAsyncError(async (req, res, next) => {
//     const deletedLocation = await WaitingLocation.findByIdAndDelete(req.params.id);
//     if (!deletedLocation) {
//         return res.status(404).json({ success: false, message: "Location not found" });
//     }
//     res.status(200).json({
//         success: true,
//         message: "Waiting location deleted successfully"
//     });
// });




const WaitingLocation = require('../models/waitingLocation');

// Get all waiting locations
exports.getWaitingLocations = async (req, res) => {
    try {
        const waitingLocations = await WaitingLocation.find();
        res.status(200).json({
            success: true,
            waitingLocations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

// Add a new waiting location
exports.addWaitingLocation = async (req, res) => {
    try {
        const { driver_id, route_id, latitudeDelta, longitudeDelta, start_time, end_time, date } = req.body;

        if (!driver_id || !route_id || !latitudeDelta || !longitudeDelta || !start_time || !end_time || !date) {
            return res.status(400).json({ success: false, message: "Missing required fields for waiting location" });
        }

        const newLocation = await WaitingLocation.create(req.body);
        res.status(201).json({
            success: true,
            message: "Waiting location added successfully",
            newLocation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding waiting location",
            error: error.message
        });
    }
};

// Update a waiting location
exports.updateWaitingLocation = async (req, res) => {
    try {
        const updatedLocation = await WaitingLocation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedLocation) {
            return res.status(404).json({ success: false, message: "Location not found" });
        }
        res.status(200).json({
            success: true,
            message: "Waiting location updated successfully",
            updatedLocation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating waiting location",
            error: error.message
        });
    }
};

// Delete a waiting location
exports.deleteWaitingLocation = async (req, res) => {
    try {
        const deletedLocation = await WaitingLocation.findByIdAndDelete(req.params.id);
        if (!deletedLocation) {
            return res.status(404).json({ success: false, message: "Location not found" });
        }
        res.status(200).json({
            success: true,
            message: "Waiting location deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting waiting location",
            error: error.message
        });
    }
};







const LogNotification = require('../models/LogNotification');

// @desc   Create a new notification
// @route  POST /api/admin/notifications
exports.createNotification = async (req, res) => {
    try {
        const { title, message, group } = req.body;

        if (!title || !message || !group) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const notification = new LogNotification({ title, message, group });
        await notification.save();

        return res.status(201).json({ message: "Notification sent successfully", notification });
    } catch (error) {
        console.error("Error creating notification:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// @desc   Get all notifications
// @route  GET /api/admin/notifications
exports.getNotifications = async (req, res) => {
    try {
        const notifications = await LogNotification.find().sort({ createdAt: -1 });
        return res.status(200).json(notifications);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};














////////////////////////////////////////////sudharsanan///////////////////////////////////////




 
 
exports.fetch_school = async (req, res, next) => {
    try {
        const { transport_service } = req.body;
 
        if (!transport_service) {
            return res.status(400).json({ error: "transport service is required in the request body" });
        }
 
        const credentials = await TransportCredential.aggregate([
            {
                $match: {
                    transport_service: transport_service
                }
            },
            {
                $addFields: {
                    schoolIdObj: { $toObjectId: "$school_id" }
                }
            },
            {
                $lookup: {
                    from: "collegeschools", // collection name, lowercase and pluralized
                    localField: "schoolIdObj",
                    foreignField: "_id",
                    as: "school"
                }
            },
            {
                $unwind: "$school"
            },
            {
                $project: {
                    password: 0,
                    __v: 0,
                    "school.password": 0,
                    "school.__v": 0
                }
            }
        ]);
 
        res.status(200).json({
            success: true,
            count:credentials.length,
             credentials
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};
 
 
 
 
// exports.fetch_busroute = async (req, res, next) => {
//     try {
//       const { localid } = req.body;
 
//       if (!localid) {
//         return res.status(400).json({ error: "localid is required in the request body" });
//       }
 
//       const matchingRoutes = await route_details.find({ localid });
 
//       res.status(200).json({
//         count: matchingRoutes.length,
//         data: matchingRoutes
//       });
//     } catch (error) {
//       console.error("Error fetching fetch_busroute:", error);
//       res.status(500).json({ error: "Something went wrong" });
//     }
//   };
 
 
 
 
// exports.fetch_pickupdrop_station = async (req, res, next) => {
//   try {
//     // Check both body and query
//     const route_id = req.body.route_id || req.query.route_id;
//    // const school_id = req.body.school_id || req.query.school_id;
 
//     if (!route_id ) {
//       return res.status(400).json({ error: "route_id and school_id are required" });
//     }
 
//     const matchingRoutes = await pickupdrop_station.find({ route_id});
 
//     res.status(200).json({
//       countbbb: matchingRoutes.length,
//       data: matchingRoutes
//     });
//   } catch (error) {
//     console.error("Error in fetch_pickupdrop_station:", error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };
 
 
 
 
 
// exports.fetch_pickupdrop_station = async (req, res, next) => {
//     try {
//       // Check both body and query
//       const route_id = req.body.route_id || req.query.route_id;
//      // const school_id = req.body.school_id || req.query.school_id;
 
//       if (!route_id ) {
//         return res.status(400).json({ error: "route_id and school_id are required" });
//       }
 
//       const matchingRoutes = await pickupdrop_station.find({ route_id});
 
//       res.status(200).json({
//         count: matchingRoutes.length,
//         data: matchingRoutes
//       });
//     } catch (error) {
//       console.error("Error in fetch_pickupdrop_station:", error);
//       res.status(500).json({ error: "Something went wrong" });
//     }
//   };
 