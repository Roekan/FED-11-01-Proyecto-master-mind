/*JS */


let name = document.getElementById("name");
let level = document.getElementById("level");

let nameSession = `${sessionStorage.getItem("nombre")}`;
let levelSessionType = `${sessionStorage.getItem("dificultad")}`;

let levelSession ='';
let quantityRows=0;
let quantityColours=0;
let board = document.getElementById('board');

let arrayColours=['red','blue','yellow','green','purple','orange']


switch (levelSessionType){
    case '1':
        levelSession="Fácil";
        quantityRows=10;
        quantityColours=4;
        break;
    case '2':
        levelSession="Medio";
        quantityRows=8;
        quantityColours=5;
        break;
    case '3':
        levelSession="Difícil";
        quantityRows=6;
        quantityColours=6;
        break;
    default:
        levelSession="No especificado";
}

name.innerHTML = `<span class="texto-info-user">Jugador: </span> <span class="param-info-user">${nameSession}</span> `;
level.innerHTML = `<span class="texto-info-user">Nivel: </span> <span class="param-info-user">${levelSession}</span> `;






for(let i=1;i<=quantityRows;i++){

    board.innerHTML+=`
    <div id="row-${i}" class="container-fluid d-flex">
        <div class="clues me-3">
            <div class="clue d-flex justify-content-center align-items-center"></div>
            <div class="clue"></div>
            <div class="clue"></div>
            <div class="clue"></div>
        </div>
        <div class="col row-board d-flex">
            <div class="chip"></div>
            <div class="chip"></div>
            <div class="chip"></div>
            <div class="chip"></div>
        </div>
        <div class="col row-board d-flex">
            <button onclick="checkColours()" class="border border-0 bg-dark p-1 ${i==quantityRows?'d-flex':'d-none'}"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="#fff" d="m10.6 16.2l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4l4.25 4.25ZM5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.588 1.413T19 21H5Zm0-2h14V5H5v14ZM5 5v14V5Z"></path></svg></button>
        </div>
    </div> `;

}


const checkColours=()=>{
    console.log('furrula')
}