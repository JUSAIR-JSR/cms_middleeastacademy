import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ message: "No credential provided" });
    }

    const ADMIN_EMAILS = process.env.ADMIN_EMAILS
      ? process.env.ADMIN_EMAILS.split(",")
      : [];

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;

    // Admin allowlist check
    if (!ADMIN_EMAILS.includes(email)) {
      return res.status(403).json({ message: "Not authorized as admin" });
    }

    const token = jwt.sign(
      {
        email,
        name: payload.name,
        picture: payload.picture,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

      res.cookie("admin_token", token, {
        httpOnly: true,
        secure: true,        // REQUIRED on HTTPS (Vercel + Render)
        sameSite: "none",    // REQUIRED for cross-domain
        maxAge: 24 * 60 * 60 * 1000,
      });

    res.json({
      message: "Login successful",
      admin: {
        email,
        name: payload.name,
        picture: payload.picture,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid Google token" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("admin_token", {
  httpOnly: true,
  secure: true,
  sameSite: "none",
});
  res.json({ message: "Logged out" });
};
