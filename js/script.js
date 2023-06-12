/*JS */






const saveData = () => {



    let inputName = document.getElementById("name").value;
    let inputDificultad = valorActivo = document.querySelector('input[name="radioButton"]:checked').value;



console.log(`inputName ${inputName}`)

console.log(`dificultad ${inputDificultad}`)


sessionStorage.setItem("nombre", inputName);
sessionStorage.setItem("dificultad", inputDificultad);

window.location.href = "../pages/mastermind.html";

}