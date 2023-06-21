/*JS */

let levelSelected  = document.querySelector('input[name="radioButton"]:checked').value;
let coloursBoard = document.getElementById('coloursBoard');

//console.log(levelSelected)
let colours = 4;






const createColours=()=>{
    for(let i=1;i<=colours;i++){
        var randomColor = (`${Math.floor(Math.random()*16777215).toString(16)}`)
        if(randomColor.length<6){
            while(randomColor.length<6){
                randomColor = '0' + randomColor;
            }
        }
        coloursBoard.innerHTML+=`
        <div class="col-12 col-md-2 d-flex justify-content-center align-items-center box-colorpicker">
                        <input value="#${randomColor}" class="color" type="color">
        </div>`;
    }
}
createColours()

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
    createColours()
}






const saveData = () => {
    let inputName = document.getElementById("name").value;
    let inputDificultad = valorActivo = document.querySelector('input[name="radioButton"]:checked').value;
    let colorCollection = document.getElementsByClassName("color");
    //Transformar HTMLCollection a un Array

    // let arrayColours = Array.from(colorCollection).map(item=>item.value);



    let arrayColours = []
    let msgError = document.getElementById('msg-error');
    Array.from(colorCollection).map(item=>{
        if(!arrayColours.includes(item.value)){
            arrayColours.push(item.value)
        }
    });
    


    if(arrayColours.length ==colours && inputName!=''){

        sessionStorage.setItem("nombre", inputName);
        sessionStorage.setItem("dificultad", inputDificultad);
        sessionStorage.setItem("colores", JSON.stringify(arrayColours));
        
        window.location.href = "../pages/mastermind.html";

    }else if(inputName==''){
        msgError.innerHTML='Debes escribir un nombre para jugar'
    }else{
        msgError.innerHTML='No puede haber colores repetidos, <br> sería demasiado fácil'

    }
//






}