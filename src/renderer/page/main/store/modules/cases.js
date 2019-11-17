import { getUnreadMessage, selectMyCaseList } from '@/service'
import user from './user';
const { state } = user
export default {
    namespaced: true,
    state: {
        msgCount: 0,
        caseId: ""
    },
    mutations: {
        updateMsgCount(state, count) {
            state.msgCount = count
        },
        updateCaseid(state, caseId) {
            state.caseId = caseId
        },
        clearCaseid(state,caseId){
            state.caseId = caseId
        }
    },
    actions: {
        //获取未读消息数
        getUnreadMessages({
            commit
        }) {
            return new Promise((resolve, reject) => {
                getUnreadMessage({
                    moduleId: "tc-selectUnreadMessage",
                    role: state.role,
                    identityId: state.userInfo.identityId,
                    openid: state.userInfo.openid
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
        selectMyCaseList({ }, data) {
            return new Promise((resolve, reject) => {
                selectMyCaseList({
                    moduleId: "tc-case/list",
                    role: state.role,
                    pageNum: data.pageNum,
                    pageSize: 15,
                    status: data.status,
                    sorter: "updateTime_ascend",
                    keyword: data.keyword,
                    openid: state.userInfo.openid
                }).then(({
                    data
                }) => {
                    resolve(data);
                }).catch(err => {
                    reject(err)
                })
            })
        },
    }
}