let gameTitle=document.getElementById('game-title')
let btnStartGame=document.getElementById('btn-start-game')
let btnStartInstructions=document.getElementById('btn-start-instructions')
let divBtnStartInstructions=document.getElementById('box-btn-start-instructions')

const animationTitle=(url) =>{
    

    gameTitle.classList.remove('game-title-animation-load')
    gameTitle.classList.add('game-title-animation-click')

    divBtnStartInstructions.classList.remove('box-title')
    btnStartGame.classList.add('buttons-title-animation-click')
    btnStartInstructions.classList.add('buttons-title-animation-click')
    
    window.setTimeout(() =>  {
        window.location.href=url
    },1000); 
   
    window.setTimeout(() =>  {
        gameTitle.classList.add('game-title-animation-load')
        gameTitle.classList.remove('game-title-animation-click')

        divBtnStartInstructions.classList.add('box-title')
        btnStartGame.classList.remove('buttons-title-animation-click')
        btnStartInstructions.classList.remove('buttons-title-animation-click')

    },2000); 

}
