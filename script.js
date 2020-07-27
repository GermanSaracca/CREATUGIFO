//  CAMBIO DE ICONO - MENU HAMBURGUESA-----------------------------------
//const burger = document.querySelector('.burger'); 
const nav = document.querySelector('.nav-links');
const icon = document.getElementById("check");
const img = document.getElementById('burgerIcon');

icon.addEventListener("click",()=>{
    nav.classList.toggle('nav-active');
    
    if (check.checked == true){
        img.data = "./images/close.svg";
      }else {
        img.data = "./images/burger.svg";
      } 
})
//--------------------------------------------------------XXX


//  BUSQUEDA DE GIFS ----------------------------------------
const lupa = document.getElementById('search');
const lupanueva = document.getElementById("lupa_onclick");
const sugerencia = document.getElementById('suger');
const input_gif = document.getElementById('txt');
const trendings = document.getElementsByClassName('trendings');
const cutLine = document.getElementsByClassName('cutLine');
const grillaGifs = document.getElementById('grillaGifs'); 
const cutLinex = document.getElementById('cutLinex');
//----GIFCARDS-------------------------------------------------
const gifCard = document.getElementById('gifCard');
const gifIcons = document.getElementById('cardIcons');
const tituGif = document.getElementById('tituloGif');


input_gif.addEventListener("keyup",()=>{

  //AGREGO O QUITO LA CLASE SEGUN EL VALOR DE INPUT
  if(input_gif.value !== ''){

    sugerencia.classList.add('displayBlocker');
    lupanueva.classList.add('displayBlocker');
    cutLinex.style.display = 'unset';
    cutLine[0].classList.add('displayBlocker');
    trendings[0].classList.add('displayNoner');
    lupa.setAttribute('src',"./images/close.svg");

  }else{

    sugerencia.classList.remove('displayBlocker');
    lupanueva.classList.remove('displayBlocker');
    cutLinex.style.display = 'none';
    cutLine[0].classList.remove('displayBlocker');
    trendings[0].classList.remove('displayNoner');
    lupa.setAttribute('src',"./images/icon-search.svg");
    grillaGifs.classList.remove('displayBlocker');
  }
  
  //INICIA BUSQUEDA CON EL ENTER
  if(event.wich == 13 || event.keyCode == 13 && input_gif.value !== ""){
    grillaGifs.classList.toggle('displayBlocker');
  }

  // ACCION DE CERRAR SUGERENCIAS Y RESETEAR CON LA CRUZ.
  lupa.addEventListener("click",()=>{

    sugerencia.classList.remove('displayBlocker');
    lupanueva.classList.remove('displayBlocker');
    cutLinex.style.display = 'none';
    cutLine[0].classList.remove('displayBlocker');
    trendings[0].classList.remove('displayNoner');
    lupa.setAttribute('src',"./images/icon-search.svg");
    input_gif.value = '';
    grillaGifs.classList.remove('displayBlocker');
  })

  //GUARDO EL VALOR EN UNA VARIABLE
  let busqueda = input_gif.value;
  console.log("busqueda = "+ busqueda);
})

//ESTA LUPA DA LA ACCION DE QUE APAREZCAN LOS GIFS
lupanueva.addEventListener('click',()=>{
  grillaGifs.classList.toggle('displayBlocker');
});

//----------------------------------------------------------XXX








var mediaqueryList = window.matchMedia("(max-width: 480px)");


