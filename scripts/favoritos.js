const APIKEY = "IPDmvhDzm0liJgSooGZzCeivUyTZZ82L";
// VARIABLES PARA MEDIAQUERYS
let mediaMobile = window.matchMedia("(max-width: 768px)");
let mediaIpad = window.matchMedia("(min-width: 768px) and (max-width : 1024px)");
let mediaDesktop = window.matchMedia("(min-width: 1025px)");


let arrayGuardado = [];
function recargarArray(){
  let guardado = localStorage.getItem("FAVORITOS");
  arrayGuardado = JSON.parse(guardado);
  console.log(arrayGuardado);
}
recargarArray();

function desplegarFavoritos(){
  //TOMO CONTENEDORES HARDCODEADOS
  let estadoFav = document.getElementById('estadoFav');
  let allFavs = document.getElementById('allFavs');
  //AGREGO CONTENEDORES DINAMICAMENTE
  let containerFavs = document.createElement('div');
  let favoritus = document.createElement('div');
  let verMasFav = document.createElement('div');
  let verMasFavA = document.createElement('a');

  containerFavs.className = 'favoritosContainer';
  favoritus.className = 'favoritos';
  verMasFav.className = 'verMasfav';
  verMasFavA.className = 'verMasfavA';

  allFavs.appendChild(containerFavs);
  containerFavs.appendChild(favoritus);
  containerFavs.appendChild(verMasFav);
  verMasFav.appendChild(verMasFavA);
  verMasFavA.textContent = 'VER MÁS';

  //OCULTO BOTON DE VER MAS SI NO HAY MAS DE 12 GIFS
  if(arrayGuardado == null || arrayGuardado.length <= 12){
    verMasFav.style.display = 'none';
  }

  //FUNCION PARA VISUALIZAR PRIMEROS 12 GIFS
  if(arrayGuardado != null){

    for(x=0; x<arrayGuardado.length && x<=11; x++){
      //RECUPERO INFORMACION DE GIF GUARDADOS
      let urlFav = arrayGuardado[x].url;
      let titFav = arrayGuardado[x].tit;
      let idFav = arrayGuardado[x].id;
      //LOS AGREGO AL CONTENEDOR FAVORITUS (GRID)
      favoritus.appendChild(añadirFavoritos(urlFav,titFav,idFav,x));
    }
    //FUNCION PARA VISUALIZAR 12 GIFS MAS CON BOTON DE VER MÁS
    let largo = 12;
    verMasFavA.addEventListener('click',()=>{
      favoritus.innerHTML = "";
      largo = largo + 12 ;

      for(x=0; x<largo && x < arrayGuardado.length; x++){

        //RECUPERO INFORMACION DE GIF GUARDADOS
        let urlFav = arrayGuardado[x].url;
        let titFav = arrayGuardado[x].tit;
        let idFav = arrayGuardado[x].id;
        //LOS AGREGO AL CONTENEDOR FAVORITUS (GRID)
        favoritus.appendChild(añadirFavoritos(urlFav,titFav,idFav,x));
      }
      if(largo>arrayGuardado.length){
        verMasFavA.textContent = 'YA NO TIENES MÁS GIFS GUARDADOS!';
      }
    })
    //OCULTO MENSAJE DE NO HAY GIFS
    if(arrayGuardado.length>0){
      estadoFav.style.display = 'none';
    }
  }
}
desplegarFavoritos();

