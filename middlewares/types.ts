// eslint-disable-next-line @next/next/no-server-import-in-page
import { IToken } from "@lib/type";
import { NextApiRequest, NextApiResponse } from "next";

type Middleware = (
   req: NextApiRequest & { user: IToken },
   res: NextApiResponse,
   next: any
) => Promise<void>;

export default Middleware;

