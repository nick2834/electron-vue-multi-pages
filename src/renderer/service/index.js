import http from '@/utils/httpRequest'
// import store from "@/store";

import {
    login,
    getIdentifierSign,
    unreadMessageCount,
    caseList,
    caseInfo,
    updateMsg,
    UnreadCasesList,
    allRelevant,
    Group,
    deliveryAddress,
    historyMsg
} from "./api";
export const users = data => {
    return http.post(login, data, {})
}

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
export const CreateGroup = data => {
    return http.post(Group, data, {})
}
export const getAddress = data => {
    return http.post(deliveryAddress, data, {})
}
export const getUpdateMsg = data => {
    return http.post(updateMsg, data, {})
}
export const getUnreadCaseList = data => {
    return http.post(UnreadCasesList, data, {})
}
export const getHistoryMsg = data => {
    return http.post(historyMsg, data, {})
}