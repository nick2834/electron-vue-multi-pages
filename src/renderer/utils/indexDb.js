var data = [{
    id: 1,
    name: 'Tom',
    age: '18'
}, {
    id: 2,
    name: 'Tommy',
    age: '16'
}]
// 打开数据库，两个参数（数据库名字，版本号），如果数据库不存在则创建一个新的库
var dbRequest = window.indexedDB.open('caseDb', '1')
// 数据库操作过程中出错，则错误回调被触发
dbRequest.onerror = (event) => {
    console.log(event)
}
// 数据库操作一切正常，所有操作后触发
dbRequest.onsuccess = (event) => {
    var db = event.target.result
    // 数据读取
    // var usersObjectStore = db.transaction('cases').objectStore('cases')
    // var userdbRequest = usersObjectStore.get(1)
    // userdbRequest.onsuccess = function (event) {
    //     console.log(event.target.result)
    // }
}
// 创建一个新的数据库或者修改数据库版本号时触发
dbRequest.onupgradeneeded = (event) => {
    var db = event.target.result
    // 创建对象仓库用来存储数据，把id作为keyPath，keyPath必须保证不重复，相当于数据库的主键
    var objectStore = db.createObjectStore('caseData', {
        keyPath: 'titlekey'
    })
    // // 建立索引，name和age可能重复，因此unique设置为false
    objectStore.createIndex('name', 'name', {
        unique: false
    })
    objectStore.createIndex('age', 'age', {
        unique: false
    })
    // 确保在插入数据前对象仓库已经建立
    // objectStore.transaction.oncomplete = () => {
    //     // 将数据保存到数据仓库
    //     var usersObjectStore = db.transaction('cases', 'readwrite').objectStore('cases')
    //     data.forEach(data => {
    //         usersObjectStore.add(data)
    //     })
    // }
}


export {
    dbRequest
}