function añadirFavoritos(url,titulo,id,x){

  let gridFavorito = document.createElement('div');
  let blue = document.createElement('div');
  let cardIconFav = document.createElement('div');
  let divFav1 = document.createElement('div');
  let divFav2 = document.createElement('div');
  let divFav3 = document.createElement('div');
  let iconFavFav = document.createElement('img');
  let iconDownloadFav = document.createElement('img');
  let iconMaxFav = document.createElement('img');
  let tituloFav = document.createElement('h4');
  
  gridFavorito.className = 'grid-itemfav';
  blue.className = 'bluefav';
  cardIconFav.className = 'cardIconsfav';
  tituloFav.className = 'tituloFav';
  iconFavFav.className = 'iconfav';
  iconDownloadFav.className = 'iconfav';
  iconMaxFav.className = 'iconfav';

  iconFavFav.setAttribute('src','./images/icon-fav-active.svg');
  iconDownloadFav.setAttribute('src','./images/icon-download.svg');
  iconMaxFav.setAttribute('src','./images/icon-max.svg');

  gridFavorito.appendChild(blue);
  blue.appendChild(cardIconFav);
  blue.appendChild(tituloFav);
  divFav1.appendChild(iconFavFav);
  divFav2.appendChild(iconDownloadFav);
  divFav3.appendChild(iconMaxFav);
  cardIconFav.appendChild(divFav1);
  cardIconFav.appendChild(divFav2);
  cardIconFav.appendChild(divFav3);

  
  gridFavorito.style.backgroundImage = 'url('+url+')';
  tituloFav.textContent = titulo;
  
  //AÑADO FUNCION DE DESCARGA 
  iconDownloadFav.addEventListener('click',()=>{
    var x=new XMLHttpRequest();
    x.open("GET", url, true);
    x.responseType = 'blob';
    x.onload=function(e){download(x.response, titulo+".gif", "image/gif" );}
    x.send();
  })

  //FUNCION DE MAXIMIZADO
  if(mediaDesktop.matches){
    
    iconMaxFav.addEventListener('click', () => añadoDomMaxFav(x,url,titulo,iconFavFav,iconDownloadFav,divFav1,divFav2));

  }else if(mediaMobile.matches || mediaIpad.matches){

    gridFavorito.addEventListener('click', () => añadoDomMaxFav(x,url,titulo,iconFavFav,iconDownloadFav,divFav1,divFav2));
  }


  iconFavFav.addEventListener('click',()=>{

    //TOMO DATOS 
    var datos = { url: url, tit: titulo, id: id};

    //RECUPERO INFO EN LOCAL STORAGE
    var favoritos = localStorage.getItem("FAVORITOS") || "[]";
    favoritos = JSON.parse(favoritos);

    //BUSCO SI EXISTE AL CLICKEAR CORAZON ENTONCES LO QUITO, SINO EXISTE TENGO QUE AGREGARLO
    var posLista = favoritos.findIndex(function(e) { return e.id == datos.id; });

    if (posLista > -1) {
      // SI ESTA, LO QUITO;
      favoritos.splice(posLista, 1);
    }

    //GUARDO LA LISTA DE FAVORITOS
    localStorage.setItem("FAVORITOS", JSON.stringify(favoritos));
    //ELIMINO DEL LOCALSTORAGE QUE CONTROLA LOS CORAZONES ACTIVOS
    localStorage.removeItem("favoritoGif"+id);
    //REFRESCO LA PAGINA CADA VEZ QUE SE ELIMINA UN FAVORITO
    location.reload();
  })

  //DEVUELVO EL ITEM DE GRID ARMADO
  return gridFavorito;
}

//  CAMBIO DE ICONO - MENU HAMBURGUESA-----------------------------------
let nav = document.querySelector('.nav-links');
let icon = document.getElementById("check");
let img = document.getElementById('burgerIcon');

//ESTADO DE MODO DARK O LIGHT GUARDADO EN SESSION STORAGO
let estadoModo = sessionStorage.getItem("themeStatus");

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

function añadoDomMaxFav(b,url,titulo,iconFav,iconDownload,div1,div2){

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
  titugifMax.textContent = titulo;
  iconDiv.className = 'iconDiv';

  containerX.appendChild(modal);
  modal.appendChild(closeMax);
  modal.appendChild(containMax);
  closeMax.appendChild(imgClose);
  containMax.appendChild(gifMax);
  containMax.appendChild(infoDiv);
  infoDiv.appendChild(titugifMax);
  infoDiv.appendChild(iconDiv);
  iconDiv.appendChild(iconFav);
  iconDiv.appendChild(iconDownload);

  iconFav.addEventListener('click',()=>{
    if(iconFav.style.opacity = '0.5'){
      iconFav.style.opacity = '1';
    }
  })
  closeMax.addEventListener('click',()=>{
    div1.appendChild(iconFav);
    div2.appendChild(iconDownload);
    modal.style.display = "none";
  })
}

async function getGif(url, value, api_key, number){
  let endpoint = `http://${url}?q=${value}&api_key=${api_key}limit=${number}&lang=es`;
}

//----------CAMBIO A DARK THEME--------------------->>>
//TOMO HOJA DE ESTILO LIGHT THEME(DEFAULT) Y LA GUARDO EN UNA CONSTANTE
let theme = document.querySelector("#light-theme");
//ELEMENTOS DEL NAV BAR
let crearGif = document.getElementById('gifCreatorBtn');
let modoNoche = document.getElementById('modoNoche');
let logoNav = document.getElementById('logoNav');
let btnMenu = document.querySelectorAll('.menubtn');
let navlink = document.getElementsByClassName('nav-links');
let burger = document.getElementById('burgerIcon');

//CAMBIO MODO DARK

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
    sessionStorage.setItem("themeStatus", themeStatus);
    modoDark();

  }else{

    theme.href = "styles/main.css";
    themeStatus = 0;
    sessionStorage.setItem("themeStatus", themeStatus);
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

//MOUSE OVER BOTON DE CREAR GIFOS--------------------------->>>
let makeGif = document.getElementById('makegif');
let divgifCreatorBtn = document.getElementById('gif_creator');

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
