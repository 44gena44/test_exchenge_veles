"use server"

import { promises as fs } from "fs";
export const ensureDirectoryExist = async (dir: string) => {
  try {
    await fs.access(dir);
  } catch {
    fs.mkdir(dir);
  }
};
