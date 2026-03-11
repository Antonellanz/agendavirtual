const productosCSV = "https://docs.google.com/spreadsheets/d/1Jwfcow9oD_yQTivks8AG4B_F59sP7nbq5T2x34zmZeM/export?format=csv&gid=1592941340"

const cumpleCSV = "https://docs.google.com/spreadsheets/d/16su5GLrJlFFmliSQ-vIXbbTrvrPakA5Tv_JFYeQ9mm4/export?format=csv&gid=0"
const analisisCSV = "https://docs.google.com/spreadsheets/d/1RJHF899WqQIt4VyZNXCNnYsp11k2tgLZ4jDNbVsukI8/export?format=csv&gid=0"
function convertirFecha(fechaTexto){

const partes = fechaTexto.split("/")

const dia = parseInt(partes[0])
const mes = parseInt(partes[1]) - 1
const anio = parseInt(partes[2])

return new Date(anio, mes, dia)

}

async function leerCSV(url){

const res = await fetch(url)
const texto = await res.text()

return texto.split("\n").map(f=>f.split(","))

}



async function cargarProductos(){

const filas = await leerCSV(productosCSV)

const hoy = new Date()

let total = filas.length-1
let vencen = 0
let stockBajo = 0

let proximos = []

filas.slice(1).forEach(f=>{

const producto = f[6]
const vencimiento = convertirFecha(f[2])
const stock = parseInt(f[3])

const dias = (vencimiento-hoy)/(1000*60*60*24)

if(dias<=90 && dias>0){

vencen++

proximos.push({
nombre:producto,
dias:Math.floor(dias)
})

}

if(stock<=10){

stockBajo++

}

})

proximos.sort((a,b)=>a.dias-b.dias)

proximos.slice(0,5).forEach(p=>{

let li=document.createElement("li")

li.innerText="⚠ "+p.nombre+" vence en "+p.dias+" días"

document.getElementById("listaVencimientos").appendChild(li)

})

document.getElementById("totalProductos").innerText=total
document.getElementById("vencen").innerText=vencen
document.getElementById("stockBajo").innerText=stockBajo

}



async function cargarCumple(){

const filas=await leerCSV(cumpleCSV)

const hoy=new Date()

let proximos=0

filas.slice(1).forEach(f=>{

const nombre=f[0]
const fecha = convertirFecha(f[1])

const dias=(fecha-hoy)/(1000*60*60*24)

if(dias<=30 && dias>=0){

proximos++

let li=document.createElement("li")

li.innerText="🎂 Se acerca el cumpleaños de "+nombre

document.getElementById("alertas").appendChild(li)

}

})

document.getElementById("cumples").innerText=proximos

}



async function cargarAnalisis(){

const filas = await leerCSV(analisisCSV)

const panel = document.getElementById("analisisPanel")

filas.slice(1).forEach(f=>{

const mes = f[0]
const producto = f[1]
const pdf = f[2]

let div = document.createElement("div")

div.className = "analisis-card"

div.innerHTML = `
<h4>${mes}</h4>
<p>${producto}</p>
<a href="${pdf}" target="_blank">Ver PDF</a>
`

panel.appendChild(div)

})

}


async function iniciar(){

await cargarProductos()
await cargarCumple()
await cargarAnalisis()

}

iniciar()