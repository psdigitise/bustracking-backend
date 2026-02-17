const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect('mongodb://72.61.229.172:27017/bustracking', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(con => {
        console.log(`MongoDB is connected to the host : ${con.connection.host}`)
    }).catch((err) => {
        console.log(err, 'err')
    })
}

module.exports = connectDatabase;