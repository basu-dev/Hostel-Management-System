const { json } = require("body-parser");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: "Email is missing.",
  },
  passowrd: {
    type: String,
    minlength: [5, "Minimum 5 characters are needed"],
  },
});
mongoose.model("User", userSchema);

module.exports = {
  register: (req, res) => {
    let User = mongoose.model("User");
    let user = new User();
    user = { email, password, confirmPassword } = req.body;
    if (password == confirmPassword) {
    //   user.save();
      return res.json(User);
    }
    return res.status(500).send({ msg: "Two Passwords do not match" });
    // user.save();
  },
};
