const express = require('express');
const passport = require('passport');
const routes = express.Router();
const indexController = require('../controllers/indexController');

const multer = require('multer');
const file = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const imageuploads = multer({ storage: file }).single('image');

routes.get('/',indexController.register);
routes.get('/dashboard',passport.checkAuthentication,indexController.dashboard);
routes.get('/login',indexController.login);
routes.get('/logout',indexController.logout);
routes.get('/add',passport.checkAuthentication,indexController.add);
routes.get('/deleteBlog',passport.checkAuthentication,indexController.deleteBlog);
routes.post('/insertData',passport.checkAuthentication,indexController.insertData);
routes.post('/loginData',passport.authenticate('local', { failureRedirect: '/' }),indexController.loginData);
routes.post('/blogData',passport.checkAuthentication,imageuploads,indexController.blogData);
routes.get('/viewData',passport.checkAuthentication,indexController.viewData);
routes.get('/editBlog',passport.checkAuthentication,indexController.editBlog);
routes.post('/updateBlog',passport.checkAuthentication,imageuploads,indexController.updateBlog);

module.exports = routes;