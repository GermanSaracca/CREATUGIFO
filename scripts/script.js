
const APIKEY = "IPDmvhDzm0liJgSooGZzCeivUyTZZ82L";
// VARIABLES PARA MEDIAQUERYS
let mediaMobile = window.matchMedia("(max-width: 768px)");
let mediaIpad = window.matchMedia("(min-width: 768px) and (max-width : 1024px)");
let mediaDesktop = window.matchMedia("(min-width: 1025px)");

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


//  BUSQUEDA DE GIFS ----------------------------------------
let lupa = document.getElementById('search');
let lupanueva = document.getElementById("lupa_onclick");
let sugerencia = document.getElementById('suger');
let sugerencia1 = document.getElementById('p1');
let sugerencia2 = document.getElementById('p2');
let sugerencia3 = document.getElementById('p3');
let sugerencia4 = document.getElementById('p4');
let input_gif = document.getElementById('txt');
let trendings = document.getElementsByClassName('trendings');
let cutLine = document.getElementsByClassName('cutLine');
let noResults = document.getElementsByClassName('noResults')[0];
let tituloSearch = document.getElementById('tituloBusqueda');
let contenedor = document.getElementsByClassName('contenedor')[0];
let grillaGifs = document.getElementById('grillaGifs'); 
let cutLinex = document.getElementById('cutLinex');
let verMas = document.createElement('div');
let verMasA = document.createElement('a');
verMas.className = 'verMas';
verMasA.className = 'verMasA';

contenedor.appendChild(grillaGifs);
contenedor.appendChild(verMas);
verMas.appendChild(verMasA);
verMasA.textContent = 'VER MÁS';

let visual = 0;
//RESETEO EN CASO DE HABER ELEMENTOS MODIFICADOS DINAMICAMENTE AL CLICKEAR EL INPUT DE BUSQUEDA
input_gif.addEventListener('click',()=>{
  visual = 0;
  noResults.classList.remove('displayBlocker');
  verMas.classList.remove('displayNoner');
  verMasA.textContent = 'VER MÁS';
})

