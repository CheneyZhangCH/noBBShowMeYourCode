// 手写promise(简化版)
{
    class myPromise {
        #status = 'pending'
        constructor(fn) {
            this.queue = []
            const resolve = (data) => {
                // this.#status = 'fullfilled'
                const f1f2 = this.queue.shift()
                if (!f1f2 || !f1f2[0]) return
                const x = f1f2(0).call(undefined, data)
                if (x instanceof myPromise) {
                    x.then(
                        (data) => {
                            resolve(data)
                        },
                        (reason) => {
                            reject(reason)
                        }
                    )
                } else {
                    resolve(x)
                }
            }
            const reject = (reason) => {
                // this.#status = 'rejected'
                const f1f2 = this.queue.shift()
                if (!f1f2 || !f1f2[0]) return
                const x = f1f2(1).call(undefined, reason)
                if (x instanceof myPromise) {
                    x.then(
                        (data) => {
                            resolve(data)
                        },
                        (reason) => {
                            reject(reason)
                        }
                    )
                } else {
                    resolve(x)
                }
            }
            fn.call(undefined, resolve, reject)
        }
        then(f1, f2) {
            this.queue.push([f1, f2])
        }
    }
    const promise1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('hi')
        }, 3000)

    })
    promise1.then(
        (data) => console.log(data), 
        (reason) => console.error(reason)
        ).then(
            () => console.log('f3'),
            () => console.error('f4')
        )
}