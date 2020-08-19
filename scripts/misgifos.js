const APIKEY = "IPDmvhDzm0liJgSooGZzCeivUyTZZ82L";
// VARIABLES PARA MEDIAQUERYS
let mediaMobile = window.matchMedia("(max-width: 768px)");
let mediaIpad = window.matchMedia("(min-width: 768px) and (max-width : 1024px)");
let mediaDesktop = window.matchMedia("(min-width: 1025px)");

//ELEMENTOS DEL NAV BAR
let crearGif = document.getElementById('gifCreatorBtn');
let modoNoche = document.getElementById('modoNoche');
let logoNav = document.getElementById('logoNav');
let btnMenu = document.querySelectorAll('.menubtn');
let navlink = document.getElementsByClassName('nav-links');
let burger = document.getElementById('burgerIcon');

//  CAMBIO DE ICONO - MENU HAMBURGUESA-----------------------------------
let nav = document.querySelector('.nav-links');
let icon = document.getElementById("check");
let img = document.getElementById('burgerIcon');

//MOUSE OVER BOTON DE CREAR GIFOS--------------------------->>>
let makeGif = document.getElementById('makegif');
let divgifCreatorBtn = document.getElementById('gif_creator');

//ESTADO DE MODO DARK O LIGHT GUARDADO EN LOCAL STORAGE
let estadoModo = localStorage.getItem("themeStatus");

if(estadoModo == 1){

  img.src = "./images/burger-noc.svg";
}

icon.addEventListener("click",()=>{

  nav.classList.toggle('nav-active');

    if (check.checked == true && estadoModo != 1){
      img.src = "./images/close.svg";
    }else if(check.checked == false && estadoModo != 1) {
      img.src = "./images/burger.svg";
    }else if(check.checked !== true && estadoModo == 1) {
      img.src = "./images/burger-noc.svg";
    }else if(check.checked == true && estadoModo == 1){
      img.src = "./images/button-close-noc.svg";
    } 
})
//----------------------------------------------------------XXX

//TOMO HOJA DE ESTILO LIGHT THEME(DEFAULT) Y LA GUARDO EN UNA CONSTANTE
let theme = document.querySelector("#light-theme");

if(estadoModo == 1){

  theme.href = "styles/dark-main.css";
  modoDark();

}else{

  theme.href = "styles/main.css";
  modoLight();
}

let themeStatus;
modoNoche.addEventListener('click',()=>{

  if(theme.getAttribute("href") == "styles/main.css"){
    theme.href = "styles/dark-main.css";
    themeStatus = 1;
    localStorage.setItem("themeStatus", themeStatus);
    modoDark();

  }else{

    theme.href = "styles/main.css";
    themeStatus = 0;
    localStorage.setItem("themeStatus", themeStatus);
    modoLight();
  }
  location.reload();
})

function modoDark(){

  logoNav.setAttribute('src','./images/logo-desktop-modo-noc.svg');
  crearGif.setAttribute('src','./images/button-crear-gifo-noc.svg');
  btnMenu[0].textContent = 'Modo Diurno';

}
function modoLight(){

  logoNav.setAttribute('src','./images/logo-desktop.svg');
  crearGif.setAttribute('src','./images/button-crear-gifo.svg');
  btnMenu[0].textContent = 'Modo Nocturno';

}
//--------------FIN CAMBIO A DARK THEME----------------------XXX

let arrayCreaciones = [];
//RECARGO INFORMACION EN LOCAL STORAGE Y LA PASO AL arrayCREACIONES.
function recargarCreaciones(){
  let getInfo = localStorage.getItem("misgifos");
  arrayCreaciones = JSON.parse(getInfo);
  console.log(arrayCreaciones);
}
recargarCreaciones();

function desplegarMisGifos(){
  //TOMO CONTENEDORES HARDCODEADOS
  let estadoGifs = document.getElementById('estadoGifs');
  let allMyGifs = document.getElementById('allMyGifs');
  //AGREGO CONTENEDORES DINAMICAMENTE
  let containerMG = document.createElement('div');
  let myGifus = document.createElement('div');
  let verMasMG = document.createElement('div');
  let verMasMGA = document.createElement('a');

  containerMG.className = 'favoritosContainer';
  myGifus.className = 'misGifos';
  verMasMG.className = 'verMasMG';
  verMasMGA.className = 'verMasMGA';

  allMyGifs.appendChild(containerMG);
  containerMG.appendChild(myGifus);
  containerMG.appendChild(verMasMG);
  verMasMG.appendChild(verMasMGA);
  verMasMGA.textContent = 'VER MÁS';
  
  //OCULTO BOTON DE VER MAS SI NO HAY MAS DE 12 GIFS
  if(arrayCreaciones== null || arrayCreaciones.length <= 12){
    verMasMG.style.display = 'none';
  }

  //FUNCION PARA VISUALIZAR PRIMEROS 12 GIFS
  if(arrayCreaciones != null){

      for(x=0; x<arrayCreaciones.length && x<=11; x++){
        //RECUPERO INFORMACION DE GIF CREADOS
        let urlMG = arrayCreaciones[x].url;
        let idMG = arrayCreaciones[x].id;
        //LOS AGREGO AL CONTENEDOR myGifus (GRID)
        myGifus.appendChild(añadirMisGifos(urlMG,idMG,x));
      }


    //FUNCION PARA VISUALIZAR 12 GIFS MAS CON BOTON DE VER MÁS
    let largo = 12;
    verMasMGA.addEventListener('click',()=>{
      myGifus.innerHTML = "";
      largo = largo + 12 ;

      for(x=0; x<largo && x < arrayCreaciones.length; x++){

        //RECUPERO INFORMACION DE GIF GUARDADOS
        let urlMG = arrayCreaciones[x].url;
        let idMG = arrayCreaciones[x].id;
        //LOS AGREGO AL CONTENEDOR myGifus (GRID)
        myGifus.appendChild(añadirMisGifos(urlMG,idMG,x));
      }
      if(largo>arrayCreaciones.length){
        verMasMGA.textContent = 'YA NO TIENES MÁS GIFS CREADOS!';
      }
    })
    //OCULTO MENSAJE DE NO HAY GIFS
    if(arrayCreaciones.length>0){
      estadoGifs.style.display = 'none';
    }
  }
}
desplegarMisGifos();

