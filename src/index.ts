import { Readable } from "stream";

export type FileCreation = {
  type: "create";
  filePath: string;
};

export type FileUpdation = {
  type: "update";
  filePath: string;
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

export type ChangeFunc = (repo: string, commit: Commit) => Promise<void>;

export type GitstaProvider = {
  type: string;
  subscribe: (repo: string, onChange: ChangeFunc) => void;
  unsubscribe: (repo: string, onChange: ChangeFunc) => void;
  commit: (repo: string, commit: Commit) => Promise<void>;
  getFileStream: (path: string) => Readable;
  
};

export type RepoConfig = {
  provider: string;
  config: any;
  hashingAlgorithm: "sha1";
};

const providers: Map<string, GitstaProvider> = new Map();

export async function setup(gitstaProviders: GitstaProvider[]) {
  gitstaProviders.forEach((x) => providers.set(x.type, x));
}

const listeners: Map<string, ChangeFunc[]> = new Map();

export async function getRepoConfig(repo: string): Promise<RepoConfig> {
  return {
    provider: "github",
    config: {},
    hashingAlgorithm: "sha1",
  };
}

export function subscribe(repo: string, changeFunc: ChangeFunc) {
  let entries = listeners.get(repo);

  if (!entries) {
    const newEntries: ChangeFunc[] = [];
    listeners.set(repo, newEntries);
    entries = newEntries;
  }

  entries.push(changeFunc);
}

export function unsubscribe(repo: string, changeFunc: ChangeFunc) {
  const entries = listeners.get(repo);
  if (entries) {
    listeners.set(
      repo,
      entries.filter((x) => x !== changeFunc)
    );
  }
}

export async function commit(repo: string, commit: Commit) {
  const repoConfig = await getRepoConfig(repo);
  const provider = providers.get(repoConfig.provider);
  if (provider) {
    provider.commit(repo, commit);
  } else {
    throw new Error(`The storage provider ${repoConfig.provider} is missing.`);
  }
}
