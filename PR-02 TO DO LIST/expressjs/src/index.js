const express = require('express');
const app = express();
const body = require('body-parser');

app.set('view engine', 'ejs');
const bodyparse = body.urlencoded({extended: false});

let edituser = '';
let cruddata = [
    {
        id:1,
        name: "Task 1",
        disc: "This is my first task",
    }
];
app.get('/crud', (req, res) => {
    res.render('index', {
        data:cruddata,
        
        edituser:edituser
    });
    res.redirect('/crud')
});

app.post('/savedata',bodyparse, (req, res) => {
    id = req.body.id;

    if(id != ''){
            cruddata.forEach((i) => {
                if(i.id == id){
                    i.name = req.body.name;
                    i.disc = req.body.disc;
                }
            });
    }else{
        data = {
            id:cruddata.length+1,
            name:req.body.name,
            disc:req.body.disc,
        }
        cruddata.push(data)
    }
    res.redirect('/crud')
});

app.get('/edit/:id', (req, res) => {
    let id = req.params.id
    edituser = cruddata.find((i)=>{
        return i.id == id
    })

    res.render('index', {
        data:cruddata,
        edituser:edituser
    });
    res.redirect('/crud')

});

app.get('/delete/(:id)', (req, res) =>{
    let id = req.params.id;
    id = id-1
    cruddata.splice(id,1)
    let j=1;
    cruddata.forEach((i)=>{
        i.id = j;
        j++;
    })
    res.redirect('/crud')
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
});