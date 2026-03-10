async function cargarDashboard(){

const res = await fetch("/api/productos")
const productos = await res.json()

document.getElementById("totalProductos").innerText = productos.length

let vencen = 0
let stockBajo = 0

const hoy = new Date()

productos.forEach(p=>{

const venc = new Date(p.vencimiento)

const dias = (venc - hoy)/(1000*60*60*24)

if(dias <= 90){
vencen++
}

if(p.stock <= 10){
stockBajo++
}

})

document.getElementById("productosVencer").innerText = vencen
document.getElementById("stockBajo").innerText = stockBajo

}

cargarDashboard()