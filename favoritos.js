const APIKEY = "IPDmvhDzm0liJgSooGZzCeivUyTZZ82L";

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
      favoritus.appendChild(añadirFavoritos(urlFav,titFav));
      
    }
    if(largo>arrayGuardado.length){
      verMasFavA.textContent = 'YA NO TIENES MÁS GIFS!';
    }
  })

  for(x=0; x<arrayGuardado.length && x<=11; x++){
    //RECUPERO INFORMACION DE GIF GUARDADOS
    let urlFav = arrayGuardado[x].url;
    let titFav = arrayGuardado[x].tit;
    let idFav = arrayGuardado[x].id;
    //LOS AGREGO AL CONTENEDOR FAVORITUS (GRID)
    favoritus.appendChild(añadirFavoritos(urlFav,titFav));
  }

  if(arrayGuardado.length>0){
    estadoFav.style.display = 'none';
  }
  if(arrayGuardado.length<=0){
    verMasFav.style.display = 'none';
  }
}
desplegarFavoritos();

function añadirFavoritos(url,titulo){

  let gridFavorito = document.createElement('div');
  let blue = document.createElement('div');
  let cardIconFav = document.createElement('div');
  let tituloFav = document.createElement('h4');
  
  gridFavorito.className = 'grid-itemfav';
  blue.className = 'bluefav';
  cardIconFav.className = 'cardIconsfav';
  tituloFav.className = 'tituloFav';
  
  gridFavorito.appendChild(blue);
  blue.appendChild(cardIconFav);
  blue.appendChild(tituloFav);
  
  gridFavorito.style.backgroundImage = 'url('+url+')';
  tituloFav.textContent = titulo;

  return gridFavorito;
}

//  CAMBIO DE ICONO - MENU HAMBURGUESA-----------------------------------
let nav = document.querySelector('.nav-links');
let icon = document.getElementById("check");
let img = document.getElementById('burgerIcon');

icon.addEventListener("click",()=>{

  nav.classList.toggle('nav-active');

    if (check.checked == true && modoNoche.checked !== true){
      img.src = "./images/close.svg";
    }else if(check.checked == false && modoNoche.checked !== true) {
      img.src = "./images/burger.svg";
    }else if(check.checked !== true && modoNoche.checked == true) {
      img.src = "./images/burger-noc.svg";
    }else if(check.checked == true && modoNoche.checked == true){
      img.src = "./images/button-close-noc.svg";
    } 
})

//----------------------------------------------------------XXX

//MOUSE OVER BOTON DE CREAR GIFOS--------------------------->>>
let makeGif = document.getElementById('makegif');
let divgifCreatorBtn = document.getElementById('gif_creator');

makeGif.addEventListener('mouseover',()=>{
  if(modoNoche.checked !== true){
    crearGif.setAttribute('src','./images/button-crear-gifo-white.svg');
  }else{
    crearGif.setAttribute('src','./images/button-crear-gifo-black.svg');
  }
})
makeGif.addEventListener('mouseout',()=>{
  if(modoNoche.checked !== true){
    crearGif.setAttribute('src','./images/button-crear-gifo.svg');
  }else{
    crearGif.setAttribute('src','./images/button-crear-gifo-white.svg');
  }
})

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

modoNoche.addEventListener('click',()=>{
  cambioModo();
  cambioIconos();
})

function cambioModo(){
  if(theme.getAttribute("href") == "styles/main.css"){
    theme.href = "styles/dark-main.css";
  }else{
    theme.href = "styles/main.css";
  }
}

function cambioIconos(){

  if (modoNoche.checked == true){

    logoNav.setAttribute('src','./images/logo-desktop-modo-noc.svg');
    btnMenu[0].textContent = 'Modo Diurno';
    crearGif.setAttribute('src','./images/button-crear-gifo-noc.svg');
    img.setAttribute('src',"./images/button-close-noc.svg");
    //MAIN
    lupa.setAttribute('src',"./images/icon-search-mod-noc.svg");

  }else {

    logoNav.setAttribute('src','./images/logo-desktop.svg');
    btnMenu[0].textContent = 'Modo Nocturno';
    crearGif.setAttribute('src','./images/button-crear-gifo.svg');
    img.setAttribute('src',"./images/close.svg");
    //MAIN
    lupa.setAttribute('src',"./images/icon-search.svg");
  }
}
//--------------FIN CAMBIO A DARK THEME----------------------XXX

//----GIFCARDS------------------------------------------------------------------------------------------------------
let trendCard = document.querySelectorAll('.grid-itemx');
let gifIcons = document.getElementById('cardIcons');
let tituGif = document.querySelectorAll('.tituloTrend');
let iconFav = document.querySelectorAll('.fav');
let iconDownload = document.querySelectorAll('.download');



