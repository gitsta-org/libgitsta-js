export type Repo = {
  name: string;
};

export type CommitSummary = {
  id: string;
  author: string;
  time: string;
};

export type Commit = {
  id: string;
  author: string;
  time: string;
  files: {
    filename: [];
    change: "create" | "update" | "delete";
  }[];
};

export async function initRepo(name: string) {}

export async function getRepos(name: string): Promise<Repo> {
  return { name };
}

export async function getCommits(repo: Repo): Promise<CommitSummary[]> {
  return [];
}

export async function getCommitDetails(id: string): Promise<Commit> {
  return {
    id: "somehash",
    author: "jeswin",
    time: "100",
    files: [],
  };
}

export async function getFiles() {}

export async function createFile() {}

export async function readFile() {}

export async function updateFile() {}

export async function deleteFile() {}