var globalTimeout = null;  
//INPUT DE BUSQUEDA 
input_gif.addEventListener("keyup",()=>{

  if (globalTimeout != null) {
    clearTimeout(globalTimeout);
  }
  globalTimeout = setTimeout(function() {
    globalTimeout = null;  

    sugerencias(busqueda);

  }, 200);  


  noResults.classList.remove('displayBlocker');
  verMas.classList.remove('displayNoner');
  //GUARDO EL VALOR EN UNA VARIABLE
  let busqueda = input_gif.value;

  //AGREGO O QUITO LA CLASE SEGUN EL VALOR DE INPUT
  if(input_gif.value !== '' && estadoModo != 1){

    if(mediaDesktop.matches){sugerencia.classList.add('displayBlocker')};
    lupanueva.classList.add('displayBlocker');
    if(mediaDesktop.matches){cutLinex.style.display = 'unset'};
    cutLine[0].classList.add('displayBlocker');
    trendings[0].classList.add('displayNoner');
    lupa.setAttribute('src',"./images/close.svg");
    contenedor.classList.add('displayBlocker');

  }else if(input_gif.value == '' && estadoModo != 1) {

    if(mediaDesktop.matches){sugerencia.classList.remove('displayBlocker')};
    lupanueva.classList.remove('displayBlocker');
    if(mediaDesktop.matches){cutLinex.style.display = 'none'};
    cutLine[0].classList.remove('displayBlocker');
    trendings[0].classList.remove('displayNoner');
    lupa.setAttribute('src',"./images/icon-search.svg");
    contenedor.classList.remove('displayBlocker');
    grillaGifs.innerHTML = "";
    tituloSearch.classList.remove('displayBlocker');
    verMas.classList.remove('displayBlocker');

  }else if(input_gif.value !== '' && estadoModo == 1){
    if(mediaDesktop.matches){sugerencia.classList.add('displayBlocker')};
    lupanueva.classList.add('displayBlocker');
    lupanueva.setAttribute('src','./images/icon-search-mod-noc.svg');
    if(mediaDesktop.matches){cutLinex.style.display = 'unset'};
    cutLine[0].classList.add('displayBlocker');
    trendings[0].classList.add('displayNoner');
    lupa.setAttribute('src',"./images/button-close-noc.svg");
    contenedor.classList.add('displayBlocker');

  }else if(input_gif.value == '' && estadoModo == 1){
    if(mediaDesktop.matches){sugerencia.classList.remove('displayBlocker')};
    lupanueva.classList.remove('displayBlocker');
    if(mediaDesktop.matches){cutLinex.style.display = 'none'};
    cutLine[0].classList.remove('displayBlocker');
    trendings[0].classList.remove('displayNoner');
    lupa.setAttribute('src',"./images/icon-search-mod-noc.svg");
    contenedor.classList.remove('displayBlocker');
    grillaGifs.innerHTML = "";
    tituloSearch.classList.remove('displayBlocker');
    verMas.classList.remove('displayBlocker');
    noResults.classList.remove('displayBlocker');
    verMas.classList.remove('displayNoner');
  }

  //INICIA BUSQUEDA CON EL ENTER DE LA BUSQUEDA INGRESADA
  if(event.wich == 13 || event.keyCode == 13 && input_gif.value !== ""){

    grillaGifs.innerHTML = "";
    tituloSearch.classList.add('displayBlocker');
    cutLine[0].scrollIntoView(true);

    verMas.classList.add('displayBlocker');
    getGif("api.giphy.com/v1/gifs/search",busqueda,APIKEY,"12","0")
    .then(response=>{
      console.log(response);
      for(a=0; a<response.data.length; a++){

        let id= response.data[a].id;// ID DE TRENDING
        let url = response.data[a].images.original.url;//URL DE TRENDING
        let tit = response.data[a].title;//TITULO DE TRENDING
        let urlDescargo = response.data[a].images.downsized.url;

        desplegarResultados(url,tit,id,a,urlDescargo);
        tituloSearch.textContent = busqueda;
      } 
      if(response.data.length == 0){
        tituloSearch.textContent = busqueda;
        noResults.classList.add('displayBlocker');
        verMas.classList.add('displayNoner');
        grillaGifs.innerHTML = "";
      }
    }).catch((error)=>{
    console.log("FALLO FETCH POR ENTER"+error);

    })
  }

  //ACCION DE CERRAR SUGERENCIAS Y RESETEAR CON LA CRUZ.
  lupa.addEventListener("click",()=>{
    grillaGifs.innerHTML = "";
    if(estadoModo != 1){

      sugerencia.classList.remove('displayBlocker');
      lupanueva.classList.remove('displayBlocker');
      cutLinex.style.display = 'none';
      cutLine[0].classList.remove('displayBlocker');
      trendings[0].classList.remove('displayNoner');
      lupa.setAttribute('src',"./images/icon-search.svg");
      input_gif.value = '';
      contenedor.classList.remove('displayBlocker');
      tituloSearch.classList.remove('displayBlocker');
      verMas.classList.remove('displayBlocker');
    
    }else{
      sugerencia.classList.remove('displayBlocker');
      lupanueva.classList.remove('displayBlocker');
      lupanueva.setAttribute('src','./images/icon-search-mod-noc.svg');
      cutLinex.style.display = 'none';
      cutLine[0].classList.remove('displayBlocker');
      trendings[0].classList.remove('displayNoner');
      lupa.setAttribute('src',"./images/icon-search-mod-noc.svg");
      input_gif.value = '';
      contenedor.classList.remove('displayBlocker');
      tituloSearch.classList.remove('displayBlocker');
      verMas.classList.remove('displayBlocker');
    }
  })
})

//FUNCION DE VISUALIZAR 12 GIF MAS CADA VEZ QUE SE PRESIONE EL BOTON 'VER MAS'
verMas.addEventListener('click',()=>{
  visual += 12;
  
  getGif("api.giphy.com/v1/gifs/search",input_gif.value,APIKEY,"12",visual)
  .then(response=>{
    
    for(a=0; a<response.data.length; a++){
      
      let id= response.data[a].id;// ID DE TRENDING
      let url = response.data[a].images.original.url;//URL DE TRENDING
      let tit = response.data[a].title;//TITULO DE TRENDING
      let urlDescargo = response.data[a].images.downsized.url;

      desplegarResultados(url,tit,id,a,urlDescargo);
      tituloSearch.textContent = input_gif.value;
    }
    if(response.data.length == 0){

      verMasA.textContent = "YA NO HAY MAS RESULTADOS";
    }
  }).catch((error)=>{
  console.log("FALLO FETCH POR VER MAS"+error);
})
})

