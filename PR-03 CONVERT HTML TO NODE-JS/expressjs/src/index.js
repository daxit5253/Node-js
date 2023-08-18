const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');

const mainpath = path.join(__dirname, '../views');

app.use(express.static(mainpath));
app.use(express.static(mainpath+"./Images"));

app.get('/about', (req, res) => {
    res.render('Aboutus', {
    });
});

app.get('/blog', (req, res) => {
    res.render('Blog', {
        
    });
});

app.get('/contact', (req, res) => {
    res.render('ContactUs', {
        
    });
});

app.get('/home', (req, res) => {
    res.render('HomePage', {
        
    });
});

app.get('/service', (req, res) => {
    res.render('Services', {
        
    });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});