const auth = (req, res, next) => {
  const { email, password } = req.body;
  const adminEmail = process.env.EMAIL;
  const adminPassword = process.env.PASSWORD;
  if (email === adminEmail && password === adminPassword) {
    next();
  } else {
    return res.send({
      success: false,
      status: 401,
      message: "You should be an admin to perform this action",
      data: {},
    });
  }
};

module.exports = auth;
