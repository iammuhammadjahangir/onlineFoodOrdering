//Create token for saving in cookie
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  //Cookies option
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE * 20 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    status: true,
    user: user,
    token,
  });
};

module.exports = sendToken;
