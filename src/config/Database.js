const mongoose = require('mongoose');

const connectdb = async ()=>
{
  await mongoose.connect("mongodb+srv://prashantthakre712:5YGaCM3mt9v0hl1I@namastenode.t5uqi.mongodb.net/DevTinder");
}

module.exports = connectdb;

