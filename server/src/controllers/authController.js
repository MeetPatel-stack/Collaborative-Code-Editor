import jwt from "jsonwebtoken";

export const googleSuccess = async (req, res) => {
  if (!req.user) {
    return res.redirect(`${process.env.CLIENT_URL}/login`);
  }

  const token = jwt.sign(
    {
      userId: req.user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  res.redirect(process.env.CLIENT_URL);
};