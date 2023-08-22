const express = require('express');

const body = require("body-parser");
const bodyParser=body.urlencoded({ extended: false });

const router = express.Router();
const { getDashboard, getForm,getPostData,getRegisterData,getLoginData } = require('../controllers/userController');

router.get('/admin/data',getDashboard);
router.get('/admin/form',getForm);
router.post("/admin/savedata",bodyParser,getPostData);

router.post("/register", bodyParser, getRegisterData);
router.post("/checkLogin", bodyParser, getLoginData);


router.get('/admin',getDashboard);

module.exports =router