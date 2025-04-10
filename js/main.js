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



//Numeración de la primera columna de la tabla

let cont = 0;
let costoTotal =0;
let totalEnProductos= 0;

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
                cuerpoTabla.insertAdjacentHTML("beforeend", row);
contadorProductos.innerText = cont;
costoTotal += precio * Number(txtNumber.value);
precioTotal.innerText="$ " + costoTotal.toFixed(2);
totalEnProductos += Number(txtNumber.value);
productosTotal.innerText = totalEnProductos;





                txtName.value = "";
                txtNumber.value= "";
                txtName.focus();
}//if is valid

});
