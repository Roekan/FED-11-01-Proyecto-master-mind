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
let boxGame = document.getElementById("boxGame");
let board = document.getElementById("board");
const quantityChips = 4;

//Array de colores de usuario en cada fila
let coloursUser = {};
//Array de colores del BOSS
let coloursBoss = {};
//Fila activa en la que jugamos
let activeRow = 0;
//Boton del modal para volver a jugar
let reload = document.getElementById("reload");

//Div que muestra los intentos restantes
let attemptsHTML = document.getElementById("attempts");

/*//////////////////// END VARIABLES ////////////////////*/


/*//////////////////// FUNCIONES ////////////////////*/

///// FUNCION para checkear los colores de cada jugada cuando clique en el check /////
const checkColours = () => {
  //Obtener los colores de las chips (Los obtengo  en RGB)
  Array.from(
    document.getElementById(`row-${activeRow}`).getElementsByClassName("chip")
  ).forEach((element, i) => {
    //Transformo el color a Hexadecimal
    coloursUser[i + 1] = rgbToHex(element.style.backgroundColor);
  });


  //--Comprobar los colores de Usuario con los del Boss
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
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
      if (
        objectUserCopy[chipUser] &&
        objectUserCopy[chipUser] === objectBossCopy[chipBoss]
      ) {
        console.log("fichaBlanca"); ////QUITAR AL FINAL
        delete objectBossCopy[chipBoss];
        delete objectUserCopy[chipUser];
        arrayClues.push("white");
      }
    });
  });

  //Pintar las pistas (negras y blancas) para que las vea el usuario
  let cluesHTML = Array.from(
    document.getElementById(`row-${activeRow}`).getElementsByClassName("clue")
  );
  cluesHTML.forEach((clue, i) => {
    if (arrayClues[i]) {
      clue.style.background = arrayClues[i];
    }
  });

  //--Cambiar de fila activa
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
    endGame(
      '<h3><span class="span-modal lh-1">Game over</span><br>¡¡Te has quedado sin intentos!!</h3>'
    );
  } else if (
    arrayClues.length == quantityChips &&
    !arrayClues.includes("white")
  ) {
    //Si todas las pistas son negras es que ha ganado
    endGame(
      '<h3><span class="span-modal lh-1">Enhorabuena</span><br> ¡¡has ganado esta partida!!</h3>'
    );
  } else {
    createRow();
    attemptsHTML.innerHTML = `<span class="text-info-user">Intentos restantes: </span> <span class="param-info-user">${activeRow}</span> `;
    //Si no es la ultima fila hacemos visible el boton del check
    document.getElementById(`check-${activeRow}`).classList.remove("d-none");
    document.getElementById(`check-${activeRow}`).classList.add("d-flex");
    //Añadimos la funcion para que los chips cambien de color al hacer click
    changeColours();
  }
};


/////FUNCION crear filas/////
const createRow = () => {
  let arrayAnimations = [
    "animation-enter-row-bounce",
    "animation-enter-row-scale",
    "animation-enter-row-swing",
    
  ];
  //Creo el elemento div
  let row = document.createElement("div");
  let before = document.getElementById(`row-${activeRow + 1}`);
  //Añado las clases
  row.classList.add(
    "container-fluid",
    "d-flex",
    "py-1",
    "my-3",
    "border",
    "rounded-1",
    "bg-row",
    arrayAnimations[Math.floor(Math.random() * arrayAnimations.length)]
  );
  //Añado una id con el valor de la fila actual
  row.setAttribute("id", `row-${activeRow}`);
  //Añado el HTML que va dentro de la fila (clues,chips y check)
  row.innerHTML += `
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
              <button onclick="checkColours()" id=check-${activeRow} class="border border-0 p-1 align-items-center justify-content-center 
              ${activeRow == quantityRows ? "d-flex" : "d-none"}         
              box-check"><svg class="check-img" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path fill="#fff" d="m10.6 16.2l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4l4.25 4.25ZM5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.588 1.413T19 21H5Zm0-2h14V5H5v14ZM5 5v14V5Z"></path></svg></button>
          </div>`;
  //Añado la fila al tablero
  board.insertBefore(row, before);
};


/////FUNCION terminar partida (Muestro mensaje en modal y muestro colores del boss)/////
const endGame = (mensaje) => {
  const myModal = new bootstrap.Modal(document.getElementById("myModal"));
  const modal = document.getElementById("endGame");
  // Muestro la ventana modal
  myModal.show();
  // Añado el mensaje pasado por parametro (Ganado o Perdido)
  modal.innerHTML = mensaje;
  // Añado la clase al mensaje
  modal.classList.add("messageModal");

  // Muestro en el apartado de "Intentos restantes el boton para volver a jugar"
  attemptsHTML.innerHTML = `<button id="reload" onClick="reload()" type="button" class="btn p-3 btn-primary btn-play-again-user"><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path  d="M2 12a9 9 0 0 0 9 9c2.39 0 4.68-.94 6.4-2.6l-1.5-1.5A6.706 6.706 0 0 1 11 19c-6.24 0-9.36-7.54-4.95-11.95C10.46 2.64 18 5.77 18 12h-3l4 4h.1l3.9-4h-3a9 9 0 0 0-18 0Z"></path></svg> Nueva partida</button> `;
  // Elimino la clase info-user-game para que desaparezca el fondo del div
  attemptsHTML.classList.remove("info-user-game");
  // Muestro los colores del BOSS
  showBossColours();
};