//ESTA LUPA DA LA ACCION DE QUE APAREZCAN LOS GIFS CON EL INPUT INGRESADO
lupanueva.addEventListener('click',()=>{
  grillaGifs.innerHTML = "";
  tituloSearch.classList.add('displayBlocker');
  contenedor.classList.add('displayBlocker');
  verMas.classList.add('displayBlocker');
  cutLine[0].scrollIntoView(true);

  getGif("api.giphy.com/v1/gifs/search", input_gif.value,APIKEY, "12", "0")
  .then(response=>{
    console.log(response);
    for(a=0; a<response.data.length; a++){

      let id= response.data[a].id;// ID DE TRENDING
      let url = response.data[a].images.original.url;//URL DE TRENDING
      let tit = response.data[a].title;//TITULO DE TRENDING
      let urlDescargo = response.data[a].images.downsized.url;

      desplegarResultados(url,tit,id,a,urlDescargo);
      tituloSearch.textContent = input_gif.value;
    }
    if(response.data.length == 0){

      tituloSearch.textContent = input_gif.value;
      noResults.classList.add('displayBlocker');
      verMas.classList.add('displayNoner');
      grillaGifs.innerHTML = "";
    }
  }).catch((error)=>{
    console.log("FALLO FETCH POR LUPA"+error);
  })
});

//ACCION DE INICIAR BUSQUEDA CON CLICKEAR UNA SUGERENCIA
sugerencia1.addEventListener('click',()=>{

  noResults.classList.remove('displayBlocker');
  verMas.classList.remove('displayNoner');
  cutLine[0].scrollIntoView(true);
  verMasA.textContent = 'VER MÁS';
  input_gif.value = sugerencia1.textContent;
  grillaGifs.innerHTML = '';
  //FETCH DE BUSQUEDA CON EL VALOR DE ESTA SUGERENCIA
  getGif("api.giphy.com/v1/gifs/search",sugerencia1.textContent,APIKEY,"12","0")
  .then(response=>{
    for(a=0; a<response.data.length; a++){

      let id= response.data[a].id;// ID DE TRENDING
      let url = response.data[a].images.original.url;//URL DE TRENDING
      let tit = response.data[a].title;//TITULO DE TRENDING
      let urlDescargo = response.data[a].images.downsized.url;

      desplegarResultados(url,tit,id,a,urlDescargo);
      tituloSearch.textContent = sugerencia1.textContent;
      tituloSearch.classList.add('displayBlocker');
      verMas.classList.add('displayBlocker');
    }
  })
})
sugerencia2.addEventListener('click',()=>{

  noResults.classList.remove('displayBlocker');
  verMas.classList.remove('displayNoner');
  cutLine[0].scrollIntoView(true);
  verMasA.textContent = 'VER MÁS';
  input_gif.value = sugerencia2.textContent;
  grillaGifs.innerHTML = '';
  //FETCH DE BUSQUEDA CON EL VALOR DE ESTA SUGERENCIA
  getGif("api.giphy.com/v1/gifs/search",sugerencia2.textContent,APIKEY,"12","0")
  .then(response=>{
    for(a=0; a<response.data.length; a++){

      let id= response.data[a].id;// ID DE TRENDING
      let url = response.data[a].images.original.url;//URL DE TRENDING
      let tit = response.data[a].title;//TITULO DE TRENDING
      let urlDescargo = response.data[a].images.downsized.url;

      desplegarResultados(url,tit,id,a,urlDescargo);
      tituloSearch.textContent = sugerencia2.textContent;
      tituloSearch.classList.add('displayBlocker');
      verMas.classList.add('displayBlocker');
    }
  })
})
sugerencia3.addEventListener('click',()=>{

  noResults.classList.remove('displayBlocker');
  verMas.classList.remove('displayNoner');
  cutLine[0].scrollIntoView(true);
  verMasA.textContent = 'VER MÁS';
  input_gif.value = sugerencia3.textContent;
  grillaGifs.innerHTML = '';
  //FETCH DE BUSQUEDA CON EL VALOR DE ESTA SUGERENCIA
  getGif("api.giphy.com/v1/gifs/search",sugerencia3.textContent,APIKEY,"12","0")
  .then(response=>{
    for(a=0; a<response.data.length; a++){

      let id= response.data[a].id;// ID DE TRENDING
      let url = response.data[a].images.original.url;//URL DE TRENDING
      let tit = response.data[a].title;//TITULO DE TRENDING
      let urlDescargo = response.data[a].images.downsized.url;

      desplegarResultados(url,tit,id,a,urlDescargo);
      tituloSearch.textContent = sugerencia3.textContent;
      tituloSearch.classList.add('displayBlocker');
      verMas.classList.add('displayBlocker');
    }
  })
})
sugerencia4.addEventListener('click',()=>{

  noResults.classList.remove('displayBlocker');
  verMas.classList.remove('displayNoner');
  cutLine[0].scrollIntoView(true);
  verMasA.textContent = 'VER MÁS';
  input_gif.value = sugerencia4.textContent;
  grillaGifs.innerHTML = '';
  //FETCH DE BUSQUEDA CON EL VALOR DE ESTA SUGERENCIA
  getGif("api.giphy.com/v1/gifs/search",sugerencia4.textContent,APIKEY,"12","0")
  .then(response=>{
    for(a=0; a<response.data.length; a++){

      let id= response.data[a].id;// ID DE TRENDING
      let url = response.data[a].images.original.url;//URL DE TRENDING
      let tit = response.data[a].title;//TITULO DE TRENDING
      let urlDescargo = response.data[a].images.downsized.url;

      desplegarResultados(url,tit,id,a,urlDescargo);
      tituloSearch.textContent = sugerencia4.textContent;
      tituloSearch.classList.add('displayBlocker');
      verMas.classList.add('displayBlocker');
    }
  })
})
//------------------------------------------------------

