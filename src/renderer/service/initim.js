var imConfig = {
  sdkappid: 0,
  accountType: 0,
  accountMode: 0 //帐号模式，0-表示独立模式，1-表示托管模式
};
import TIM from 'tim-js-sdk';
/*
 ** 云通信初始化
 ** params {identifier,userSig,identifierNick}
 **  证件号
 **  签名
 **  登录名
 */
export function initIM(identifier, userSig, identifierNick, commit, state, dispatch) {
  let options = {
    SDKAppID: imConfig.sdkappid // 接入时需要将0替换为您的即时通信应用的 SDKAppID
  };
  let tim = TIM.create(options); // SDK 实例通常用 tim 表示
  tim.setLogLevel(1);

  tim.on(TIM.EVENT.MESSAGE_RECEIVED, function (msgs) {
    let msgData = msgs.data;
    if (msgData.length > 0) {
      msgData.map(msg => {
        if (msg.from != "@TIM#SYSTEM") {
          setTimeout(() => {
            if (msg.from == "admin") {
              let messageBody = msg.payload.text;
              var msgCount = String(JSON.parse(messageBody).msgCount);
              commit("updateMsgCount", msgCount);
            } else {
              let messageBody = msg.payload.data;
              let newsList = state.newsList.filter(item => item.headUrl)
              commit('updateNewsList', newsList)
              commit('updateMessage', JSON.parse(messageBody))
              dispatch('getUnreadCaseList', {
                pageNum: 1
              })
            }
          }, 1000);
        }
      })
    }
  });
  tim.login({
    userID: identifier,
    userSig: userSig
  }).then(res => {
    sessionStorage.setItem('im_state', true)
    commit('SET_IMSTATE', true)
  }).catch(err => {

  });
}
/*
 ** IM退出登录
 */
export function logoutIM() {
  tim.logout().then(function (imResponse) {
    console.log(imResponse.data); // 登出成功
  }).catch(function (imError) {
    console.warn('logout error:', imError);
  });
}