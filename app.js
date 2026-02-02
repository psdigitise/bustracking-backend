const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const comments = require('./routes/comment')
const admin = require('./routes/admin')
const mobile_api = require('./routes/mobile_api')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const path = require('path');
const notification = require('./utils/notification');

const session = require('express-session');



//app.use(bodyParser.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/notification/', notification)
app.use('/api/v1/', comments)
app.use('/mobile_api/v1/', mobile_api)
app.use('/admin/', admin)

app.use(errorMiddleware)
module.exports = app;







// Serve the uploaded images
