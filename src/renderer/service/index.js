import http from '@/utils/httpRequest'
// import store from "@/store";

import {
    getIdentifierSign,
    unreadMessageCount,
    caseList
} from "./api";

export const getIdentifier = data => {
    return http.post(getIdentifierSign, data, {})
}

export const getUnreadMessage = data => {
    return http.post(unreadMessageCount, data, {})
}
export const selectMyCaseList = data => {
    return http.post(caseList, data, {})
}