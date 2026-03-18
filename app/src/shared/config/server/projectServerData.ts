import { ProjectServerData } from "@/shared/model/project";

export const PROJECT_SERVER_DATA: ProjectServerData = {
    apiUrl: process.env.API_URL || '',
    username: process.env.USERNAME || "",
    password: process.env.PASSWORD || ""
}