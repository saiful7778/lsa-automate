import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../apis/auth/user.model";
import ApiError from "../helpers/apiError.helper";
import getEnv from "../utils/getEnv";

try {
  passport.use(
    new GoogleStrategy(
      {
        clientID: getEnv("google_clientId"),
        clientSecret: getEnv("google_client_secret"),
        callbackURL: getEnv("google_callback_url"),
      },
      async (_accessToken, refreshToken, profile, next) => {
        const profileData = profile._json;

        const user = await User.findOne({ email: profileData.email });

        if (user) {
          const userData = user.toObject();
          const userResponse = {
            id: userData._id as string,
            fullname: userData.fullname,
            email: userData.email,
          };
          next(null, userResponse);
        } else {
          const createdUser = await User.create({
            fullname: profileData.name,
            email: profileData.email,
            googleRefreshToken: refreshToken,
          });
          if (createdUser) {
            const userData = createdUser.toObject();
            const userResponse = {
              id: userData._id as string,
              fullname: userData.fullname,
              email: userData.email,
            };
            next(null, userResponse);
          } else {
            next(
              new ApiError(500, "Error while registering the user"),
              undefined,
            );
          }
        }
      },
    ),
  );
} catch (error) {
  console.error("PASSPORT ERROR: ", error);
}
