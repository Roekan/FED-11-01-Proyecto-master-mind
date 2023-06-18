/*JS */

/*////////////////////VARIABLES //////////////////////*/

//Variables necesarias para empezar la partida
let name = document.getElementById("name");
let level = document.getElementById("level");
let nameSession = sessionStorage.getItem("nombre");
let levelSessionType = sessionStorage.getItem("dificultad");
let arrayColours = JSON.parse(sessionStorage.getItem("colores"));

let levelSession = "";
let quantityRows = 0;
let quantityColours = 0;
//elemento tablero
let boxBoard = document.getElementById("boxBoard");
let board = document.getElementById("board");
const quantityChips = 4;

//Array de colores de usuario en cada fila
let coloursUser = {};
//Array de colores del BOSS
let coloursBoss = {};
//Fila activa en la que jugamos
let activeRow = 0;

/*////////////////////END VARIABLES //////////////////////*/

/*/////////////////FUNCIONES//////////////////// */

// FUNCION para checkear los colores de cada jugada cuando clique en el check
const checkColours = () => {
  //obtener los colores de las chips (Los obtengo  en RGB)
  Array.from(
    document.getElementById(`row-${activeRow}`).getElementsByClassName("chip")
  ).forEach((element, i) => {
    //Transformo el color a Hexadecimal
    coloursUser[i + 1] = rgbToHex(element.style.backgroundColor);
  });

  console.log(coloursUser); ////QUITAR AL FINAL

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //comprobar colores con objeto colorBoss y pintar las clues

  //Copia de coloursBoss para contar primero las clues negras y luego las blancas
  let objectBossCopy = { ...coloursBoss };
  let objectUserCopy = { ...coloursUser };
  let arrayClues = [];

  //Comprobar cuantas Fichas negras hemos obtenido en la jugada
  Object.keys(objectBossCopy).forEach((chip) => {
    if (objectUserCopy[chip] && objectUserCopy[chip] === objectBossCopy[chip]) {
      console.log("fichaNegra"); ////QUITAR AL FINAL
      delete objectBossCopy[chip];
      delete objectUserCopy[chip];
      arrayClues.push("red");
    }
  });
    //Comprobar cuantas Fichas blancas hemos obtenido en la jugada
  Object.keys(objectBossCopy).forEach((chipBoss) => {
    Object.keys(objectUserCopy).forEach((chipUser) => {
      if (objectUserCopy[chipUser] && objectUserCopy[chipUser] === objectBossCopy[chipBoss]) {
        console.log("fichaBlanca"); ////QUITAR AL FINAL
        delete objectBossCopy[chipBoss];
        delete objectUserCopy[chipUser];
        arrayClues.push("white");
      }
    });
  });

let cluesHTML = Array.from(document.getElementById(`row-${activeRow}`).getElementsByClassName('clue'));

cluesHTML.forEach((clue, i) => {
    if(arrayClues[i]){
        clue.style.background=arrayClues[i]
    }  
});


if(arrayClues.length==quantityChips && !arrayClues.includes('white') ){

    const myModal = new bootstrap.Modal(document.getElementById('myModal'))

    // const myModal = new bootstrap.Modal('#myModal', {
    //     keyboard: false
    //   })

    console.log('Has ganado')

    myModal.show()


   
}












  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Cambiar de active row
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Elimina el evento en la fila
  eraseEventColours();
  // Elimina el icono del check
  document.getElementById(`check-${activeRow}`).classList.remove("d-flex");
  document.getElementById(`check-${activeRow}`).classList.add("d-none");
  // Cambiamos la posicion de la fila activa
  activeRow = activeRow - 1;
  if (activeRow < 1) {
    // Si es la ultima fila (el ultimo intento), mostramos mensaje de que ha perdido
    console.log(
      "////////////////////////////////////HAS PERDIDO//////////////////////////////////////"
    ); ////QUITAR AL FINAL
  } else {
    //Si no es la ultima fila hacemos visible el boton del check
    document.getElementById(`check-${activeRow}`).classList.remove("d-none");
    document.getElementById(`check-${activeRow}`).classList.add("d-flex");
    //Añadimos la funcion para que los chips cambien de color al hacer click
    changeColours();
  }
};

