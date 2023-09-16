const express = require("express");
const bcrypt = require("bcryptjs");
const app = express();

const connectDb = require("./db");
app.use(express.json());
const User = require("./models/User");
/**
name = input()
email = input()
password= input ()
if name && email && password invalid:
return 400 error
user = find user with email
if user found:
return 400 error
hash = hash password
user = save user name ,email ,hash to user model
return 201
 */

app.post("/register", async (req, res) => {
  /**
   *request Input sources
   -req body
   -req params
   -req Query
   -req Header
   -req Cookies
   */
  // user information
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "please full fill the data" });
  }
  try {
    // find email like new email axist in before database
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already axist" });
    }
    //new user create
    user = new User({ name, email, password });
    //password hashing
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user.password = hash;
    user.save();
    return res.status(201).json({ message: "user created Successfully", user });
  } catch (e) {
    next(e);
  }
});

/**
 * **start**
email = input()
password= input ()
user = find  user with email
if user not found:
return 400 error
if password not equal to user.hash
return 400 error
token  = generate token using user
return token
End
 */
app.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // email validation
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User Credential" });
    }
    // password validation
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "User Credential" });
    }
    return res.status(200).json({ message: "Login Successful" });
  } catch (e) {
    next(e);
  }
});

// global error handle
app.use((err, req, res, nex) => {
  console.log(err);
  res.status(500).json({ message: "Server Error Occure" });
});
// app.get("/", (req, res) => {
//   const obj = {
//     name: "akash",
//     email: "akash@exmple.com",
//   };
//   res.json(obj);
// });

// mongoose connection
connectDb("mongodb://127.0.0.1:27017/AttendaceSystem")
  .then(() => {
    console.log("database connected");
    app.listen(4000, () => {
      console.log("i am listening to 4000 port");
    });
  })
  .catch((err) => console.log(err));
