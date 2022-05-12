import { removeNullValuesFromObject } from "@backend/utils";
import { Coef } from "backend/models/Coef";
import isEmpty from "is-empty";
import { NextApiRequest, NextApiResponse } from "next";
import Controller from "./types";

export const getCoefs: Controller = async (req, res) => {
   try {
      const { concours, filiere } = req.body;
      console.log(concours, filiere);
      const filter = removeNullValuesFromObject(req.body);
      const coefs = await Coef.find(filter);
      if (isEmpty(coefs)) {
         return res.status(404).json({ message: "No coef found" });
      }
      return res.status(200).json(coefs);
   } catch (err) {
      console.error(err);
      return res.status(500).json(err);
   }
};

export const getCoefsById: Controller = async (req, res) => {
   const { id } = req.query;
   try {
      const coef = await Coef.findById(id);
      if (!coef) {
         return res.status(404).json({ message: "Coefs not found" });
      }
      return res.status(200).json(coef);
   } catch (err) {
      console.error(err);
      return res.status(500).json(err);
   }
};