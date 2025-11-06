import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers?.authorization||req.cookies?.Authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }
    console.log(authHeader)

    const token = authHeader.startsWith("Bearer")
      ? authHeader.split(" ")[1]
      : authHeader;

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }
    const cleanedToken =
      typeof token === "string"
        ? token.trim().replace(/^"(.*)"$/, "$1")
        : token;
    console.log("Auth token received:", cleanedToken);

    try {
      console.log(jwt.decode(cleanedToken));
      const decoded = jwt.verify(cleanedToken, process.env.JWT_SECRET_KEY);
      const userId = decoded?._id || decoded?.user || decoded;
      req.user = { _id: userId };
      next();
    } catch (err) {
      console.error("JWT verification error:", err);
      return res
        .status(401)
        .json({ message: "Invalid or expired token", error: err.message });
    }
  } catch (error) {
    return res.status(500).json({ message: "Authentication error" });
  }
};

export { auth };
