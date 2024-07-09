const express = require('express');
const passport = require('passport')
const cors = require('cors')
const app = express();
// const multer = require('multer');
// const upload = multer();
app.use(express.json());

app.use(express.urlencoded());
// app.use(upload.any());
app.use(express.static(__dirname + '/public'))
app.use(cors())
require('./app/auth/passport');
app.use(passport.initialize());


app.use(require('./app/post/routes'))
app.use(require('./app/auth/routes'))
app.use(require('./app/story/routes'))
app.use(require('./app/follow/routes'))
app.use(require('./app/follow/suggestions/routes'))


const PORT = 1000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