//FUNCION que genera un color del arrayde colores aleatorio
const getRandomColor = (arrColours) =>
  arrColours[Math.floor(Math.random() * arrColours.length)];

//FUNCION Convertir color RGB a Hexadecimal
function rgbToHex(col) {
  if (col.charAt(0) == "r") {
    col = col.replace("rgb(", "").replace(")", "").split(",");
    var r = parseInt(col[0], 10).toString(16);
    var g = parseInt(col[1], 10).toString(16);
    var b = parseInt(col[2], 10).toString(16);
    r = r.length == 1 ? "0" + r : r;
    g = g.length == 1 ? "0" + g : g;
    b = b.length == 1 ? "0" + b : b;
    var colHex = "#" + r + g + b;
    return colHex;
  }
}

//FUNCION  cambiar los colores al hacer click
function eventListenerChangeColor(e) {
  // Si no hay color ponme el primero
  if (!e.target.style.backgroundColor) {
    e.target.style.backgroundColor = arrayColours[0];
  } else {
    const indexColor = arrayColours.findIndex(
      (color) => color === rgbToHex(e.target.style.backgroundColor)
    );
    e.target.style.backgroundColor =
      indexColor == quantityColours - 1
        ? //Si hay color y es el ultimo del array, ponme el primer color
          arrayColours[0]
        : //Si hay color pero no es el ultimo ponme el siguiente color del array
          arrayColours[indexColor + 1];
  }
}

//FUNCION Añadir funcionalidad evento onclick al la fila para que cambie de color
const changeColours = () => {
  Array.from(
    document.getElementById(`row-${activeRow}`).getElementsByClassName("chip")
  ).forEach((element) => {
    element.style.cursor = "pointer";
    element.addEventListener("click", eventListenerChangeColor);
  });
};

//FUNCION Borrar evento de la fila
const eraseEventColours = () => {
  Array.from(
    document.getElementById(`row-${activeRow}`).getElementsByClassName("chip")
  ).forEach((element) => {
    element.removeEventListener("click", eventListenerChangeColor);
    element.style.cursor = "auto";
  });
};
/*/////////////////END FUNCIONES//////////////////// */

///////////////////////////////CÓDIGO//////////////////////////////////
//Genero la jugada del BOSS
for (let i = 1; i <= quantityChips; i++) {
  coloursBoss[i] = getRandomColor(arrayColours);
}
console.log(`Colores de la máquina: `, coloursBoss); ////COMPROBACION COLORES BOSS
//Genero la cantidad de filas y colores segun la dificultad que recibo de settings
switch (levelSessionType) {
  case "1":
    levelSession = "Fácil";
    quantityRows = 10;
    quantityColours = 4;
    boxBoard.classList.add("boxBoard-easy");
    break;
  case "2":
    levelSession = "Medio";
    quantityRows = 8;
    quantityColours = 5;
    boxBoard.classList.add("boxBoard-medium");
    break;
  case "3":
    levelSession = "Difícil";
    quantityRows = 6;
    quantityColours = 6;
    boxBoard.classList.add("boxBoard-hard");
    break;
  default:
    levelSession = "No especificado";
}
activeRow = quantityRows;

//Pinta Nombre del jugador y dificultad de la partida
name.innerHTML = `<span class="texto-info-user">Jugador: </span> <span class="param-info-user">${nameSession}</span> `;
level.innerHTML = `<span class="texto-info-user">Nivel: </span> <span class="param-info-user">${levelSession}</span> `;

//Pinta las filas segun la dificultad seleccionada
for (let i = 1; i <= quantityRows; i++) {
  board.innerHTML += `
    <div id="row-${i}" class="container-fluid d-flex">
        <div class="clues me-3">
            <div class="clue"></div>
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
            <button onclick="checkColours()" id=check-${i} class="border border-0 p-1 align-items-center justify-content-center ${
    i == quantityRows ? "d-flex" : "d-none"
  } box-check"><svg class="check-img" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path fill="#fff" d="m10.6 16.2l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4l4.25 4.25ZM5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.588 1.413T19 21H5Zm0-2h14V5H5v14ZM5 5v14V5Z"></path></svg></button>
        </div>
    </div> `;
}
changeColours();
