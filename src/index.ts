import { listeners } from "cluster";

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
  type: string;
  subscribe: (repo: string, onChange: ChangeFunc) => void;
  unsubscribe: (repo: string, onChange: ChangeFunc) => void;
  commit: (repo: string, commit: Commit) => Promise<void>;
};

export type RepoConfig = {
  provider: string;
  config: any;
};

let providers: GitstaProvider[] = [];

export async function setup(gitstaProviders: GitstaProvider[]) {
  providers = providers.concat(gitstaProviders);
}

type Listeners = {
  [repo: string]: ChangeFunc[];
};

let listeners: Listeners = {};

export function subscribe(repo: string, changeFunc: ChangeFunc) {
  if (listeners[repo]) {
    listeners[repo].push(changeFunc);
  } else {
    listeners[repo] = [changeFunc];
  }
}

export function unsubscribe(repo: string, changeFunc: ChangeFunc) {
  if (repo === "*") {
    listeners = Object.keys(listeners).reduce((acc, repo) => {
      acc[repo] = listeners[repo].filter((x) => x !== changeFunc);
      return acc;
    }, {} as Listeners);
  } else {
    if (listeners[repo]) {
      listeners[repo] = listeners[repo].filter((x) => x !== changeFunc);
    }
  }
}

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