//REQUEST DE 5 TRENDINGS PARA SECCION TRENDINGS---------------------------------------------------------------------
function pedidoTrendings(){

  async function buscaTrendings(){
    let urlTrend = 'https://api.giphy.com/v1/gifs/trending?api_key='+APIKEY+'&limit=5&rating=g';
    let respTrend = await fetch(urlTrend);
    let infoTrend = await respTrend.json();
    return infoTrend;
  }
  buscaTrendings().then(response=>{

    console.log(response);
    
    for(a=0; a<response.data.length; a++){

      let idTrending = response.data[a].id;// ID DE TRENDING
      let urlTrending = response.data[a].images.original.url;//URL DE TRENDING
      let tituloTrending = response.data[a].title;//TITULO DE TRENDING
      let urlDescarga = response.data[a].images.downsized.url;
      
      guardaFavoritos(a,urlTrending,tituloTrending,idTrending);
      descargaGif(urlDescarga,a,tituloTrending);
      maximizarGif(a, urlTrending, tituloTrending);
      trendCard[a].style.backgroundImage = 'url('+urlTrending+')';
      if(mediaDesktop.matches){
        tituGif[a].textContent =  tituloTrending ;
      }
      if(chequearCorazon(idTrending)){
        iconFav[a].setAttribute('src','./images/icon-fav-active.svg');//LIKE
      }        
    }
  }).catch((error)=>{
    console.log("FALLO FETCH DE TRENDINGS "+error)
  });
}
pedidoTrendings();
// VARIABLES PARA MEDIAQUERYS
let mediaMobile = window.matchMedia("(max-width: 768px)");
let mediaIpad = window.matchMedia("(min-width: 768px) and (max-width : 1024px)");
let mediaDesktop = window.matchMedia("(min-width: 1025px)");

//ELEMENTOS PARA VISUALIZAR GIF AL MAX
let containerX = document.getElementsByClassName('containerX')[0];
let iconMax = document.querySelectorAll('.max');
let modal = document.createElement('div');
let closeMax = document.createElement('a');
let imgClose = document.createElement('img');
let containMax = document.createElement('div');
let gifMax= document.createElement('img');
let infoDiv = document.createElement('div');
let titugifMax = document.createElement('h4');
let iconDiv = document.createElement('div');

