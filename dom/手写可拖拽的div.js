let dragging = false
let position = null

const divDom = document.getElementById('app')
divDom.addEventListener('mousedown', (e) => {
    console.log('mounsedown', e)
    dragging = true
    position = [e.clientX, e.clientY]
})
document.addEventListener('mousemove', (e) => {
    if (dragging === false) return
    console.log(e)
    const x = e.clientX
    const y = e.clientY
    const deltaX = x - position[0]
    const deltaY = y - position[1]
    const left = parseInt(divDom.style.left || 0)
    const top = parseInt(divDom.style.top || 0)
    divDom.style.left = left + deltaX + 'px'
    divDom.style.top = top + deltaY + 'px'
    position = [x, y]
})

document.addEventListener('mouseup', (e) => {
    dragging = false
})
