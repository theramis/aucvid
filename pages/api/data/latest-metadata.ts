import type { NextApiRequest, NextApiResponse } from "next";
import {
  LatestMetadataResponse,
  ErrorResponse,
} from "../../../shared/types/api";

import { getAllVaccineData } from "../../../shared/vaccineDataStore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LatestMetadataResponse | ErrorResponse>
) {
  const [latestData] = await getAllVaccineData(1);

  if (latestData && latestData.metadata) {
    res.status(200).json({ ...latestData.metadata });
  } else {
    res.status(404).json({ message: "No data found" });
  }
}
