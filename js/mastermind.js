/*JS */


let nombre = document.getElementById("nombre");
let dificultad = document.getElementById("dificultad");

let name = `${sessionStorage.getItem("nombre")}`;
let dificult = `${sessionStorage.getItem("dificultad")}`;

let nivel ='';
switch (dificult){
    case '1':
        nivel="Fácil";
        break;
    case '2':
        nivel="Medio";
        break;
    case '3':
        nivel="Difícil";
        break;
    default:
        nivel="No especificado";
}



nombre.innerHTML = `<span class="texto-info-user">Jugador: </span> <span class="param-info-user">${name}</span> `;
dificultad.innerHTML = `<span class="texto-info-user">Nivel: </span> <span class="param-info-user">${nivel}</span> `;

