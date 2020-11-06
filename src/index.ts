export type Repo = {
  name: string;
};

export type CommitLogEntry = {
  id: string;
  author: string;
  time: string;
};

export type Commit = {
  id: string;
  author: string;
  time: string;
  files: {
    filename: string;
    change: "create" | "update" | "delete";
  }[];
};

export type FileChange =
  | {
      type: "create";
      filename: string;
      contents: string;
    }
  | {
      type: "update";
      filename: string;
      contents: string;
    }
  | {
      type: "delete";
      filename: string;
    };

export type CommitData = {
  id: string;
  author: string;
  time: string;
  files: FileChange[];
};

export async function initRepo(name: string) {
  // 
}

export async function getRepos(name: string): Promise<Repo> {
  return { name };
}

export async function getCommits(repo: Repo): Promise<CommitLogEntry[]> {
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

export async function createCommit(commit: CommitData) {
  
}

export async function getFiles() {}

export async function createFile() {}

export async function readFile() {}

export async function updateFile() {}

export async function deleteFile() {}
