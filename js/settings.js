let levelSelected  = document.querySelector('input[name="radioButton"]:checked').value;
let coloursBoard = document.getElementById('coloursBoard');
let colours = 4;

//FUNCION Genera colores aleatorios para asignarselos al check colors
const createColours=()=>{
    for(let i=1;i<=colours;i++){
        // Obtenemos un color aleatorio en hexadecimal(Numero de 0 a FFFFFF)
        var randomColor = (`${Math.floor(Math.random()*16777215).toString(16)}`)
        // Si el numero resultante tiene menos de 6 cifras de longitud, le añadimos 0 delante hasta obtener el numero de 6 cifras
        // De esta manera evitamos el warning en la conola del navegador (aunque sin esto tambien lo acepta)
        if(randomColor.length<6){
            while(randomColor.length<6){
                randomColor = '0' + randomColor;
            }
        }
        // añadimos a la fila de colores un input color con el valor generado aleatoriamente
        coloursBoard.innerHTML+=`
        <div class="col-12 col-md-2 d-flex justify-content-center align-items-center box-colorpicker">
                        <input value="#${randomColor}" class="color" type="color">
        </div>`;
    }
}
// Inicializo la funcion al iniciar la página con 4 colores ya que por defecto la dificultad es fácil
createColours()



//FUNCION Cambia la cantidad de colorpicker al cambiar la dificultad. La funcion está añadida en el HTML con un evento "onchange"
const changeColours=() =>{
    // Valida cual es el radiobutton que está chequeado
    let levelSelected = valorActivo = document.querySelector('input[name="radioButton"]:checked').value;

    // Segun el valor cambia la cantidad de colores a elegir
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
    // Borra los colorpicker actuales
    coloursBoard.innerHTML=""
    
    // llamamos a la funcion que pinta los colorpicker con la nueva cantidad de colores
    createColours()
}

//FUNCION Guarda los datos en el session storage. La funcion está añadida en el HTML con un evento "onclick"
const saveData = () => {

    let inputName = document.getElementById("name").value;
    let inputDificultad = valorActivo = document.querySelector('input[name="radioButton"]:checked').value;
    let colorCollection = document.getElementsByClassName("color");// Obtenemos un array
    let arrayColours = []
    let msgError = document.getElementById('msg-error');

    // Recorro la coleccion HTML colorCollection
    Array.from(colorCollection).map(item=>{
        // Si arrayColours no contiene el color se lo añado (Verificamos que no haya colores repetidos en el array)
        if(!arrayColours.includes(item.value)){
            arrayColours.push(item.value)
        }
    });
    

    // Si hay colores repetidos la longitud no sera igual a la cantidad de colores ya que no los habremos incluido en el array anteriormente
    // Si el array tiene los colores diferentes y el nombre no está vacío guardaremos los datos en el session Storage
    if(arrayColours.length ==colours && inputName!=''){

        sessionStorage.setItem("nombre", inputName);
        sessionStorage.setItem("dificultad", inputDificultad);
        sessionStorage.setItem("colores", JSON.stringify(arrayColours));
        

        
        window.location.href = "../pages/mastermind.html";

    // Si el nombre está vacío no dejaremos al usuario guardar los datos en el sessionStorage y le mostraremos un mensaje de error para que rellene el nombre
    }else if(inputName==''){
        msgError.innerHTML='<p class="txt-error">Debes escribir un nombre para jugar</p>'
    // Si los colores están repetidos no dejaremos al usuario guardar los datos en el sessionStorage y le mostraremos un mensaje de error para que cambie los colores repetidops
    }else{
        msgError.innerHTML='<p class="txt-error">No puede haber colores repetidos, <br> sería demasiado fácil</p>'

    }
//






}