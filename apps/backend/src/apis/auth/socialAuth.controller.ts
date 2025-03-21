import passport from "passport";
import apiController from "../../helpers/apiController.helper";
import ApiError from "../../helpers/apiError.helper";
import getEnv from "../../utils/getEnv";
import { User } from "./user.model";

export const googleAuthController = apiController(async (req, res, next) => {
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/adwords",
    ],
    accessType: "offline",
    prompt: "consent",
    session: false,
  })(req, res, next);
});

export const socialCallbackController = apiController(async (req, res) => {
  const user = await User.findById(req.user?.id);

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });

  return res
    .status(301)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .redirect(`${getEnv("frontend_uri")}?userId=${user._id}`);
});
