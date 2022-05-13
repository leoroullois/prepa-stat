import { NextApiRequest, NextApiResponse } from "next";

type Controller = (req: NextApiRequest, res: NextApiResponse, next:any) => Promise<void>;

export default Controller;
