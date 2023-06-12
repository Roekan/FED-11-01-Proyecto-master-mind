/*JS */


let nombre = document.getElementById("nombre");
let dificultad = document.getElementById("dificultad");

let name = `${sessionStorage.getItem("nombre")}`;
let dificult = `${sessionStorage.getItem("dificultad")}`;



nombre.innerHTML = name;
dificultad.innerHTML = dificult;

