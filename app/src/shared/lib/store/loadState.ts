import { PROJECT_DATA, REDUX_LOCAL_STORE_KEY } from "@/shared/config";
import { RootState } from "@/shared/model/store";

export const loadState = ():Partial<RootState> | undefined => {
  const pageData = PROJECT_DATA?.page;

  const rootState = { pageData };
  if (typeof window === 'undefined') {
    return rootState;
  }
  try {
    const serializedState = localStorage?.getItem(REDUX_LOCAL_STORE_KEY);

    if (serializedState === null) {
      return rootState;
    }
    const serializedStateParsed = JSON.parse(serializedState);

    return { ...rootState, ...serializedStateParsed };
  } catch (err) {
    return rootState;
  }
};
