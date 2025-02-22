import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    //Gathering token from cookie
    const { token } = req.cookies;

    //Checking if token exists
    if (!token) {
      return res.json({ success: false, message: "User not logged in" });
    }

    //if token exists, verifying it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //Checking if token is valid
    if (!decoded) {
      return res.json({ success: false, message: "User not logged in" });
    } else {
      req.body.userId = decoded.id;
    }

    //Passing to next middleware
    await next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default isAuth;
