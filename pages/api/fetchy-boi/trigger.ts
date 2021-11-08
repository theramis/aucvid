import type { NextApiRequest, NextApiResponse } from "next";

import { triggerFetchy } from "../../../shared/githubDataStore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const secret = req.query["secret"];

  if (secret !== process.env.API_SECRET) {
    res.status(401).json({ message: "Missing or incorrect secret!" });
  } else {
    const response = await triggerFetchy();
    res.status(response.status).end();
  }
}
