import { useServerAction } from "@/shared/lib"
import { useAppDispatch, useAppSelector } from "@/shared/model/store"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
import { getUserDataAction } from "../api"
import { setKycStatus } from "../model"

export const KycStatusPuller = () => {
    const userId = useAppSelector(state => state.user.id)
    const initData = useAppSelector(state => state.user.initData)

    const pathname = usePathname()

    const [getUserData, userData] = useServerAction({
        action: getUserDataAction
    })
    useEffect(() => {
        if (userId && initData) {
            getUserData({ userId, initData })
        }

    }, [pathname, userId, initData])

    const dispatch = useAppDispatch()
 
    useEffect(() => {
        if (userData?.user_data?.kyc_verified) {
            dispatch(setKycStatus(userData.user_data?.kyc_verified))
        }
    }, [userData])
    return <></>
}