const mongoose = require("mongoose");

const bcrpyt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  role: {
    type: String,
    enum: ["Student", "Teacher", "Admin"],
    default: "Student",
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  }],
});

UserSchema.pre("save", function (next) {
  const user = this;
  bcrpyt.hash(user.password, 10, (err, hash) => {
    user.password = hash;
    next();
  });
});
const User = mongoose.model("User", UserSchema);

module.exports = User;
