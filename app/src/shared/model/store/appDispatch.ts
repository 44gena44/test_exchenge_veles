import { Action, UnsubscribeListener, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "./state";

export type AppDispatch = ((action: Action<"listenerMiddleware/add">) => UnsubscribeListener) & ThunkDispatch<RootState, undefined, UnknownAction> ;
