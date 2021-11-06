import type { NextApiRequest, NextApiResponse } from "next";

import { getLastestFetchyRun } from "../../../shared/githubDataStore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ data: await getLastestFetchyRun() });
}