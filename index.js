const express = require('express');
let port = 7000;
const app = express();
const path = require('path');
const fs =  require('fs');
const Database = require('./config/mongoose');
const TableSchema = require('./models/schema');
const BlogSchema = require("./models/blogschema");
app.use(express.static(path.join(__dirname, '/public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.set('view engine', 'ejs');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const session = require('express-session');

app.use(session({
    name : 'milansir',
    secret : 'rnw4',
    saveUninitialized : true,
    resave : true,
    cookie : {
        maxAge : 1000*60*60
    }
}))

app.use(express.urlencoded());
app.use(passport.initialize());
app.use(passport.session()); 
app.use(passport.setAuthentication);

app.use('/',require('./routes/indexRoutes'));
app.listen(port, (error) => {
    if (error) {
        console.log("Server is not ready");
    }
    else {
        console.log("Server is running on port : " + port);
    }
})