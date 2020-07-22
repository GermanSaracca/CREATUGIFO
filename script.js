//  CAMBIO DE ICONO - MENU HAMBURGUESA
const burger = document.querySelector('.burger'); 
const nav = document.querySelector('.nav-links');
const icon = document.getElementById("check");
const img = document.getElementById('burgerIcon');


icon.addEventListener("click",()=>{
    nav.classList.toggle('nav-active');
    
    if (check.checked == true){
        img.src = "./images/close.svg";
      }else {
        img.src = "./images/burger.svg";
      } 
})

//  BUSQUEDA DE GIFS 
const lupa = document.getElementById('search');
const lupanueva = document.getElementById("lupa_onclick");
const sugerencia = document.getElementById('suger');
const input_gif = document.getElementById('txt');


input_gif.addEventListener("keyup",()=>{

  //AGREGO O QUITO LA CLASE SEGUN EL VALOR DE INPUT
  if(input_gif.value == ''){

    sugerencia.classList.remove('displayBlocker');
    lupanueva.classList.remove('displayBlocker');
    lupa.setAttribute('src',"./images/icon-search.svg");
  }else{

    sugerencia.classList.add('displayBlocker');
    lupanueva.classList.add('displayBlocker');
    lupa.setAttribute('src',"./images/close.svg");
  }

  // ACCION DE CERRAR SUGERENCIAS Y RESETEAR CON LA CRUZ.
  lupa.addEventListener("click",()=>{

    sugerencia.classList.remove('displayBlocker');
    lupanueva.classList.remove('displayBlocker');
    lupa.setAttribute('src',"./images/icon-search.svg");
    input_gif.value = '';
  })

  //GUARDO EL VALOR EN UNA VARIABLE
  let busqueda = input_gif.value;
  console.log("busqeda = "+ busqueda);

})


/*
lupa.addEventListener("click",()=>{

  sugerencia.classList.toggle('displayBlocker');
  lupanueva.classList.toggle('displayBlocker');

})
*/


