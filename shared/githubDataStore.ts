import { Octokit } from "@octokit/core";

export const getLastestFetchyRun = async () => {
  const octokit = new Octokit({ auth: process.env.GITHUB_PAT });
  const { data } = await octokit.request(
    "GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs",
    {
      owner: "theramis",
      repo: "aucvid",
      workflow_id: "fetchy.yml",
      branch: "main",
      status: "success",
      exclude_pull_requests: true,
      per_page: 1,
    }
  );

  const [latestRun = null] = data.workflow_runs;

  return latestRun;
};
