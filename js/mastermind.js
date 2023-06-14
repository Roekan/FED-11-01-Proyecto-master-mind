/*JS */


/*Variables */
let name = document.getElementById("name");
let level = document.getElementById("level");
let nameSession = sessionStorage.getItem("nombre");
let levelSessionType = sessionStorage.getItem("dificultad");
let arrayColours = JSON.parse(sessionStorage.getItem("colores"));

let levelSession ='';
let quantityRows=0;
let quantityColours=0;
let board = document.getElementById('board');
const quantityChips = 4;
//CREA EL OBJETO CON COLORES ALEATORIOS DE LA MÁQUINA
let coloursUser = {}
let coloursBoss = {}
let activeRow = 0




// Funciones
// Checkear los colores de cada jugada cuando clique en el check
const checkColours=()=>{
//obtener los colores de las chips
Array.from(document.getElementById(`row-${activeRow}`).getElementsByClassName('chip')).forEach((element,i)=>{
    coloursUser[i+1] = rgbToHex(element.style.backgroundColor)
})


//comprobar colores con objeto colorBoss y pintar las clues
//cambiar de activeRow

eraseEventColours()
document.getElementById(`check-${activeRow}`).classList.remove('d-flex')
document.getElementById(`check-${activeRow}`).classList.add('d-none')
activeRow=activeRow-1;
if(activeRow<1){
    console.log('////////////////////////////////////HAS PERDIDO//////////////////////////////////////')
}else{
    document.getElementById(`check-${activeRow}`).classList.remove('d-none')
    document.getElementById(`check-${activeRow}`).classList.add('d-flex')
    changeColours()
}



//comprobar que el active-row no sea =0
//  

}

//genera un color del array aleatorio
const getRandomColor=(arrColours)=>arrColours[Math.floor(Math.random()*arrColours.length)];

//Convertir color RGB a Hexadecimal
function rgbToHex(col)
{
    if(col.charAt(0)=='r')
    {
        col=col.replace('rgb(','').replace(')','').split(',');
        var r=parseInt(col[0], 10).toString(16);
        var g=parseInt(col[1], 10).toString(16);
        var b=parseInt(col[2], 10).toString(16);
        r=r.length==1?'0'+r:r; g=g.length==1?'0'+g:g; b=b.length==1?'0'+b:b;
        var colHex='#'+r+g+b;
        return colHex;
    }
}

//CAMBIAR DE COLOR CADA CHIP

//cambiar colores al hacer click
function eventListenerChangeColor(e) {
    if(!e.target.style.backgroundColor){
        e.target.style.backgroundColor = arrayColours[0];     
            }else{
                const indexColor= arrayColours.findIndex(color=> color===rgbToHex(e.target.style.backgroundColor)) 
                if(indexColor!=-1){
                    e.target.style.backgroundColor = indexColor==quantityColours-1 ? arrayColours[0] : arrayColours[indexColor+1]
                }
            }
}
const changeColours=()=>{
    //Añadir evento onclick para que cambie de color
    Array.from(document.getElementById(`row-${activeRow}`).getElementsByClassName('chip')).forEach(element=>{
        element.style.cursor='pointer'
        element.addEventListener('click', eventListenerChangeColor)
    })
}


//Borrar evento de la fila anterior
const eraseEventColours=()=>{
    Array.from(document.getElementById(`row-${activeRow}`).getElementsByClassName('chip')).forEach(element=>{
        element.removeEventListener('click', eventListenerChangeColor)
        element.style.cursor='auto';
    })
}
//ENDFunciones




///////////////////////////////Código



for(let i=1;i<=quantityChips;i++){
    coloursBoss[i]=getRandomColor(arrayColours);

}

console.log(`Colores de la máquina: `, coloursBoss)
//let arrayColours=['red','blue','yellow','green','purple','orange']



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
activeRow=quantityRows


//Pinta Nombre del jugador y dificultad de la partida
name.innerHTML = `<span class="texto-info-user">Jugador: </span> <span class="param-info-user">${nameSession}</span> `;
level.innerHTML = `<span class="texto-info-user">Nivel: </span> <span class="param-info-user">${levelSession}</span> `;
//Pinta las filas segun la dificultad seleccionada
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
            <div class="chip chip-vacio"></div>
            <div class="chip chip-vacio"></div>
            <div class="chip chip-vacio"></div>
            <div class="chip chip-vacio"></div>
        </div>
        <div class="col row-board d-flex">
            <button onclick="checkColours()" id=check-${i} class="border border-0 bg-dark p-1 ${i==quantityRows?'d-flex':'d-none'}"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="#fff" d="m10.6 16.2l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4l4.25 4.25ZM5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.588 1.413T19 21H5Zm0-2h14V5H5v14ZM5 5v14V5Z"></path></svg></button>
        </div>
    </div> `;

}
changeColours()














