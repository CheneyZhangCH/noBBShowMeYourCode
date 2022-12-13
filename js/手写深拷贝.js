/*
手写深拷贝
 */

/*
方法1，用 JSON
缺点： 
1、不支持Date、正则、undefined、function等数据
2、不支持引用 （环形数据， 之前的数据关系会被破坏）
3、要会用递归的方法写深拷贝
*/
const cloneDeep1 = (a) => JSON.parse(JSON.stringify(a))

/*
方法2，
1、递归
2、要判断类型
3、检查环形数据
4、不拷贝原型上的属性
*/
{
    const cloneDeep2 = (a, cache) => {
        if (!cache) {
            cache = new Map() // 缓存不能全局，最好临时创建并递归传递 
        }

        if (a instanceof Object) { // 不考虑iframe
            if (cache.get(a)) return cache.get(a)
            let result = undefined
            if (a instanceof Function) {
                if (a.prototype) { // 判断是普通函数
                    result = function () { return a.apply(this, arguments) }
                } else {
                    result = (...args) => { return a.call(undefined, ...args) }
                }

            } else if (a instanceof Array) {
                result = []
            } else if (a instanceof Date) {
                result = new Date(a - 0)
            } else if (a instanceof RegExp) {
                result = new RegExp(a.source, a.flags)
            } else {
                result = {}
            }
            cache.set(a, result)
            // 拷贝所有属性
            for (let key in a) {
                if (a.hasOwnProperty[key]) { // 自身的属性才需需要拷贝， 继承的不需要拷贝
                    result[key] = cloneDeep2(a[key], cache)
                }
            }
            return result
        } else {
            return a
        }
    }

    const a = {
        number: 1, bool: false, str: 'hi', empty1: undefined, empty2: null,
        array: [{ name: 'frank', age: 18 }, { name: 'jacky', age: 19 }],
        date: new Date(2000, 0, 1, 20, 30, 0),
        regex: /\.(j|t)sx/i,
        obj: { name: 'frank', age: 18 },
        f1: (a, b) => a + b,
        f2: function (a, b) { return a + b }
    }

    a.self = a // 环形引用

}