function añadirMisGifos(url,id,x){

  let gridMG = document.createElement('div');
  let blueMG = document.createElement('div');
  let cardIconsMG = document.createElement('div');
  let divMG1 = document.createElement('div');
  let divMG2 = document.createElement('div');
  let divMG3 = document.createElement('div');
  let iconDeleteMG = document.createElement('img');
  let iconDownloadMG = document.createElement('img');
  let iconMaxMG = document.createElement('img');
  let tituloMG = document.createElement('h4');
  
  gridMG.className = 'grid-itemMG';
  blueMG.className = 'blueMG';
  cardIconsMG.className = 'cardIconsMG';
  tituloMG.className = 'tituloMG';
  iconDeleteMG.className = 'iconMG';
  iconDownloadMG.className = 'iconMG';
  iconMaxMG.className = 'iconMG';

  iconDeleteMG.setAttribute('src','./images/icon_trash.svg');
  iconDownloadMG.setAttribute('src','./images/icon-download.svg');
  iconMaxMG.setAttribute('src','./images/icon-max.svg');

  gridMG.appendChild(blueMG);
  blueMG.appendChild(cardIconsMG);
  blueMG.appendChild(tituloMG);
  divMG1.appendChild(iconDeleteMG);
  divMG2.appendChild(iconDownloadMG);
  divMG3.appendChild(iconMaxMG);
  cardIconsMG.appendChild(divMG1);
  cardIconsMG.appendChild(divMG2);
  cardIconsMG.appendChild(divMG3);

  
  gridMG.style.backgroundImage = 'url('+url+')';
  
  //AÑADO FUNCION DE DESCARGA 
  iconDownloadMG.addEventListener('click',()=>{

    var x=new XMLHttpRequest();
    x.open("GET", url, true);
    x.responseType = 'blob';
    x.onload=function(e){download(x.response, id+".gif", "image/gif" );}
    x.send();
  })

  //FUNCION DE MAXIMIZADO
  if(mediaDesktop.matches){
    
    iconMaxMG.addEventListener('click', () => añadoDomMaxMG(x,url,iconDeleteMG,iconDownloadMG,divMG1,divMG2));

  }else if(mediaMobile.matches || mediaIpad.matches){

    gridMG.addEventListener('click', () => añadoDomMaxMG(x,url,iconDeleteMG,iconDownloadMG,divMG1,divMG2));
  }


  iconDeleteMG.addEventListener('click',()=>{
 
    var datos = { url: url, id: id};

    var index = arrayCreaciones.findIndex(function(e) { return e.id == datos.id; });
    
    if (index > -1) {
      // SI ESTA, LO QUITO;
      arrayCreaciones.splice(index, 1);
    }

    localStorage.setItem("misgifos", JSON.stringify(arrayCreaciones));

    location.reload();
  })

  //DEVUELVO EL ITEM DE GRID ARMADO
  return gridMG;
}

function añadoDomMaxMG(b,url,iconDelete,iconDownload,div1,div2){

  modal.innerHTML = '';
  modal.style.display = 'block';

  if (estadoModo == 1){
    imgClose.setAttribute('src', "./images/button-close-noc.svg");
  }else{
    imgClose.setAttribute('src', "./images/button-close.svg");
  }

  gifMax.setAttribute('src', url);

  modal.className = 'modal';
  closeMax.className = 'close';
  containMax.className = 'gifMaxContainer';
  gifMax.className = 'gifMax';
  infoDiv.className = 'infoDiv';
  titugifMax.className = 'tituloTrendMax';
  iconDiv.className = 'iconDiv';

  containerX.appendChild(modal);
  modal.appendChild(closeMax);
  modal.appendChild(containMax);
  closeMax.appendChild(imgClose);
  containMax.appendChild(gifMax);
  containMax.appendChild(infoDiv);
  infoDiv.appendChild(titugifMax);
  infoDiv.appendChild(iconDiv);
  iconDiv.appendChild(iconDelete);
  iconDiv.appendChild(iconDownload);

  iconDelete.addEventListener('click',()=>{
    if(iconDelete.style.opacity = '0.5'){
      iconDelete.style.opacity = '1';
    }
  })
  closeMax.addEventListener('click',()=>{
    div1.appendChild(iconDelete);
    div2.appendChild(iconDownload);
    modal.style.display = "none";
  })
}



makeGif.addEventListener('mouseover',()=>{
  if(estadoModo != 1){
    crearGif.setAttribute('src','./images/button-crear-gifo-white.svg');
  }else{
    crearGif.setAttribute('src','./images/button-crear-gifo-black.svg');
  }
})
makeGif.addEventListener('mouseout',()=>{
  if(estadoModo != 1){
    crearGif.setAttribute('src','./images/button-crear-gifo.svg');
  }else{
    crearGif.setAttribute('src','./images/button-crear-gifo-white.svg');
  }
})