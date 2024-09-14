import { execSync } from "child_process";

export const initGitRepo = (path: string) => {
  execSync("git init .", {
    cwd: path,
  });
};

export const setGitRemoteOrigin = (path: string, remoteUrl: string) => {
  execSync(`git remote add origin ${remoteUrl}`, {
    cwd: path,
  });
};
