const router = require("express").Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    // const { username, email, password } = req.body;
    // const newUser = new User({
    //   username,
    //   email,
    //   password,
    // });

    const salt = await bcrypt.genSalt(10);

    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    console.log(newUser);

    await newUser.save();
    res.status(200).send({ msg: "Register success ", newUser });
  } catch (err) {
    res.status(500).json({ msg: "Register failed , ", err });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json("Wrong credentials!");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credentials!");

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
