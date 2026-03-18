import { ProjectName } from "../../project";

export type UiReducerState = {
  projectName: ProjectName;
  pageName: string | null;
  isLoading: boolean;
  exchangeId: number | null;
  isAppReady: boolean;
  isFirstPageLoading: boolean;
  hasRateNoteOpenedOnce: boolean;
};