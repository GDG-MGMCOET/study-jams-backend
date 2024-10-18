const auth = (req, res, next) => {
  const { email, password } = req.body;
  const adminEmail = process.env.EMAIL
  const adminPassword = process.env.PASSWORD
  if (email === adminEmail && password === adminPassword) {
    next();
  } else {
    return res.status(401).json({
      message: "Wrong Credentials",
    });
  }
};

module.exports = auth