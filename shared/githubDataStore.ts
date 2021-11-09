import { Octokit } from "@octokit/core";
import { OctokitResponse } from "@octokit/types";

import { createCache } from "./cache";

const githubOwner = "theramis";
const githubRepo = "aucvid";

const octokit = new Octokit({ auth: process.env.GITHUB_PAT });

type LatestFetchyRunResponse = OctokitResponse<
  { workflow_runs: { run_started_at?: string | undefined }[] },
  200
>;

const getOrUpdateLatestFetchyRunCache = createCache<LatestFetchyRunResponse>({
  name: "latest-fetchy-run",
});

export const getLatestFetchyRun = async () => {
  const cache = await getOrUpdateLatestFetchyRunCache(async () => {
    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs",
      {
        owner: githubOwner,
        repo: githubRepo,
        workflow_id: "fetchy.yml",
        branch: "main",
        status: "success",
        exclude_pull_requests: true,
        per_page: 1,
      }
    );

    return response;
  });

  const [latestRun = null] = cache.value?.data?.workflow_runs ?? [];

  return latestRun;
};

export const triggerFetchy = async () => {
  const response = await octokit.request(
    "POST /repos/{owner}/{repo}/dispatches",
    {
      owner: githubOwner,
      repo: githubRepo,
      event_type: "trigger-fetchy-boi",
    }
  );

  return response;
};
