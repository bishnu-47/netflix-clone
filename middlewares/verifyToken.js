import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  // if no Authorization found
  if (!authHeader)
    return res
      .status(401)
      .json({ success: false, data: "You are not authorized!" });

  // verify authtoken
  const authToken = authHeader.split(" ")[1];
  jwt.verify(authToken, process.env.JWT_SECRET, (err, decodedData) => {
    if (err)
      return res
        .status(403)
        .json({ success: false, data: "Invalid Authorization" });

    // add the data to request
    req.user = decodedData;
    next();
  });
}