//FUNCION mostrar datos del BOSS
const showBossColours = () => {
  //Recorro el array de colores del BOSS
  Object.keys(coloursBoss).forEach((color) => {
    let chip = document.getElementById(`boss-color-${color}`);
    // Añado a cada chip el fondo con el color del BOSS por cada circulo
    chip.style.backgroundColor = coloursBoss[color];
  });
};


//FUNCION que genera un color del array de colores aleatorio
const getRandomColor = (arrColours) => arrColours[Math.floor(Math.random() * arrColours.length)];


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
        ? // Si hay color y es el ultimo del array, ponme el primer color
          arrayColours[0]
        : // Si hay color pero no es el ultimo ponme el siguiente color del array
          arrayColours[indexColor + 1];
  }
}


//FUNCION Añadir funcionalidad evento onclick al la fila para que cambie de color
const changeColours = () => {
  Array.from(
    // Recorremos el array de chips de la fila en la que estamos
    document.getElementById(`row-${activeRow}`).getElementsByClassName("chip")
  ).forEach((element) => {
    // Añade el estilo "pointer" para mostrar al usuario que es clicable
    element.style.cursor = "pointer";
    // Añade el evento onclick con la funcion para cambiar los colores
    element.addEventListener("click", eventListenerChangeColor);
  });
};


//FUNCION Borrar evento de la fila
const eraseEventColours = () => {
  Array.from(
    // Recorremos el array de chips de la fila en la que estamos
    document.getElementById(`row-${activeRow}`).getElementsByClassName("chip")
  ).forEach((element) => {
    // Elimina el evento para que no se pueda cambiar de color
    element.removeEventListener("click", eventListenerChangeColor);
    // Eliminamos el estilo pointer para que deje de verse como clicable
    element.style.cursor = "auto";
  });
};


//FUNCION recargar página
reload = () => {
  location.reload();
};
/*//////////////////// END FUNCIONES ////////////////////*/

/*//////////////////// CÓDIGO ////////////////////*/

//Genero la jugada del BOSS
for (let i = 1; i <= quantityChips; i++) {
  // Por cada posicion del array colourBoss añado un color aleatorio del arrayColours(Los elegidos por el usuario en la página de settings)
  coloursBoss[i] = getRandomColor(arrayColours);
}

console.log(`Colores de la máquina: `, coloursBoss); ////COMPROBACION COLORES BOSS (Dejo este código para que sea más facil la comprobacion del funcionamiento)

//Genero la cantidad de filas y colores segun la dificultad que recibo de settings
switch (levelSessionType) {
  case "1":
    // Difucultad a mostrar
    levelSession = "Fácil";
    // Cantidad de intentos
    quantityRows = 10;
    // Longitud de arrayColours, cantidad de colores elegidos por el usuario en settings.html
    quantityColours = 4;
    // Añado la clase que contiene el fondo para la dificultad fácil.
    boxGame.classList.add("boxGame-easy");
    break;
  case "2":
    // Difucultad a mostrar
    levelSession = "Medio";
    // Cantidad de intentos
    quantityRows = 8;
    // Longitud de arrayColours, cantidad de colores elegidos por el usuario en settings.html
    quantityColours = 5;
    // Añado la clase que contiene el fondo para la dificultad media.
    boxGame.classList.add("boxGame-medium");
    break;
  case "3":
    // Difucultad a mostrar
    levelSession = "Difícil";
    // Cantidad de intentos
    quantityRows = 6;
    // Longitud de arrayColours, cantidad de colores elegidos por el usuario en settings.html
    quantityColours = 6;
    // Añado la clase que contiene el fondo para la dificultad difícil.
    boxGame.classList.add("boxGame-hard");
    break;
  default:
    // Por seguridad añado un mensaje de que no se ha especificado la dificultad.
    levelSession = "No especificado";
}
// La fila actual es la cantidad de filas actual y para cambiar de fila iremos restando
activeRow = quantityRows;

// Pinta  el nombre del jugador
name.innerHTML = `<span class="text-info-user">Jugador: </span> <span class="param-info-user">${nameSession}</span> `;
// Pinta los intentos restantes (O lo que es igual el numero de la fila en la que nos encontramos)
attemptsHTML.innerHTML = `<span class="text-info-user">Intentos restantes: </span> <span class="param-info-user">${activeRow}</span> `;
// Pinta la dificultad de la partida
level.innerHTML = `<span class="text-info-user">Nivel: </span> <span class="param-info-user">${levelSession}</span> `;

// Pinta la primera fila
createRow();
// Agrega el evento "onclick para que cambien los colores a la primera fila"
changeColours();

/*//////////////////// END CÓDIGO ////////////////////*/