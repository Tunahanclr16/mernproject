const {mongoose} = require("../connection");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
   date: {
     type: Date,
     default: new Date(),
   },
   avatar: {
      type: String,
      required: true,
  },
});
const User = mongoose.model("user", userSchema);
module.exports = {User};
  
