import type { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "@octokit/core";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const octokit = new Octokit({ auth: process.env.GITHUB_PAT });
  const response = await octokit.request(
    "POST /repos/{owner}/{repo}/dispatches",
    {
      owner: "theramis",
      repo: "aucvid",
      event_type: "trigger-fetchy-boi",
    }
  );
  res.status(response.status).end();
}
