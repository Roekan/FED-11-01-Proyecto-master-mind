/*JS */

let levelSelected  = document.querySelector('input[name="radioButton"]:checked').value;
let coloursBoard = document.getElementById('coloursBoard');

//console.log(levelSelected)
let colours = 4;



for(let i=1;i<=colours;i++){
    coloursBoard.innerHTML+=`
    <div class="col-12 col-md-2 d-flex justify-content-center align-items-center box-colorpicker">
                    <input class="color" type="color">
    </div>`;
}




const changeColours=() =>{
    let levelSelected = valorActivo = document.querySelector('input[name="radioButton"]:checked').value;

    switch (levelSelected){
        case '1':
            colours = 4;
        break;
        case '2':
            colours = 5;
        break;
        case '3':
            colours = 6;
        break;
    }
    coloursBoard.innerHTML=""
    for(let i=1;i<=colours;i++){
        coloursBoard.innerHTML+=`
        <div class="col-12 col-md-2 d-flex justify-content-center align-items-center box-colorpicker"><input  type="color" class="color"></div>`;
    }
}






const saveData = () => {
    let inputName = document.getElementById("name").value;
    let inputDificultad = valorActivo = document.querySelector('input[name="radioButton"]:checked').value;
    let colorCollection = document.getElementsByClassName("color");
    //Transformar HTMLCollection a un Array
    let arrayColours = Array.from(colorCollection).map(item=>item.value);
//

sessionStorage.setItem("nombre", inputName);
sessionStorage.setItem("dificultad", inputDificultad);
sessionStorage.setItem("colores", JSON.stringify(arrayColours));

window.location.href = "../pages/mastermind.html";

}