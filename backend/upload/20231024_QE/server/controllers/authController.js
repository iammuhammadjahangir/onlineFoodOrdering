const User = require("../models/userModel");
const godownModel = require("../models/godownModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const sendToken = require("../utils/jwtToken");
//===========================================//
//======CONTROLLER TO AUTH Login ===========//
//=========================================//
exports.login = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(200).json("Please Enter username & Password");
    }
    console.log("called");

    // const foundUser = await User.findOne({ username }).select("+password").populate("shopNo");
    const foundUser = await User.findOne({ username })
      .select("+password")
      .populate("shopNo")
      .populate("printerId").populate('tableRows')
      .populate("roles")
      .exec();
    const status = foundUser.active.toLocaleString();

    console.log(foundUser?.shopNo);
    const godowns = await godownModel.find({ shopId: foundUser?.shopNo._id });
    let filteredGodowns = [];
    godowns.map((god) => {
      console.log(god.storageCode);
      filteredGodowns.push(god.storageCode);
    });

    if (!foundUser.active) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (foundUser.active === "false") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // const isPasswordMatched =await foundUser?.comparePassword(password);
    const isPasswordMatched = await bcrypt.compare(
      password,
      foundUser.password
    );
    // if (!isPasswordMatched) return res.status(401).json({ message: "Unauthorized" });

    console.log(godowns);
    if (!isPasswordMatched) {
      res.status(401).json("Invalid Email & password");
    } else {
      sendToken(foundUser, filteredGodowns, 201, res);
    }
  } catch (e) {
    res.send(e);
  }
});

//===========================================//
//======CONTROLLER TO AUTH Refresh =========//
//=========================================//
exports.refresh = (req, res) => {
  const cookies = req.cookies;
  console.log(req.body);
  console.log(req.cookies);

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await User.findOne({
        username: decoded.username,
      })
        .populate("shopNo")
        .populate("godownNo")
        .populate("roles")
        .exec();

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            roles: foundUser.roles,
            shopNo: foundUser.shopNo.storageCode,
            godownNo: foundUser.godownNo,
            posId: foundUser.posId,
            address: foundUser.shopNo.storageAddress,
            phoneNo: foundUser.shopNo.storagePhoneNo,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      res.json({ accessToken });
    })
  );
};

//===========================================//
//======CONTROLLER TO AUTH Logout ==========//
//=========================================//
// exports.logout = (req, res) => {
//   const cookies = req.cookies;
//   if (!cookies?.jwt) return res.sendStatus(204); //No content
//   res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
//   res.json({ message: "Cookie cleared" });
// };
exports.logout = asyncHandler(async (req, res, next) => {
  console.log("called");
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