//FUNCION GENERAL PARA HACER LOS LLAMADOS A LA API
async function getGif(url, value, api_key, number,offset){
  let endPoint = `http://${url}?q=${value}&api_key=${api_key}&limit=${number}&offset=${offset}&lang=es`;
  const resp = await fetch(endPoint);
  const data = await resp.json();
  return data;
}
//LLAMADA A LA API PARA SUGERENCIAS DE BUSQUEDA
function sugerencias(busqueda){
  if(busqueda != ""){

    /*getGif("api.giphy.com/v1/gifs/search/tags", busqueda, APIKEY,"4", "0")*/
    async function sugerx(){
      let endPoint = 'https://api.giphy.com/v1/tags/related/'+busqueda+'?api_key='+APIKEY;
      const resp = await fetch(endPoint);
      const data = await resp.json();
      return data;
      console.log(data);
    }
    sugerx().then(response =>{

      sugerencia1.textContent = response.data[0].name;
      sugerencia2.textContent = response.data[1].name;
      sugerencia3.textContent = response.data[2].name;
      sugerencia4.textContent = response.data[3].name;
      
    }).catch((error)=>{
    console.log("FALLO FETCH POR SUGERENCIAS "+error);
    //SUGERENCIA ES LO PRIMERO QUE FALLA CUANDO NO EXISTE LA BUSQUEDA
    //CONTENIDO DE NO HAY RESULTADOS SE CREA POR ACA
    });
    console.log(busqueda);
  }
};
//FUNCION PARA AÑADIR CADA CARD AL GRID
function desplegarResultados(url,tit,id,x){
  
  //AGREGO CONTENEDORES DINAMICAMENTE
  let resultados = document.createElement('div');
  resultados.className = 'resultados';
  grillaGifs.appendChild(resultados);

  //LOS AGREGO AL CONTENEDOR resultados (GRID)
  resultados.appendChild(añadirResultados(url,tit,id,x));

}
//FUNCION PARA ARMAR CADA CARD DEL GRID
function añadirResultados(url,titulo,id,x){

  let gridResultados = document.createElement('div');
  let blue = document.createElement('div');
  let cardIcon = document.createElement('div');
  let div1 = document.createElement('div');
  let div2 = document.createElement('div');
  let div3 = document.createElement('div');
  let iconFav = document.createElement('img');
  let iconDownload = document.createElement('img');
  let iconMax = document.createElement('img');
  let tituloGrid = document.createElement('h4');
  
  gridResultados.className = 'grid-item';
  blue.className = 'blue';
  cardIcon.className = 'cardIcons';
  tituloGrid.className = 'tituloGrid';
  iconFav.className = 'icon';
  iconDownload.className = 'icon';
  iconMax.className = 'icon';

  iconFav.setAttribute('src','./images/icon-fav-hover.svg');
  iconDownload.setAttribute('src','./images/icon-download.svg');
  iconMax.setAttribute('src','./images/icon-max.svg');

  gridResultados.appendChild(blue);
  blue.appendChild(cardIcon);
  blue.appendChild(tituloGrid);
  div1.appendChild(iconFav);
  div2.appendChild(iconDownload);
  div3.appendChild(iconMax);
  cardIcon.appendChild(div1);
  cardIcon.appendChild(div2);
  cardIcon.appendChild(div3);
  div1.appendChild(iconFav);
  div2.appendChild(iconDownload);
  div3.appendChild(iconMax);
  
  gridResultados.style.backgroundImage = 'url('+url+')';
  tituloGrid.textContent = titulo;
  
  //FUNCION DE DESCARGA 
  iconDownload.addEventListener('click',()=>{
    var x=new XMLHttpRequest();
    x.open("GET", url, true);
    x.responseType = 'blob';
    x.onload=function(e){download(x.response, titulo+".gif", "image/gif" );}
    x.send();
  })
  //FUNCION DE MAXIMIZADO
  if(mediaDesktop.matches){
    blue.removeEventListener('click', () => añadoDomMaxResults(x,url,titulo,iconFav,iconDownload,div1,div2));
    iconMax.addEventListener('click', () => añadoDomMaxResults(x,url,titulo,iconFav,iconDownload,div1,div2));

  }else if(mediaMobile.matches || mediaIpad.matches){

    blue.addEventListener('click', () => añadoDomMaxResults(x,url,titulo,iconFav,iconDownload,div1,div2));
  }

  //FUNCION DE LIKEADO 
  guardaFavoritosResults(url,titulo,id,iconFav);
  //FUNCION PARA CHEQUEAR SI ESTA LIKEADO
  if(chequearCorazon(id)){
    iconFav.setAttribute('src','./images/icon-fav-active.svg');//LIKE
  }  

  //DEVUELVO EL ITEM DE GRID ARMADO
  return gridResultados;
}
//MAXIMIZADO DE CARD DE FAVORITOS
function añadoDomMaxResults(b,url,titulo,iconFav,iconDownload,div1,div2){

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
//GUARDADO DE FAVORITOS
function guardaFavoritosResults(url,tit,id,iconFav){

  let fav = iconFav;
  fav.addEventListener("click",()=>{
    //TOMO DATOS DE FETCH
    var datos = { url: url, tit: tit, id: id};
    //RECUPERO INFO EN LOCAL STORAGE
    var favoritos = localStorage.getItem("FAVORITOS") || "[]";
    favoritos = JSON.parse(favoritos);
    //BUSCO SI EXISTE AL CLICKEAR CORAZON ENTONCES LO QUITO, SINO EXISTE TENGO QUE AGREGARLO
    var posLista = favoritos.findIndex(function(e) { return e.id == datos.id; });
    if (posLista > -1) {
      // SI ESTA, LO QUITO;
      favoritos.splice(posLista, 1);
    } else {
      // SI NO ESTA, LO AGREGO.
      favoritos.push(datos);
    }
    //GUARDO LA LISTA DE FAVORITOS
    localStorage.setItem("FAVORITOS", JSON.stringify(favoritos));

    if(fav.getAttribute('src') == './images/icon-fav-hover.svg'){
      fav.setAttribute('src','./images/icon-fav-active.svg');//LIKE
      let news = agregarFavorito(url,tit,id);
      let newFav = JSON.stringify(news);
      localStorage.setItem("favoritoGif"+id, newFav );
    }else{
      fav.setAttribute('src','./images/icon-fav-hover.svg');//DISLIKE
      quitarFavorito(id);
      localStorage.removeItem("favoritoGif"+id);
    }
  })
}
//----------------------------------------------------------XXX

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

//SEGUN EL ESTADO DE MODO GUARDADO EN SESSION APLICO INMEDIATAMENTE SE ABRE LA NUEVA PAGINA
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
  //MAIN
  lupa.setAttribute('src',"./images/icon-search-mod-noc.svg");

}
function modoLight(){

  logoNav.setAttribute('src','./images/logo-desktop.svg');
  crearGif.setAttribute('src','./images/button-crear-gifo.svg');
  btnMenu[0].textContent = 'Modo Nocturno';
  //MAIN
  lupa.setAttribute('src',"./images/icon-search.svg");
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
