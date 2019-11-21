import {
    getIdentifier,
    getUnreadCaseList
} from '@/service';
import user from './user'
import {
    initIM
} from '@/service/initim'
export default {
    namespaced: true,
    state: {
        imState: false,
        msgCount: 0,
        newsList: [],
        unreadList: [],
        unreadListCount: 0,
        messageData: {}
    },
    actions: {
        //获取IM签名
        getIdentifierActions({
            commit,
            state,
            dispatch
        }, userInfo) {
            const {
                identityId,
                avatar,
                nickName
            } = userInfo
            return new Promise((resolve, reject) => {
                getIdentifier({
                    moduleId: "tc-identifierSign",
                    identifier: identityId
                }).then(({
                    data
                }) => {
                    //IM启动
                    initIM(identityId, data.data.identifierSign, nickName, commit, state, dispatch)
                    resolve(data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        //未读消息列表
        getUnreadCaseList({
            commit
        }, data) {
            const {
                state
            } = user
            return new Promise((resolve, reject) => {
                getUnreadCaseList({
                    moduleId: "tc-selectUnreadCases",
                    role: state.role,
                    pageNum: data.pageNum,
                    pageSize: 15,
                    openid: state.userInfo.openid
                }).then(({
                    data
                }) => {
                    commit('updateUnreadList', data.data.list);
                    commit('updateUnreadListCount', data.data.count);
                    resolve(data)
                }).catch(err => reject(err))
            })
        },
    },
    mutations: {
        SET_IMSTATE(state, value) {
            state.imState = value;
        },
        updateMsgCount(state, msgCount) {
            state.msgCount = msgCount;
        },
        setNewsList(state, value) {
            let newsList = state.newsList;
            state.newsList = value.concat(newsList);
        },
        updateNewsList(state, value) {
            state.newsList = value;
        },
        //获取案件聊天记录
        updateMessage(state, value) {
            let newsList = state.newsList;
            if (state.caseId != '' && value.caseId == state.caseId) {
                if (value.messageType == 16) {
                    if (value.messageBody.openids.indexOf(state.openid) != -1) { //判断是否点击过
                        value.messageBody['isHasMe'] = true
                    } else {
                        value.messageBody['isHasMe'] = false
                    }
                    if (!value.messageBody.reciveIdentity) { //判断我是否能看到这条消息
                        value.messageBody['iCanSee'] = true
                    } else {
                        if (value.messageBody.reciveIdentity.indexOf(state.user.identityId) != -1) {
                            value.messageBody['iCanSee'] = true
                        } else {
                            value.messageBody['iCanSee'] = false
                        }
                    }
                }
                if (value.messageType == 17) {
                    if (value.messageBody.openids.indexOf(state.openid) != -1) { //判断是否点击过
                        value.messageBody['isHasMe'] = true
                    } else {
                        value.messageBody['isHasMe'] = false
                    }
                }
                if (value.messageType == 18) {
                    if (!value.messageBody.reciveIdentity) { //判断我是否能看到这条消息
                        value.messageBody['iCanSee'] = true
                    } else {
                        if (value.messageBody.reciveIdentity.indexOf(state.user.identityId) != -1) {
                            value.messageBody['iCanSee'] = true
                        } else {
                            value.messageBody['iCanSee'] = false
                        }
                    }
                }
                if (value.messageType == 6) {
                    if (value.messageBody.messagePostIdentity) {
                        if (value.messageBody.messagePostIdentity.indexOf(state.user.identityId) != -1) {
                            value.messageBody['isHasMe'] = true
                        } else {
                            value.messageBody['isHasMe'] = false
                        }
                    } else {
                        value.messageBody['isHasMe'] = true
                    }
                }
                if (value.messageType == 8) {
                    if (value.messageBody.receiverIdentityId) {
                        if (value.messageBody.receiverIdentityId.indexOf(state.user.identityId) != -1) {
                            value.messageBody['iCanSee'] = true
                        } else {
                            value.messageBody['iCanSee'] = false
                        }
                    } else {
                        value.messageBody['iCanSee'] = true
                    }
                }
                // 私信
                if (value.isPersonalMsg == 1) {
                    if (value.messageBody.sendPeopleIndentityId) {
                        if (value.messageBody.sendPeopleIndentityId.indexOf(state.user.identityId) != -1) {
                            value.messageBody['isHasMe'] = true
                        } else {
                            value.messageBody['isHasMe'] = false
                        }
                    }
                }
                newsList.push(value);
                // if (newsList.length > 10) {
                //   newsList.splice(0, newsList.length - 10)
                // }
                state.newsList = newsList;
                // state.messageBody = value;
            }

        },
        updateUnreadList(state, unreadList) {
            state.unreadList = unreadList
        },
        updateUnreadListCount(state, unreadListCount) {
            state.unreadListCount = unreadListCount
        },
        updateMessagData(state, messageData) {
            state.messageData = messageData
        }
    }
}