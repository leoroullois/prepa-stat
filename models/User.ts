import mongoose, { Document } from "mongoose";
export enum Filieres {
   MP,
   PT,
   PSI,
   PC,
}
export enum UserTypeId {
   Admin,
   Customer,
}
export interface IUser extends Document {
   _id: mongoose.Types.ObjectId;
   user_type_id: UserTypeId;
   email: string;
   password: string;
   name: string;
   filiere: Filieres;
   created_on?: string;
   last_login?: string;
   login_count?: number;
   provider?: string;
   githubId?: string;
   googleId?: string;
}

const UserSchema = new mongoose.Schema({
   _id: {
      type: mongoose.Types.ObjectId,
      require: true,
   },
   user_type_id: {
      type: Number,
      enum: [UserTypeId.Admin, UserTypeId.Customer],
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
   filiere: {
      type: String,
      required: true,
      enum: ["MP", "PT", "PSI", "PC"],
      default: "MP",
   },
   email: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: false,
   },
   githubId: {
      type: String,
      required: false,
   },
   googleId: {
      type: String,
      required: false,
   },
   created_on: {
      type: Date,
      required: false,
   },
   last_login: {
      type: Date,
      required: false,
   },
   login_count: {
      type: Number,
      required: false,
   },
   provider: {
      type: String,
      required: false,
   },
});

export const User =
   mongoose.models?.users || mongoose.model<IUser>("users", UserSchema);

