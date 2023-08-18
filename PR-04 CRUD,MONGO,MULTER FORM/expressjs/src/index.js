const express = require("express");
const app = express();
const fs = require('fs');
const mongo = require("mongodb");
const multer = require("multer");
let imagefile = '';

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
      return callback(null,'./uploads/')
    },
    filename: function(req, file, callback) {
      imagefile = Date.now()+file.originalname
      return callback(null,imagefile);
    }
  });
  const upload = multer({storage: storage});

app.use(express.static('uploads'));
app.set("view engine", "ejs");

const body = require("body-parser");
const bodyparse = body.urlencoded({ extended: false });

const url = "mongodb://127.0.0.1:27017";
const mongoclient = mongo.MongoClient;
const client = new mongoclient(url);

async function myData() {
  try {
    await client.connect();
    console.log("Connected to DataBase");
    const db = client.db("Form");
    const collection = db.collection("formdata");
    const result = await collection.find({}).toArray();

    let edituser = "";
    // console.log(result);
    // let result = ;

    // insert
    app.get("/crud", (req, res) => {
      res.render("index", {
        data: result,
        edituser: edituser,
      });
      // res.redirect("/crud");
    });

    app.post("/savedata", upload.single('image'), async (req, res) => {
      console.log("Saved DataBase");
      let id = req.body.id;
      console.log(imagefile);

  
      if (id != "") {
        //  edituser = "";
        edituser = result.find((i) => {
          return i.id == id;
        });


        old = (edituser.image != '') ? edituser.image: '';
        if(req.file && imagefile != ''){
          let image ="uploads/"+edituser.image;
          fs.unlink(image,() => {
              console.log("image deleted");
          });
      }
        result.forEach( (i) => {
          if (i.id == id) {
                    i.name = req.body.name;
                    i.email = req.body.email;
                    i.age = req.body.age;
                    i.image = (req.file && imagefile != '') ? imagefile :old;
                }
              });
              
            let info =await collection.updateOne(
              { id: id },
              { 
                $set:{
                  name: req.body.name,
                  email: req.body.email,
                  age: req.body.age,
                  image: (imagefile != '') ? imagefile :old

                } 
            });
            // console.log(info)   
      } else {
        let data = {
          id: (result.length + 1).toString(),
          name: req.body.name,
          email: req.body.email,
          age: req.body.age,
          // image: (imagefile != undefined) ? imagefile :old
          image:imagefile
          
        };
        console.log(data);
        result.push(data);

        let info = await collection.insertOne(data);
        console.log(info);
      }
      res.redirect("/crud");

      edituser = '';
      res.render('index', {
          data:result,
          edituser:edituser
      });
    });

    app.get("/delete/:id", async (req, res) => {
      let id = req.params.id;

      let edituser = result.find((i)=>{
        return i.id == id;
    })

      let images = result.find((i) => {
        return i.id == id;
      });

      if(typeof images == 'undefined'){
        console.log('no images found')
      }else{
        let image = 'uploads/' + images.image;
        fs.unlink(image, () => {
          console.log("deleted");
        }); 
      }
      let name = id.toString();
      console.log(id.toString());

      let del = await collection.deleteOne({ id: id }, (err, res) => {
        if (err) throw err;
        console.log("Deleted..");
      });
      edituser='';
      r1 = await collection.find({}).toArray();
      res.render("index", {
        data: r1,
        edituser: edituser,
      });
        console.log(del);
    }); 

   //console.log//////////////////////////////// 

    app.get('/edit/:id',async (req, res) => {
        let id = req.params.id
        edituser = result.find((i)=>{
            return i.id == id
        })
        // console.log(edituser);
        res.render('index', {
            data:result,
            edituser:edituser
        });
    });
  } catch (err) {
    console.log(err);
  }
}
myData();

app.listen(8000, "127.0.0.1", () => {
  console.log("Server running on port 8000");
});
