 
let generationSpeed = 800
let popCounter = 0
let balloonsGenerated = 0
let gameover = false
const balloonClases = ['red', 'green', 'blue', 'yellow', 'violet']
const gameCounter = document.getElementById('counter-game')
const failCounter = document.getElementById('counter-fail')
const winCounter = document.getElementById('counter-win')
const restartButton = document.getElementById('restart')
const closeButton = document.getElementById('close')

restartButton.addEventListener('click', () => {
    window.location.reload()
})

closeButton.addEventListener('click', () => {
    window.close()
})

const modal = document.querySelector('.modal-wrapper')

let balloons = document.querySelectorAll(".balloon")
const audio =  document.getElementsByTagName('audio')


const popBalloon = (element) => {
    element.remove()
    popCounter++
    if (popCounter % 2 === 0 )
        generationSpeed /= 1.1    
    audio[1].play()
    gameCounter.textContent = ` ${popCounter} `
}
const createBalloon = () => {
    let newBalloon = document.createElement('div')
    const randomIndex = Math.floor(Math.random() * balloonClases.length)
    const randomPosition = Math.floor(Math.random() * (window.innerWidth - 100))
    let balloonColor = balloonClases[randomIndex] 
    newBalloon.classList.add('balloon', balloonColor)
    newBalloon.style.backgroundImage = `url("Materials/images/balloon-${balloonColor}.png")`
    newBalloon.style.top = '100%'
    newBalloon.style.left = `${randomPosition}px`
    newBalloon.addEventListener('click', e => popBalloon(e.target))
    document.body.appendChild(newBalloon)
}


const endGame = (item, top, popCounter) => {
    if (top <= -50){
        modal.classList.replace('modal-wrapper', 'fail-active')
        failCounter.textContent = ` ${popCounter} `
        gameover = true
    }
    else if (popCounter === 100){
        winCounter.textContent = ` ${popCounter} `
        modal.classList.replace('modal-wrapper', 'win-active')
        gameover = true
    }
}


const poolingSpeed = 10 //the interval in which the ballon is moved in miliseconds
let balloonSpeed = {
    blueSpeed: 0.1, 
    redSpeed: 0.15,
    violetSpeed: 0.13,
    greenSpeed: 0.05,
    yellowSpeed: 0.08,
}

const animateBalloon = (item) => {
    let top = item.style.top.substring(0,item.style.top.indexOf('%'))
    switch (item.classList[1]){
        case 'blue':
            top -= balloonSpeed.blueSpeed
            break     
        case 'yellow':
            top -= balloonSpeed.yellowSpeed
            break
        case 'green':
            top -= balloonSpeed.greenSpeed
            break
        case 'violet':
            top -= balloonSpeed.violetSpeed
            break
        case 'red':
            top -= balloonSpeed.redSpeed
        default:
            top
    }
    if (top < -70)
        item.remove()
    item.style.top = `${top}%`
    endGame(item, top, popCounter)
}


let randGenerate = 0
const startGame = () => {
    let int1 = setInterval( () => {
        randGenerate = Math.floor(Math.random() * 600)
        createBalloon()
        balloons = document.querySelectorAll(".balloon")
        }, generationSpeed + randGenerate )
    let int2 = setInterval(() => {
            balloons.forEach(item => {
                animateBalloon(item)
                }
            )
        }, poolingSpeed)
    if (gameover){
        clearInterval(int1)
        clearInterval(int2)
    }        
}
window.onload = startGame()
