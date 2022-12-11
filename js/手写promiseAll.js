/*
手写Promise.all
要点：
1. 要在 Promise 上写而不是在原型上写
2. Promise.all 的参数（Promise 数组）和返回值（新 Promise 对象）
3. 要用数组来记录结果
4. 只要有一个 reject 就整体 reject
*/

Promise.myAll = function (list) {
    const results = []
    let count = 0
    return new Promise((resolve, reject) => {
        list.map((promise, index) => {
            promise.then(
                (r) => {
                    result[index] = r
                    count += 1
                    if (count >= list.length) {
                        resolve(results)
                    }
                },
                (reason) => {
                    reject(reason)
                },
            )
        })
    })
}