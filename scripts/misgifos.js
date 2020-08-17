
let arrayCreaciones = [];
//RECARGO INFORMACION EN LOCAL STORAGE Y LA PASO AL arrayCREACIONES.
function recargarCreaciones(){
  let getInfo = localStorage.getItem("misgifos");
  arrayCreaciones = JSON.parse(getInfo);
  console.log(arrayCreaciones);
}
recargarCreaciones();

