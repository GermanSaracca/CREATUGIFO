const APIKEY = "IPDmvhDzm0liJgSooGZzCeivUyTZZ82L";

let video = document.getElementById('video');
let blueGifo = document.getElementById('blueGifo');
let cardGifo = document.getElementById('cardGifo');
let subidaGifo = document.getElementById('subidaGifo');
let statusGifo = document.getElementById('status');
let hrefGifo = document.getElementById('hrefGifo');
let downGifo = document.getElementById('dwnGifo');
let comenzar = document.getElementById('comenzar');
let grabar = document.getElementById('grabar');
let repeat = document.getElementById('repeat');
let titleCreate = document.getElementById('title');
let instructions = document.getElementById('instructions');
let step1 = document.getElementById('step1');
let step2 = document.getElementById('step2');
let step3 = document.getElementById('step3');
let hoursLabel = document.getElementById("hours");
let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let timer = document.getElementById('timer');
let camAnimation = document.getElementById('camAnimation');


class Creacion{
    constructor(url,id){
        this.url = url;
        this.id = id;
    }
}
let nuevosGifs = [];
let nuevoGifCreado;
function agregarGifCreado(url,id){

    nuevoGifCreado = new Creacion(url, id);
    nuevosGifs.push(nuevoGifCreado);
    return nuevoGifCreado;
}

comenzar.addEventListener('click',()=>{
    getStreamAndRecord();
    paso1();
})

function getStreamAndRecord() { 
    //PIDO PERMISOS PARA USAR CAMARA DE USUARIO
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { width: 480, height: 320 }
    })
    .then(function(stream){

        video.style.display = "unset";
        //TOMO STREAM Y SE LO APLICO A LA ETIQUETA VIDEO
        video.srcObject = stream;
        //INICIO EL VIDEO
        video.play();
        paso2();

        grabar.addEventListener('click',()=>{

            if(grabar.textContent == "GRABAR"){

                grabar.textContent = "FINALIZAR";
                //INICIO GRABACION CON LIBRERIA DE RecordRTC
                iniciarGrabacion(stream);
                timerGrabacion();
                timer.style.display = 'unset';
                camAnimation.classList.add('camAnimation');
            }
        })
    })
    .catch((error)=>{
        console.log(error);
    })
}

