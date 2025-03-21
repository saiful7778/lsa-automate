import { sign, type SignOptions } from "jsonwebtoken";
import { model, Schema, type Document } from "mongoose";
import getEnv from "../../utils/getEnv";

export interface IUser extends Document {
  fullname: string;
  email: string;
  googleRefreshToken: string;
  refreshToken: string;
}

interface IUserModel extends IUser {
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
}

const userSchema = new Schema<IUserModel>(
  {
    fullname: {
      type: String,
      required: true,
      match: /^[a-zA-Z\s]+$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    refreshToken: {
      type: String,
    },
    googleRefreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

userSchema.methods.generateAccessToken = function () {
  const payload = {
    _id: this._id,
    email: this.email,
  };
  return sign(payload, getEnv("access_token_secret"), {
    expiresIn: getEnv("access_token_expiry") as SignOptions["expiresIn"],
  });
};

userSchema.methods.generateRefreshToken = function () {
  const payload = {
    _id: this._id,
  };
  return sign(payload, getEnv("refresh_token_secret"), {
    expiresIn: getEnv("refresh_token_expiry") as SignOptions["expiresIn"],
  });
};

export const User = model<IUserModel>("User", userSchema);
