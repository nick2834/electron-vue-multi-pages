export const loginURL = process.env.NODE_ENV === 'development' ?
    'http://localhost:9080/login' :
    `file://${__dirname}/login/index.html`;
export const mainURL = process.env.NODE_ENV === 'development' ?
    'http://localhost:9080/main/#wechat' :
    `file://${__dirname}/main/index.html/#wechat`;
export const modalURL = process.env.NODE_ENV === 'development' ?
    'http://localhost:9080/main/#/modal' :
    `file://${__dirname}/main/index.html/#/modal`;