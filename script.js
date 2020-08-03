
const APIKEY = "IPDmvhDzm0liJgSooGZzCeivUyTZZ82L";


//  CAMBIO DE ICONO - MENU HAMBURGUESA-----------------------------------
const nav = document.querySelector('.nav-links');
const icon = document.getElementById("check");
const img = document.getElementById('burgerIcon');

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

//  BUSQUEDA DE GIFS ----------------------------------------
const lupa = document.getElementById('search');
const lupanueva = document.getElementById("lupa_onclick");
const sugerencia = document.getElementById('suger');
const input_gif = document.getElementById('txt');
const trendings = document.getElementsByClassName('trendings');
const cutLine = document.getElementsByClassName('cutLine');
const grillaGifs = document.getElementById('grillaGifs'); 
const cutLinex = document.getElementById('cutLinex');



input_gif.addEventListener("keyup",()=>{

  //AGREGO O QUITO LA CLASE SEGUN EL VALOR DE INPUT
  if(input_gif.value !== '' && modoNoche.checked !== true){

    sugerencia.classList.add('displayBlocker');
    lupanueva.classList.add('displayBlocker');
    cutLinex.style.display = 'unset';
    cutLine[0].classList.add('displayBlocker');
    trendings[0].classList.add('displayNoner');
    lupa.setAttribute('src',"./images/close.svg");

  }else if(input_gif.value == '' && modoNoche.checked !== true) {

    sugerencia.classList.remove('displayBlocker');
    lupanueva.classList.remove('displayBlocker');
    cutLinex.style.display = 'none';
    cutLine[0].classList.remove('displayBlocker');
    trendings[0].classList.remove('displayNoner');
    grillaGifs.classList.remove('displayBlocker');
    lupa.setAttribute('src',"./images/icon-search.svg");
    

  }else if(input_gif.value !== '' && modoNoche.checked == true){
    sugerencia.classList.add('displayBlocker');
    lupanueva.classList.add('displayBlocker');
    lupanueva.setAttribute('src','./images/icon-search-mod-noc.svg');
    cutLinex.style.display = 'unset';
    cutLine[0].classList.add('displayBlocker');
    trendings[0].classList.add('displayNoner');
    lupa.setAttribute('src',"./images/button-close-noc.svg");

  }else if(input_gif.value == '' && modoNoche.checked == true){
    sugerencia.classList.remove('displayBlocker');
    lupanueva.classList.remove('displayBlocker');
    cutLinex.style.display = 'none';
    cutLine[0].classList.remove('displayBlocker');
    trendings[0].classList.remove('displayNoner');
    grillaGifs.classList.remove('displayBlocker');
    lupa.setAttribute('src',"./images/icon-search-mod-noc.svg");
  }
  
  //INICIA BUSQUEDA CON EL ENTER
  if(event.wich == 13 || event.keyCode == 13 && input_gif.value !== ""){
    grillaGifs.classList.toggle('displayBlocker');
  }

  // ACCION DE CERRAR SUGERENCIAS Y RESETEAR CON LA CRUZ.
  lupa.addEventListener("click",()=>{
    if(modoNoche.checked !== true){

      sugerencia.classList.remove('displayBlocker');
      lupanueva.classList.remove('displayBlocker');
      cutLinex.style.display = 'none';
      cutLine[0].classList.remove('displayBlocker');
      trendings[0].classList.remove('displayNoner');
      lupa.setAttribute('src',"./images/icon-search.svg");
      input_gif.value = '';
      grillaGifs.classList.remove('displayBlocker');
    }else{
      sugerencia.classList.remove('displayBlocker');
      lupanueva.classList.remove('displayBlocker');
      lupanueva.setAttribute('src','./images/icon-search-mod-noc.svg');
      cutLinex.style.display = 'none';
      cutLine[0].classList.remove('displayBlocker');
      trendings[0].classList.remove('displayNoner');
      lupa.setAttribute('src',"./images/icon-search-mod-noc.svg");
      input_gif.value = '';
      grillaGifs.classList.remove('displayBlocker')

    }

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

//MOUSE OVER BOTON DE CREAR GIFOS--------------------------->>>
const makeGif = document.getElementById('makegif');
const divgifCreatorBtn = document.getElementById('gif_creator');

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
const theme = document.querySelector("#light-theme");
//ELEMENTOS DEL NAV BAR
const crearGif = document.getElementById('gifCreatorBtn');
const modoNoche = document.getElementById('modoNoche');
const logoNav = document.getElementById('logoNav');
const btnMenu = document.querySelectorAll('.menubtn');
const navlink = document.getElementsByClassName('nav-links');
const burger = document.getElementById('burgerIcon');

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
//----------------------------------------------------------XXX



//----GIFCARDS-------------------------------------------------
const trendCard = document.querySelectorAll('#trendCard');
const gifIcons = document.getElementById('cardIcons');
const tituGif = document.querySelectorAll('#tituloTrend');
const iconFav = document.querySelectorAll('#fav');
const favCheck = document.querySelectorAll('#checkfav');

//REQUEST DE 5 TRENDINGS PARA SECCION TRENDINGS
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
      let urlTrending = response.data[a].images.fixed_height.url;//URL DE TRENDING
      let tituloTrending = response.data[a].title;//TITULO DE TRENDING

      sessionStorage.setItem('trend'+idTrending,JSON.stringify([urlTrending,tituloTrending,idTrending]));//
      guardaFavoritos(a,urlTrending,tituloTrending,idTrending);

      
        for(b=0; b<trendCard.length; b++){//RECORRO TODAS LAS TRENDCARD Y APLICO URL,TITULO

          trendCard[a].style.backgroundImage = 'url('+urlTrending+')';
          tituGif[a].textContent =  tituloTrending ;
          
         if(chequearCorazon(idTrending)){
          iconFav[a].setAttribute('src','./images/icon-fav-active.svg');//LIKE
         } 
        }  
      }
 
  }).catch((error)=>{
    console.log("FALLO FETCH DE TRENDINGS "+error)
  });
}
pedidoTrendings();


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
    
    if(fav.getAttribute('src') == './images/icon-fav-hover.svg'){

      fav.setAttribute('src','./images/icon-fav-active.svg');//LIKE
      
      //AL HABER CLICKEADO EL CORAZON, LO GUARDO EN LOCAL STORAGE
      let news = agregarFavorito(url,tit,id);//LO AGREGO AL ARRAY FAVORITOS
      let newFav = JSON.stringify(news);//STRINGIFICO EL OBJETO
      localStorage.setItem("favoritoGif"+id, newFav );//LO GUARDO EN LA LOCAL
      
    }else{
      fav.setAttribute('src','./images/icon-fav-hover.svg');//DISLIKE
      
      quitarFavorito(id);//LO ELIMINO DEL ARRAY FAVORITOS
      localStorage.removeItem("favoritoGif"+id);//LO ELIMINO DE LA LOCAL STORAGE
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
  return [param1,param2,param3] ;
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





