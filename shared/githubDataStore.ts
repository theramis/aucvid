import { Octokit } from "@octokit/core";

const githubOwner = "theramis";
const githubRepo = "aucvid";

const octokit = new Octokit();
const adminOctokit = new Octokit({ auth: process.env.GITHUB_PAT });

export const getLatestFetchyRun = async () => {
  const { data } = await octokit.request(
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

  const [latestRun = null] = data.workflow_runs;

  return latestRun;
};

export const triggerFetchy = async () => {
  const response = await adminOctokit.request(
    "POST /repos/{owner}/{repo}/dispatches",
    {
      owner: githubOwner,
      repo: githubRepo,
      event_type: "trigger-fetchy-boi",
    }
  );

  return response;
};
