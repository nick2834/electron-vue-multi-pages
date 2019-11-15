import Mock from 'mockjs'

// 生成数据列表
var dataList = []
for (let i = 0; i < Math.floor(Math.random() * 15 + 1); i++) {
  dataList.push(Mock.mock({
    'id': '@increment', 
    'title': `《${"@ctitle(15)"}》`, //标题
    'author': '@csentence(3, 5)', //作者账号
    'platform': '@ctitle(3, 5)', //网络平台
    'url': '@url()', //文章链接
    'createtime': '@datetime', //文章链接
    'status': '@boolean()', //状态
  }))
}
// 获取文件列表
export function list() {
    return {
      // isOpen: false,
      url: '/chatlist/list',
      type: 'get',
      data: {
        'msg': 'success',
        'code': 0,
        'page': {
          'totalCount': dataList.length,
          'pageSize': 10,
          'totalPage': 1,
          'currPage': 1,
          'list': dataList
        }
      }
    }
  }