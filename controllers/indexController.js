const TableSchema = require('../models/schema');
const BlogSchema = require('../models/blogschema');
const fs =  require('fs');

const register = (req, res) => {
    return res.render('register');
}

const dashboard = (req, res) => {
    return res.render('dashboard');
}

const login = (req, res) => {
    return res.render('login');
}

const add = (req, res) => {
    return res.render('add');
}

const insertData = async (req, res) => {
    try {
        const { name, email, password, cpassword } = req.body;
        let Record = await TableSchema.create({
            name: name,
            email: email,
            password: password,
            cpassword: cpassword
        })
        if (password == cpassword) {
            if (Record) {
                console.log("User added successfully");
                return res.redirect('/login');
            }
            else {
                console.log("User is not added");
                return false;
            }
        }
        else {
            console.log("Password & Confirm Password must be same");
            return res.redirect('back');
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

const loginData = async (req, res) => {
    // try {
    //     const { email, password } = req.body;
    //     let userLogin = await TableSchema.findOne({ email: email });
    //     if (!userLogin || userLogin.password != password) {
    //         console.log("Incorrect Password");
    //         return res.redirect('back');
    //     }
    //     console.log("User Logged in successfully");
    //     return res.redirect('viewData');
    // }
    // catch (error) {
    //     console.log(error);
    //     return false;
    // }
    return res.redirect('viewData');
}

const blogData = async (req, res) => {
    try {
        const { title, description } = req.body;
        let image = '';
        if (req.file) {
            image = req.file.path;
        }
        // console.log(image);
        let Record = await BlogSchema.create({
            title: title,
            description: description,
            image: image
        })
        if (Record) {
            console.log("Blog added successfully");
            return res.redirect('back');
        }
        else {
            console.log("Blog is not added");
            return res.redirect('back');
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

const viewData = async (req, res) => {
    try {
        let Record = await BlogSchema.find({});
        if (Record) {
            return res.render('dashboard', {
                Record
            })
        }
        else {
            console.log("Record Not show");
            return false;
        }
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

const logout = (req,res)=>{
    req.logOut((err)=>{
        if(err){
            console.log(err);
            return false;
        }
        return res.redirect('/');
    })
}

const deleteBlog = async(req,res)=>{
    try{
        const id = req.query.id;
        let deletecategory =  await BlogSchema.findById(id).then((singlerecord)=>{
            fs.unlinkSync(singlerecord.image);
            BlogSchema.findByIdAndDelete(id).then((data)=>{
                console.log("Blog deleted Succesfully");
                return res.redirect('back');
            }).catch((err)=>{
                console.log(err);
                return false;
            })
            
        }).catch((err)=>{
            console.log(err);
            return false;
        })
        
    }catch(err){
        console.log(err);
        return false;
    }
}

const editBlog = (req,res) => {
    let id = req.query.id;
    BlogSchema.findById((id)).then((data)=>{
        return res.render('edit',{
            data
        });
    }).catch((err)=>{
        console.log(err);
        return false;
    })
}

const updateBlog = (req,res) => {
    let editid = req.body.editid;
    const{title,description,price} = req.body;
    let image = req.file ? req.file.path : "";

    if (req.file) {
        BlogSchema.findById(editid).then((oldImage)=>{
            fs.unlinkSync(oldImage.image);
            BlogSchema.findByIdAndUpdate(editid,{
                image : image,
                title : title,
                description : description,
                price : price
            }).then((data)=>{
                console.log("Record Updated Successfully");
                return res.redirect('viewData');
            }).catch((err)=>{
                console.log(err);
                return false;
            })
        }).catch((err)=>{
            console.log(err);
            return false;
        })
    }else{
        BlogSchema.findByIdAndUpdate(editid,{
            title : title,
            description : description,
            price : price
        }).then((data)=>{
            console.log("Record Updated Successfully");
            return res.redirect('viewData');
        }).catch((err)=>{
            console.log(err);
            return false;
        })
    }
}

module.exports = {
    register,
    dashboard,
    login,
    add,
    insertData,
    loginData,
    blogData,
    viewData,
    logout,
    deleteBlog,
    editBlog,
    updateBlog
}