function iniciarGrabacion(stream){
    
    // CREO OBJETO RECORDER
    let recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function() {
         console.log('started');
       }
    });
    //COMIENZO LA GRABACION(CUANDO CLICKEA EL USUARIO "GRABAR")
    recorder.startRecording();

    //AÑADO UN NUEVO EVENT PARA FINALIZAR LA GRABACION
    grabar.addEventListener('click',()=>{

        if(grabar.textContent == "FINALIZAR"){

            camAnimation.classList.remove('camAnimation');
            //FRENO LA GRABACION
            recorder.stopRecording(function() {

                //GENERO UN FORM DATA PARA DARLE ESTRUCTURA A LA INFO GRABADA Y ENVIARLA A TRAVES DEL BODY DEL POST
                let form = new FormData();

                form.append('file', recorder.getBlob(), 'myGif.gif');
                console.log(form.get('file'));

                video.pause();
                grabar.textContent = "SUBIR GIFO";
                repeat.style.display = "block";
                timer.style.display = 'none';
                
                //AÑADO UN NUEVO EVENT PARA SUBIR EL VIDEO A LA API DE GIPHY 
                grabar.addEventListener('click',()=>{

                    if(grabar.textContent == "SUBIR GIFO"){
                        /* var cors_api_url = 'https://cors-anywhere.herokuapp.com/';*/


                        blueGifo.style.display = 'unset';
                        grabar.style.display = 'none';

                        // FETCH  DE LA GRABACION CON METODO POST A GIPHY
                        // PARA QUE ME RETORNE UN ID DEL GIF LISTO
                        fetch("https://upload.giphy.com/v1/gifs?api_key=IPDmvhDzm0liJgSooGZzCeivUyTZZ82L",{
                            method: "POST",
                            body: form
                        })
                        .then(response => {

                            let data = response.json();
                            return data;
                        })
                        .then(resp =>{

                            let id_gifo = resp.data.id //GUARDO EL ID
                            console.log(id_gifo);

                            //NUEVO FETCH A GIF BUSCANDO EL GIF CON EL ID RECIBIDO
                            fetch(`https://api.giphy.com/v1/gifs/${id_gifo}?api_key=IPDmvhDzm0liJgSooGZzCeivUyTZZ82L`)
                            .then(res =>{

                                let infoGify = res.json();
                                return infoGify;
                            })
                            .then(res2 =>{

                                console.log(res2.data);

                                let urlGifo = res2.data.images.original.url;//URL DE GIF CREADO
                                let idGifo = res2.data.id;//ID DE GIF CREADO

                                let newi = agregarGifCreado(urlGifo, idGifo);
                                //GUARDO GIF EN LOCAL STORAGE PARA LUEGO MOSTRARLE EN SECCION "MIS GIFOS"
                                guardarCreacionLocalStorage(newi);
                                
                                paso3(urlGifo, idGifo);

                            })
                            .catch((err)=>{
                                console.log("error de vuelta de gif listo"+err);
                            })
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                    }
                })
            });   
        }
    })
}

function guardarCreacionLocalStorage(data){
    var a = [];
    // PARSEO SI ES Q HAY ALGO EN EL LOCAL Y LO INSERTO EN EL ARRAY "a"
    a = JSON.parse(localStorage.getItem('misgifos')) || [];
    // pusheo la nueva data(parametro)
    a.push(data);
    // Reescribo el local storage con el nuevo array ya modificado.
    localStorage.setItem('misgifos', JSON.stringify(a));
}

function paso1(){
    titleCreate.innerHTML = '¿Nos das acceso<br> a tu cámara?';
    instructions.innerHTML = 'El acceso a tu camara será válido sólo<br> por el tiempo en el que estés creando el GIFO.';
    step1.style.color = 'white';
    step1.style.backgroundColor = '#572EE5';
    comenzar.style.display= "none";
}
function paso2(){
    grabar.style.display = "block";
    grabar.textContent = "GRABAR";
    titleCreate.innerHTML = '';
    instructions.innerHTML = '';
    step1.style.color = '#572EE5';
    step1.style.backgroundColor = 'white';
    step2.style.color = 'white';
    step2.style.backgroundColor = '#572EE5';
}
function paso3(urlGifo, idGifo){
    step1.style.color = '#572EE5';
    step1.style.backgroundColor = 'white';
    step2.style.color = '#572EE5';
    step2.style.backgroundColor = 'white';
    step3.style.color = 'white';
    step3.style.backgroundColor = '#572EE5';
    cardGifo.style.opacity = '1';
    statusGifo.setAttribute('src', "./images/check.svg");
    subidaGifo.textContent = 'GIFO subido con éxito';
    //FUNCIONALIDAD DE LINKEO PARA VER GIFO EN PAGINA DE GIPHY
    hrefGifo.setAttribute('href', urlGifo);
    //FUNCIONALIDAD DE DESCARGA
    downGifo.addEventListener("click", () =>{
        var x=new XMLHttpRequest();
        x.open("GET", urlGifo, true);
        x.responseType = 'blob';
        x.onload=function(e){download(x.response, idGifo+".gif", "image/gif" ); }
        x.send();
    });
}

//TIMER DE GRABACION
function timerGrabacion(){

    let totalSeconds = 0;
    setInterval(setTime, 1000);

    function setTime(){
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds%60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
        hoursLabel.innerHTML = pad(parseInt((totalSeconds/60)/60));
    }
    function pad(val){
        var valString = val + "";
        if(valString.length < 2){
            return "0" + valString;
        }
        else{
            return valString;
        }
    }

}
//REINICIAR SECCION
repeat.addEventListener('click',()=>{
    location.reload();
})



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
/*
var track = stream.getTracks()[0];  
track.stop();*/