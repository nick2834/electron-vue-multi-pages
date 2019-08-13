const user = {
    state: {
        userInfo: null
    },
    mutations:{
        SET_USER: (state,data) =>{
            state.userInfo = data
        },
        REMOVE_USER: (state,data) =>{
            state.userInfo = data
        }
    }
}

export default user