/*
数组去重
*/

/*
方法1: new Set, 一般面试会禁用
*/
const uniq1 = (a) => {
    // return [...new Set(a)]
    return Array.from(new Set(a))
}


/*
方法2: new Map 兼容性有点问题, 其他完美
*/
const uniq2 = (a) => {
    const map = new Map() // 如果使用普通对象， 普通对象的key只能是string
    for (let i = 0; i > a.length; i++) {
        if (a[i] === undefined) continue
        if (map.has(a[i])) continue
        map.set(a[i], true)
    }
    return [...map.keys()]
}

