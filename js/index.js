
let gameTitle=document.getElementById('game-title')
let btnStartGame=document.getElementById('btn-start-game')
let btnStartInstructions=document.getElementById('btn-start-instructions')
let divBtnStartGame=document.getElementById('box-btn-start-game')
let divBtnStartInstructions=document.getElementById('box-btn-start-instructions')


// Funcion añadida en HTML con onclick (Esta función se activará cuando hagamos click en los botones html)
const animationTitle=(url) =>{
    // Elimino la clase con la animacion que sale al iniciar la página
    gameTitle.classList.remove('game-title-animation-load')
    // Añado la clase com la animacion que sale al hacer click
    gameTitle.classList.add('game-title-animation-click')


    // Elimino la clase con la animacion que sale al iniciar la página
    divBtnStartInstructions.classList.remove('box-btn')
    // Elimino la clase con la animacion que sale al iniciar la página
    divBtnStartGame.classList.remove('box-btn')

    // Añado la clase com la animacion que sale al hacer click
    btnStartGame.classList.add('buttons-title-animation-click')
    // Añado la clase com la animacion que sale al hacer click
    btnStartInstructions.classList.add('buttons-title-animation-click')
    
    window.setTimeout(() =>  {
        window.location.href=url
    },1000); // Le añado un tiempo de espera de 1 segundo para que deje al usuario ver la animacion antes de redirigir la página
    


    // Resumiendo los comentarios de abajo (Dejo todas las clases como estaban al cargar la página)
    window.setTimeout(() =>  {
        // Añado la clase com la animacion que sale al cargar
        gameTitle.classList.add('game-title-animation-load')
        // Elimino la clase con la animacion que sale al hacer click
        gameTitle.classList.remove('game-title-animation-click')


        // Añado la clase com la animacion que sale al cargar
        divBtnStartInstructions.classList.add('box-btn')
        // Añado la clase com la animacion que sale al cargar
        divBtnStartGame.classList.add('box-btn')

        // Elimino la clase con la animacion que sale al hacer click
        btnStartGame.classList.remove('buttons-title-animation-click')
        // Elimino la clase con la animacion que sale al hacer click
        btnStartInstructions.classList.remove('buttons-title-animation-click')

    },2000); // Le añado un tiempo de espera de 1 segundo para que deje al usuario ver la animacion antes de redirigir la página

}
