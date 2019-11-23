import {
    getUnreadMessage,
    selectMyCaseList,
    getAddress
} from '@/service'
import user from './user';
export default {
    namespaced: true,
    state: {
        msgCount: 0,
        caseId: "",
        caseNo: "",
        groupId: "",
        roomId: ""
    },
    mutations: {
        updateMsgCount(state, count) {
            state.msgCount = count
        },
        updateCaseid(state, caseId) {
            state.caseId = caseId
        },
        updateCaseno(state, caseNo) {
            state.caseNo = caseNo
        },
        clearCaseid(state, caseId) {
            state.caseId = caseId
        },
        updateGroupId(state, groupId) {
            state.groupId = groupId
        },
        updateRoomId(state, roomId) {
            state.roomId = roomId
        },
    },
    actions: {
        //获取未读消息数
        getUnreadMessages({
            commit
        }) {
            return new Promise((resolve, reject) => {
                getUnreadMessage({
                    moduleId: "tc-selectUnreadMessage",
                    role: user.state.role,
                    identityId: user.state.userInfo.identityId,
                    openid: user.state.userInfo.openid
                }).then(({
                    data
                }) => {
                    let msgCount = data.data.msgCount;
                    commit('updateMsgCount', msgCount);
                    resolve(data)
                }).catch(err => {
                    reject(err)
                });
            })
        },
        //获取案件列表
        selectMyCaseList({}, data) {
            return new Promise((resolve, reject) => {
                selectMyCaseList({
                    moduleId: "tc-case/list",
                    role: user.state.role,
                    pageNum: data.pageNum,
                    pageSize: 15,
                    status: data.status,
                    sorter: "updateTime_ascend",
                    keyword: data.keyword,
                    openid: user.state.openid
                }).then(({
                    data
                }) => {
                    resolve(data);
                }).catch(err => {
                    reject(err)
                })
            })
        },
        //送达地址
        getDeliveryAddress({
            state
        }) {
            return new Promise((resolve, reject) => {
                getAddress({
                    moduleId: "tc-getDeliveryAddress",
                    caseId: state.caseId,
                    identityId: user.state.userInfo.identityId,
                    role: user.state.role
                }).then(({
                    data
                }) => {
                    resolve(data)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}