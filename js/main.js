const txtName = document.getElementById("Name");                        //nombre
const txtNumber = document.getElementById("Number")                     //cantidad
const btnAgregar = document.getElementById("btnAgregar")
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto")
const alertValidaciones = document.getElementById("alertValidaciones")
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
const contadorProductos= document.getElementById("contadorProductos");
const productosTotal= document.getElementById("productosTotal");
const precioTotal= document.getElementById("precioTotal");
const btnClear= document.getElementById("btnClear");



//Numeración de la primera columna de la tabla

let cont = 0;
let costoTotal =0;
let totalEnProductos= 0;
let datos = new Array();   //[];   almacena los elementos de la tabla

function validarCantidad(){
    if(txtNumber.value.trim().length<=0){
        return false;
    }//length<=0
    

    if(isNaN(txtNumber.value)){
        return false;
    }//is NaN

if (Number(txtNumber.value)<=0){
    return false;
} //<=0

    return true;

 
}//Validar cantidad


function getPrecio(){
 return Math.round((Math.random()*10000)) / 100;

}//getPrecio
//Bandera al ser true permite agregar los datos a la tabla
let isValid = true;

btnAgregar.addEventListener("click", function (event){
    event.preventDefault();

    txtName.style.border="";
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
txtName.value = txtName.value.trim();
txtNumber.value = txtNumber.value.trim();
txtNumber.style.border="";

if (txtName.value.length <=3 ){

    txtName.style.border="solid 3px red";
    alertValidacionesTexto.innerHTML="<strong>El nombre del producto no es correcto<strong>";
    alertValidaciones.style.display="block";
    isValid = false;

} //Validar texto

if (! validarCantidad()){

    txtNumber.style.border="solid 3px red";
    alertValidacionesTexto.innerHTML +="<br><strong>La cantidad no es correcta<strong>";
    alertValidaciones.style.display="block";
    isValid = false;

} //Validar cantidad

if(isValid){   //si pasó las validaciones
    cont++;
    let precio = getPrecio();
    let row = `<tr>
    <td>${cont}</td>
    <td>${txtName.value}</td>
    <td>${txtNumber.value}</td>
    <td>${precio}</td>
                  
                </tr> `;
let elemento = {
"cont" : cont,
"nombre": txtName.value,
"cantidad": txtNumber.value,
"precio": precio
};
datos.push(elemento);
localStorage.setItem("datos", JSON.stringify(datos));




                cuerpoTabla.insertAdjacentHTML("beforeend", row);
contadorProductos.innerText = cont;
costoTotal += precio * Number(txtNumber.value);
precioTotal.innerText="$ " + costoTotal.toFixed(2);
totalEnProductos += Number(txtNumber.value);
productosTotal.innerText = totalEnProductos;

let resumen = {
    "cont" : cont,
    "totalEnProductos": totalEnProductos,
    "costoTotal": costoTotal
    
    };
    localStorage.setItem("resumen", JSON.stringify(resumen));



                txtName.value = "";
                txtNumber.value= "";
                txtName.focus();
}//if is valid

});//btn Agregar

window.addEventListener("load", function (event){
    event.preventDefault();
    if(this.localStorage.getItem("datos") !=null){
        datos= JSON.parse(this.localStorage.getItem("datos"));
    } //datos !=null

datos.forEach((d) => {
    let row = `<tr>
               <td>${d.cont} </td>
               <td>${d.nombre} </td>
               <td>${d.cantidad} </td>
               <td>${d.precio} </td>
             <tr/> `;
             cuerpoTabla.insertAdjacentHTML("beforeend", row);
});

    if(this.localStorage.getItem("resumen") !=null){
        resumen= JSON.parse(this.localStorage.getItem("resumen"));
costoTotal = resumen.costoTotal;
totalEnProductos = resumen.totalEnProductos;
cont = resumen.cont;
         
            contadorProductos.innerText = cont;
        
            precioTotal.innerText="$ " + costoTotal.toFixed(2);
            
            productosTotal.innerText = totalEnProductos;



         } //resumen != null
    
       
})//window.addEvenlistener load


//Agregar la funcionalidad del boton limpiar todo (resumen,campos,tabla,alerta)


btnClear.addEventListener("click", function (event){
    event.preventDefault();

    txtName.style.border="";
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
txtNumber.style.border="";
totalEnProductos.innerText=""
productosTotal.innerHTML=""
precioTotal.innerHTML=""
cuerpoTabla.innerHTML=""
contadorProductos.innerText="0"
localStorage.removeItem("resumen");
localStorage.removeItem("datos");
window.location.reload();

})