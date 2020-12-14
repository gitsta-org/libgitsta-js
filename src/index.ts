import { ChangeFunc } from "@gitsta/types";

export async function setup() {}

export async function subscribe(repo: string, changeFunc: ChangeFunc) {}

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

export async function deleteFile() {
  
}