function maximizarGif(b,url,titulo){
    if(mediaDesktop.matches){

      iconMax[b].addEventListener('click', () => añadoDomMax(b,url,titulo));

    }else if(mediaMobile.matches || mediaIpad.matches){

      trendCard[b].addEventListener('click', () => añadoDomMax(b,url,titulo));
    }

  closeMax.addEventListener('click',()=>{
    modal.style.display = 'none';
  })
  //CIERRO CON ESCAPE
  document.addEventListener("keydown", function(event) {
    if(event.keyCode === 27){
      modal.style.display = 'none';
    }
  });
}
function añadoDomMax(b,url,titulo){

modal.innerHTML = '';
modal.style.display = 'block';

closeMax.setAttribute('href',"favoritos.html")
imgClose.setAttribute('src', "./images/button-close.svg");
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
iconDiv.appendChild(iconFav[b]);
iconDiv.appendChild(iconDownload[b]);

iconFav[b].addEventListener('click',()=>{
  if(iconFav[b].style.opacity = '0.5'){
    iconFav[b].style.opacity = '1';
  }
})
}
function chequearCorazon(id){
  if(localStorage.hasOwnProperty("favoritoGif"+id) ==true){
    return true;
  }else{
    return false;
  }
}
function guardaFavoritos(a,url,tit,id){

  let fav = iconFav[a];
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

class Favorito{
  constructor(url,titulo,id){
      this.url = url;
      this.titulo = titulo;
      this.id = id;
  }
}
let favoritos = [];
let nuevoFavorito;
function agregarFavorito(param1, param2, param3){

  nuevoFavorito = new Favorito(param1, param2, param3);
  favoritos.push(nuevoFavorito);
  return nuevoFavorito;
}
function quitarFavorito(id){

  var eliminar = id;
  favoritos = favoritos.filter(function(idTrending){
      if(idTrending.id == eliminar){
          return false;
      }else{
          return true;
      }
  });
}

function descargaGif(url,a,titulo){
  iconDownload[a].addEventListener("click", () =>{
    var x=new XMLHttpRequest();
    x.open("GET", url, true);
    x.responseType = 'blob';
    x.onload=function(e){download(x.response, titulo+".gif", "image/gif" ); }
    x.send();
  });
}
function download(data, strFileName, strMimeType) {
  var self = window, // this script is only for browsers anyway...
    defaultMime = "application/octet-stream", // this default mime also triggers iframe downloads
    mimeType = strMimeType || defaultMime,
    payload = data,
    url = !strFileName && !strMimeType && payload,
    anchor = document.createElement("a"),
    toString = function(a){return String(a);},
    myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString),
    fileName = strFileName || "download",
    blob,
    reader;
    myBlob= myBlob.call ? myBlob.bind(self) : Blob ;
  if(String(this)==="true"){ //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
    payload=[payload, mimeType];
    mimeType=payload[0];
    payload=payload[1];
  }
  if(url && url.length< 2048){ // if no filename and no mime, assume a url was passed as the only argument
    fileName = url.split("/").pop().split("?")[0];
    anchor.href = url; // assign href prop to temp anchor
      if(anchor.href.indexOf(url) !== -1){ // if the browser determines that it's a potentially valid url path:
          var ajax=new XMLHttpRequest();
          ajax.open( "GET", url, true);
          ajax.responseType = 'blob';
          ajax.onload= function(e){ 
        download(e.target.response, fileName, defaultMime);
      };
          setTimeout(function(){ ajax.send();}, 0); // allows setting custom ajax headers using the return:
        return ajax;
    } // end if valid url?
  } // end if url?
  //go ahead and download dataURLs right away
  if(/^data\:[\w+\-]+\/[\w+\-]+[,;]/.test(payload)){
    if(payload.length > (1024*1024*1.999) && myBlob !== toString ){
      payload=dataUrlToBlob(payload);
      mimeType=payload.type || defaultMime;
    }else{			
      return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
        navigator.msSaveBlob(dataUrlToBlob(payload), fileName) :
        saver(payload) ; // everyone else can save dataURLs un-processed
    }
  }//end if dataURL passed?
  blob = payload instanceof myBlob ?
    payload :
    new myBlob([payload], {type: mimeType}) ;
  function dataUrlToBlob(strUrl) {
    var parts= strUrl.split(/[:;,]/),
    type= parts[1],
    decoder= parts[2] == "base64" ? atob : decodeURIComponent,
    binData= decoder( parts.pop() ),
    mx= binData.length,
    i= 0,
    uiArr= new Uint8Array(mx);
    for(i;i<mx;++i) uiArr[i]= binData.charCodeAt(i);
    return new myBlob([uiArr], {type: type});
   }
  function saver(url, winMode){
    if ('download' in anchor) { //html5 A[download]
      anchor.href = url;
      anchor.setAttribute("download", fileName);
      anchor.className = "download-js-link";
      anchor.innerHTML = "downloading...";
      anchor.style.display = "none";
      document.body.appendChild(anchor);
      setTimeout(function() {
        anchor.click();
        document.body.removeChild(anchor);
        if(winMode===true){setTimeout(function(){ self.URL.revokeObjectURL(anchor.href);}, 250 );}
      }, 66);
      return true;
    }
    // handle non-a[download] safari as best we can:
    if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
      url=url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
      if(!window.open(url)){ // popup blocked, offer direct download:
        if(confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")){ location.href=url; }
      }
      return true;
    }
    //do iframe dataURL download (old ch+FF):
    var f = document.createElement("iframe");
    document.body.appendChild(f);
    if(!winMode){ // force a mime that will download:
      url="data:"+url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
    }
    f.src=url;
    setTimeout(function(){ document.body.removeChild(f); }, 333);
  }//end saver
  if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
    return navigator.msSaveBlob(blob, fileName);
  }
  if(self.URL){ // simple fast and modern way using Blob and URL:
    saver(self.URL.createObjectURL(blob), true);
  }else{
    // handle non-Blob()+non-URL browsers:
    if(typeof blob === "string" || blob.constructor===toString ){
      try{
        return saver( "data:" +  mimeType   + ";base64,"  +  self.btoa(blob)  );
      }catch(y){
        return saver( "data:" +  mimeType   + "," + encodeURIComponent(blob)  );
      }
    }
    // Blob but not URL support:
    reader=new FileReader();
    reader.onload=function(e){
      saver(this.result);
    };
    reader.readAsDataURL(blob);
  }
  return true;
};


async function getGif(url, value, api_key, number){
  let endpoint = `http://${url}?q=${value}&api_key=${api_key}limit=${number}&lang=es`;
}


/*
Para luego en la página de favoritos podrías hacer un listado simple:

// leemos los favoritos del localStorage
var favoritos = localStorage.getItem("favoritos") || "[]";
favoritos = JSON.parse(favoritos);

// creamos una lista
var ul = document.createElement("ul");
// para cada producto en favoritos
for (var x = 0; x < favoritos.length; x++) {
  // creamos un elemento de lista
  var li = document.createElement("li");
  // con un enlace al producto
  var a = document.createElement("a");
  a.href = favoritos[x].url;
  a.textContent = favoritos[x].nombre;
  li.appendChild(a);
  ul.appendChild(li);
}
// agregamos el producto donde correspona
document.querySelector("#favoritos").appendChild(ul);
*/


