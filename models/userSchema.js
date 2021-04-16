const { Schema, model } = require("mongoose");

// var validateEmail = function (email) {
//   var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   return re.test(email);
// };

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  // email: {
  //   type: String,
  //   trim: true,
  //   lowercase: true,
  //   unique: true,
  //   required: "Email address is required",
  //   validate: [validateEmail, "Please fill a valid email address"],
  //   match: [
  //     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  //     "Please fill a valid email address",
  //   ],
  // },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
});

const User = new model("User", userSchema);

module.exports = User;
