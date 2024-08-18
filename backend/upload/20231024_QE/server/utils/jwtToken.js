const sendToken = (user, godowns, statusCode, res) => {
  const token = user?.getJWTToken();
  //options for cookie
  const options = {
    expires: new Date(Date.now() + 100 * 60 * 1000),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    godowns,
    token,
  });
};
module.exports = sendToken;
