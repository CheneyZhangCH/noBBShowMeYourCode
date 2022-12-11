/*
手写节流: 技能冷却中
*/ 
{

    const blink = () => {
        console.log('闪现')
    }

    let coolDownFlag = false
    let timer = null

    if (coolDownFlag === true) return
    coolDownFlag = true
    blink()

    timer = setTimeout(() => {
        coolDownFlag = false
    }, 10 * 10000)

    const throttle1 = (fn, timeout, asThis) => {
        let coolDownFlag = false
        let timer = null
        return (...args) => {
            if (coolDownFlag) return
            coolDownFlag = true
            fn.call(asThis, ...args)
            timer = setTimeout(() => {
                coolDownFlag = false
            }, timeout)
        }
    }

    const throttle2 = (fn, timeout, asThis) => {
        let timer = null
        return (...args) => {
            if (timer) return
            fn.call(asThis, ...args)
            timer = setTimeout(() => {
                timer = null
            }, timeout)
        }
    }
}

/*
手写防抖 技能被打断之后重新发起
*/ 
{
    const f = () => {
        console.log('开始回程')
    }
    let time = null
    const x = (fn, timeout) => {
        if (time) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn()
            timer = null
        }, timeout)
    }

    const debounce = (fn, timeout, asThis) => {
        let timer = null
        return (...args) => {
            if(timer) clearTimeout(timer)
            timer = setTimeout(() => {
                fn.call(asThis, ...args)
                timer = null
            }, timeout)
        }
    }
    const tp = debounce(f)
}