import { UserListApiResponse } from "../../api";

export type UserReducerState = {
  id: number | null;
  data: UserListApiResponse | null;
  mailRequired: boolean;
  agreementAccepted: boolean;
  sessionId: string | null;
  initData: string | null;
};
