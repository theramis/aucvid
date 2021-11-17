import type { NextApiRequest, NextApiResponse } from "next";

import { triggerFetchy } from "../../../shared/githubDataStore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { secret } = req.query;

  if (secret === process.env.API_KEY) {
    const response = await triggerFetchy();
    res.status(response.status).end();
  } else {
    res.status(401).json({ message: "Missing or incorrect secret!" });
  }
}
