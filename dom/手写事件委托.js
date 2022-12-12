/**
 * 手写事件委托
 * vue react框架都会自动帮我们事件委托到根元素
 * 优点：
 * 1、节省监听器
 * 2、可以动态监听， ul中暂时没有li， 如果要监听 可以先监听ul， 等li填充之后可以直接用
 * 缺点：
 * 1、调试比较复杂， 有时候不知道改元素有多少事件监听
 */

/**
 * 方法1: 
 */
{

    const ul = document.getElementsByTagName('ul')
    ul.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() === 'li') {
            () => {
                console.log('事件委托')
            }
        }
        // 问题： 如果li内部还有span， 点击span的时候不会触发。
    })

}


/**
 * 方法2: 高级无bug版 
 * 思路是点击 span 后，递归遍历 span 的祖先元素看其中有没有 ul 里面的 li。
 */
{
    function delegation(element, eventType, selector, fn) {
        element.addEventListener(eventType, e => {
            let el = e.target
            while (!el.matches(selector)) {
                if (element === el) {
                    el = null
                    break
                }
                el = el.parentNode
            }
            el && fn.call(el, e, el)
        })
        return element
    }
}

