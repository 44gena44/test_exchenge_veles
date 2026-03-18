
import { REDUX_LOCAL_STORE_KEY } from "@/shared/config";
import { isLocalStorageAvailable } from ".";
import { RootState } from "@/shared/model/store";

 export const saveState = (state: Partial<RootState>) => {
  if (!isLocalStorageAvailable()) {
    return;
  }

  try {
    const serializedState = JSON?.stringify(state);
    localStorage?.setItem(REDUX_LOCAL_STORE_KEY, serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
}; 