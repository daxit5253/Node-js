const userModel = require("../models/usermodel");
const registerModel = require("../models/registermodel");

const checkUser = async (req,res) => {
  if (req.cookies && req.cookies.user != 'admin') {
    return res.redirect('/')
  }
};


const getDashboard = async (req, res) => {
  await checkUser(req, res);
  res.render("index",{username:req.cookies.user});
};

const getForm = async (req, res) => {
  await checkUser(req, res);
  res.render("form", { username: req.cookies.user });
};

const getPostData = async (req, res) => {
  const response = new userModel({
    id: 1,
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  const data = await response.save();
  console.log("Data saved" + data);
  res.send("Response saved");
};

const getRegisterData = async (req, res) => {
  const checkUser = await registerModel.findOne({ email:req.body.uemail });
  console.log("Check User " + checkUser);
  if (checkUser) {
     req.flash('success',"Email is already registered...");
    res.render("register",{message:req.flash('success')});

  } else {
    const response = new registerModel({
      id: 1,
      name: req.body.uname,
      email: req.body.uemail,
      password: req.body.upass,
    });
    const data = await response.save();
    console.log("Data saved" + data);
    // res.send("Your Registration is SuccessFull...........");
    res.redirect("/");

  }
};

const getLoginData = async (req, res) => {
  const checkUser = await registerModel.findOne({
    email: req.body.uemail,
    password: req.body.upass,
  });
  console.log("Check User " + checkUser);

  if (checkUser) {
    res.cookie("user", checkUser.name)
    res.redirect("/admin/data");
  } else {  
    req.flash("danger","Email or Password Wrong...");
    res.render("login",{message:req.flash('danger')});
  }
};

module.exports = {
  getDashboard,
  getForm,
  getPostData,
  getRegisterData,
  getLoginData,
  checkUser,
};
