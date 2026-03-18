"use server";

import { PROJECT_SERVER_DATA } from "@/shared/config/server";
import path from "path";
import { cwd } from "process";
import { promises as fs } from "fs";
import { FetchApiProps, fetchApi } from "./fetchApi";
import { isFileExist } from "./checkTokenFile";
import { ensureDirectoryExist } from "./ensureDIrectoryExist";

type GetTokenApiArg = {
    username: string;
    password: string;
};

type GetTokenApiResponse = {
    refresh: string;
    access: string;
};

const TOKEN_FILE_NAME = "token.txt";
const TOKEN_FILE_DIR = path.join(cwd(), "data");

export const getToken = async ({ isTokenValid = true }: { isTokenValid: boolean }) => {
    try {
        if (!PROJECT_SERVER_DATA.apiUrl) {
            return "";
        }
        await ensureDirectoryExist(TOKEN_FILE_DIR);
        const tokenFilePath = path.join(TOKEN_FILE_DIR, TOKEN_FILE_NAME);
        const isTokenFile = await isFileExist(tokenFilePath);

        // console.log('isTokenFile', isTokenFile)

        const getNewToken = async () => {

            const result = await fetch(PROJECT_SERVER_DATA.apiUrl + '/api/token/', {
                method: "POST", body: JSON.stringify({
                    username: PROJECT_SERVER_DATA.username,
                    password: PROJECT_SERVER_DATA.password,
                },), headers: {
                    "Content-Type": "application/json",
                }
            });

            const tokenData: GetTokenApiResponse = await result.json();


            // console.log('tokenData', tokenData)

            await fs.writeFile(path.join(tokenFilePath), tokenData?.access || '');
            return tokenData.access;
        };

        if (!isTokenFile || !isTokenValid) {
            return await getNewToken()
        } else {
            const tokenBuffer = await fs.readFile(tokenFilePath);
            // console.log('tokenBuffer', tokenBuffer)

            return tokenBuffer.toString();
        }
    } catch (e) {
        console.log(e)
    }

};
