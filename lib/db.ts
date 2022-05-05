import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

type Handler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

export const connectDB =
   (handler: Handler) => async (req: NextApiRequest, res: NextApiResponse) => {
      if (mongoose.connections[0].readyState) {
         // Use current db connection
         return handler(req, res);
      }
      // Use new db connection
      await mongoose.connect(process.env.MONGO_URI as string);
      console.log("Connected to MongoDB.");
      return handler(req, res);
   };

