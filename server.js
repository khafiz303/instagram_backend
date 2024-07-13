const express = require('express');
const passport = require('passport')
const cors = require('cors')
const app = express();
// const multer = require('multer');
// const upload = multer();
app.use(express.json());

app.use(express.urlencoded());
// app.use(upload.any());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors())
require('./app/auth/passport');
app.use(passport.initialize());


app.use(require('./app/post/routes'))
app.use(require('./app/auth/routes'))
app.use(require('./app/story/routes'))
app.use(require('./app/follow/routes'))
app.use(require('./app/follow/suggestions/routes'))
app.use(require('./app/comment/routes'))


const PORT = 1000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



