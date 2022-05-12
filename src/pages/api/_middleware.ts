// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextFetchEvent, NextRequest } from "next/server";

const middleware = (req: NextRequest, ev: NextFetchEvent) => {
   console.log(`${req.method} - ${req.url} - ${req.ip}`);
};

export default middleware;
