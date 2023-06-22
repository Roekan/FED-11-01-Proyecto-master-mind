let gameTitle=document.getElementById('game-title')
let btnStartGame=document.getElementById('btn-start-game')
let btnStartInstructions=document.getElementById('btn-start-instructions')

const animationTitle=(url) =>{
    

    gameTitle.classList.remove('game-title-animation-load')
    gameTitle.classList.add('game-title-animation-click')
    btnStartGame.classList.add('buttons-title-animation-click')
    btnStartInstructions.classList.add('buttons-title-animation-click')

    window.setTimeout(() =>  {
        gameTitle.classList.add('game-title-animation-load')
        gameTitle.classList.remove('game-title-animation-click')
        btnStartGame.classList.remove('buttons-title-animation-click')
        btnStartInstructions.classList.remove('buttons-title-animation-click')

        window.location.href=url
    },1000); 
    
}
