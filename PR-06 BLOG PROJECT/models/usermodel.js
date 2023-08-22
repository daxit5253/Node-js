const mongoose = require('mongoose');

const mainData = async()=>{
    const url = "mongodb://127.0.0.1:27017/Daxit"
    await mongoose.connect(url);
}

mainData();

const studentSchema = new mongoose.Schema({
  id: Number,
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
});

const studentModel = mongoose.model('adminstudents',studentSchema);

module.exports = studentModel