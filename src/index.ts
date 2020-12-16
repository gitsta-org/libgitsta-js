export type FileCreation = {
  type: "create";
  filePath: string;
  contents: string;
};

export type FileUpdation = {
  type: "update";
  filePath: string;
  contents: string;
};

export type FileDeletion = {
  type: "delete";
  filePath: string;
};

export type FileChange = FileCreation | FileUpdation | FileDeletion;

export type Commit = {
  message: string;
  changes: FileChange[];
};

export type ChangeFunc = (repo: string, commit: Commit) => Promise<boolean>;

export type GitstaProvider = {
  subscribe: (repo: string, onChange: ChangeFunc) => void;
  unsubscribe: (repo: string, onChange: ChangeFunc) => void;
  commit: (repo: string, commit: Commit) => Promise<void>;
};

export async function setup() {}

export async function subscribe(repo: string, changeFunc: ChangeFunc) {}

export type SyncOptions = {
  drivers: {
    [key: string]: any;
  };
};

export async function sync(repo: string, options: SyncOptions) {}

export async function getFiles() {}

export async function createFile(
  message: string,
  content: string,
  sha: string,
  branch: string,
  committer: string,
  author: string
) {}

export async function readFile() {}

export async function updateFile(
  message: string,
  content: string,
  sha: string,
  branch: string,
  committer: string,
  author: string
) {}

export async function deleteFile() {}
