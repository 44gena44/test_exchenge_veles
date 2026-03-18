import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    UserListApiResponse,
    UserUpdateCreateApiArg,
} from "@/shared/model/api";
import {UserReducerState} from "@/shared/model/store/state";

const initialState: UserReducerState = {
    data: null,
    id: null,
    mailRequired: false,
    agreementAccepted: true,
    sessionId: null,
    initData: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserId(state, action: PayloadAction<number>) {
            state.id = action.payload;
        },
        setUserInitData(state, action: PayloadAction<string | null>) {
            state.initData = action.payload;
        },
        setUserData(state, action: PayloadAction<UserListApiResponse>) {
            state.data = action.payload;
        },

        setUserEmail(state, action: PayloadAction<string>) {
            if (state.data)
                if (state.data.user_data) state.data.user_data.email = action.payload;
        },
        setMailRequired(state, action: PayloadAction<boolean>) {
            state.mailRequired = action.payload;
        },
        setAgreementAccepted(state, action: PayloadAction<boolean>) {
            state.agreementAccepted = action.payload;
        },
        updateUserProfileData(
            state,
            action: PayloadAction<{
                full_name?: string;
                phone?: string;
                email?: string;
            }>
        ) {
            const {full_name, phone, email} = action.payload;
            if (state.data?.user_data) {
                state.data.user_data.email = email;
                state.data.user_data.name = full_name;
                state.data.user_data.phone = phone;
            }
        },
        setSessionId(state, action: PayloadAction<string>) {
            state.sessionId = action.payload;
        },
        setKycStatus(state, action: PayloadAction<'False' | 'True' | 'InProcess'>) {
            if (state.data?.user_data) {
                state.data.user_data.kyc_verified = action.payload
            }
          
        }
    },
});
export const {
    setUserId,
    setUserInitData,
    setUserData,
    setUserEmail,
    setMailRequired,
    setAgreementAccepted,
    updateUserProfileData,
    setSessionId,
    setKycStatus
} = userSlice.actions;
export const userReducer = userSlice.reducer;
