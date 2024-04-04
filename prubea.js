//Creamos la fecha de hoy
var fecha = new Date();
let fechaInicio = ''
if ((fecha.getMonth() + 1) > 9 && (fecha.getDate()) > 9) {
    fechaInicio = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
}
if((fecha.getMonth() + 1) < 9 && (fecha.getDate()) > 9){
    fechaInicio = fecha.getFullYear() + "-" + "0" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
}
if ((fecha.getMonth() + 1) > 9 && (fecha.getDate()) < 9) {
    fechaInicio = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-0" + fecha.getDate();
}
if((fecha.getMonth() + 1) < 9 && (fecha.getDate()) < 9){
    fechaInicio = fecha.getFullYear() + "-" + "0" + (fecha.getMonth() + 1) + "-0" + fecha.getDate();
}
var fechaNueva = new Date(fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate());
//dias a sumar
var dias = 14;
//nueva fecha 
fechaNueva.setDate(fechaNueva.getDate() + dias);

let fechaFin = ''
if ((fechaNueva.getMonth() + 1) > 9 && (fechaNueva.getDate()) > 9) {
    fechaFin = fechaNueva.getFullYear() + "-" + (fechaNueva.getMonth() + 1) + "-" + fechaNueva.getDate();
}
if((fechaNueva.getMonth() + 1) < 9 && (fechaNueva.getDate()) > 9){
    fechaFin = fechaNueva.getFullYear() + "-" + "0" + (fechaNueva.getMonth() + 1) + "-" + fechaNueva.getDate();
}
if ((fechaNueva.getMonth() + 1) > 9 && (fechaNueva.getDate()) < 9) {
    fechaFin = fechaNueva.getFullYear() + "-" + (fechaNueva.getMonth() + 1) + "-0" + fechaNueva.getDate();
}
if((fechaNueva.getMonth() + 1) < 9 && (fechaNueva.getDate()) < 9){
    fechaFin = fechaNueva.getFullYear() + "-" + "0" + (fechaNueva.getMonth() + 1) + "-0" + fechaNueva.getDate();
}

const arr = ['2024-04-03', '2024-04-19', '2024-04-01', '2024-04-07']

for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= fechaInicio && arr[i] <= fechaFin) {
        console.log(arr[i])
    }
}