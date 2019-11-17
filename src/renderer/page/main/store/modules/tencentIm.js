import { getIdentifier } from '@/service';
import { initIM } from '@/service/initim'
export default {
    namespaced: true,
    state: {
        imState: false
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
    },
    mutations: {
        SET_IMSTATE(state, value) {
            state.imState = value;
        },
    }
}