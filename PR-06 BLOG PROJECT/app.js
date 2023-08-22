const express = require('express');
const app = express();

const routes = require('./routes/user');
const cookie = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

app.use(cookie());

app.set('view engine', 'ejs');
app.use(express.static(__dirname));
app.use(flash());

app.use(session({
  secret:'flashblog',
  saveUninitialized: true,
  resave:true
}));

app.use(routes)

app.get('/', (req,res)=>{
    res.render('login', {message:''});
});

app.get("/register", (req, res) => {
  res.render("register", {message:''});
});

app.get("/logout", (req, res) => {
  res.clearCookie('user');
  res.redirect("/");
});

app.listen(8000, (req, res)=>{
    console.log('listening on Port 8000..............');
});