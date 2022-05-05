import mongoose, { Document } from "mongoose";
// export interface IFavoriteSchool {
//    schoolId: string;
//    position: number;
// }
export interface IFavorite extends Document {
   _id: mongoose.Types.ObjectId;
   favorites: string[];
}

const FavoriteSchema = new mongoose.Schema({
   _id: {
      type: mongoose.Types.ObjectId,
      require: true,
   },
   favorites: {
      type: [String],
      required: true,
      default: [],
   },
});

export const Favorite =
   mongoose.models?.favorite ||
   mongoose.model<IUser>("favorite", FavoriteSchema);

