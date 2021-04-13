const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  title:  String, // String is shorthand for {type: String}
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});


const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;