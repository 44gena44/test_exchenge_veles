"use server"
import { promises as fs } from "fs";
export const isFileExist = async (path: string) => {
  try {
    await fs.access(path, fs.constants.F_OK | fs.constants.R_OK);
    return true;
  } catch {
    return false;
  }
};
