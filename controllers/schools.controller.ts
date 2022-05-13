import { NextApiRequest, NextApiResponse } from "next";
import { removeNullValuesFromObject } from "@utils/utils";
import { ISchool, School } from "@models/School";
import isEmpty from "is-empty";
import Controller from "./types";

export const getSchools: Controller = async (req, res) => {
   const { filiere, concours, annee } = req.query;
   const filter = removeNullValuesFromObject({ filiere, concours, annee });
   try {
      const schools: ISchool[] = await School.find(filter);
      if (isEmpty(schools)) {
         return res.status(404).json({ message: "Schools not found." });
      }
      return res.status(200).json(schools);
   } catch (err) {
      return res.status(500).json(err);
   }
};
export const getSchoolById: Controller = async (req, res) => {
   const { id } = req.query as { id: string };
   try {
      const school = await School.findById(id);
      return res.status(200).json(school);
   } catch (err) {
      return res.status(500).json(err);
   }
};
export const postSchools = async (
   req: NextApiRequest,
   res: NextApiResponse
) => {
   try {
      const school = await School.findOneAndUpdate(req.body, {
         upsert: true,
         new: true,
      });
      if (!school) {
         return res.status(404).json({ message: "School not found." });
      }
      return res.status(200).json(school);
   } catch (err) {
      return res.status(400).json(err);
   }
};

