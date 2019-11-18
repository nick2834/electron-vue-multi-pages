import http from '@/utils/httpRequest'
// import store from "@/store";

import {
    getIdentifierSign,
    unreadMessageCount,
    caseList,
    caseInfo,
    allRelevant,
    historyMsg
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
export const infoByCaseId = data => {
    return http.post(caseInfo, data, {})
}
export const getAllRelevant = data => {
    return http.post(allRelevant, data, {})
}
export const getHistoryMsg = data => {
    return http.post(historyMsg, data, {})
}