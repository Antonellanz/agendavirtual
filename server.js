const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const path = require("path")

const app = express()

const db = new sqlite3.Database("./database.db")

app.use(express.json())
app.use(express.static("public"))

/* CREAR TABLAS */

db.serialize(()=>{

db.run(`
CREATE TABLE IF NOT EXISTS productos(
id INTEGER PRIMARY KEY AUTOINCREMENT,
nombre TEXT,
lote TEXT,
marca TEXT,
vencimiento DATE,
stock INTEGER
)
`)

db.run(`
CREATE TABLE IF NOT EXISTS cumpleanos(
id INTEGER PRIMARY KEY AUTOINCREMENT,
nombre TEXT,
fecha DATE,
puesto TEXT
)
`)

db.run(`
CREATE TABLE IF NOT EXISTS analisis(
id INTEGER PRIMARY KEY AUTOINCREMENT,
producto TEXT,
fecha DATE,
tipo TEXT,
resultado TEXT,
archivo TEXT
)
`)

})


app.get("/", (req,res)=>{
res.sendFile(path.join(__dirname,"views","dashboard.html"))
})

app.get("/productos",(req,res)=>{

console.log("ENTRO A PRODUCTOS")

res.sendFile(path.join(__dirname,"views","productos.html"))

})

app.post("/productos",(req,res)=>{

const {nombre,lote,marca,vencimiento,stock} = req.body

db.run(
`INSERT INTO productos (nombre,lote,marca,vencimiento,stock) VALUES (?,?,?,?,?)`,
[nombre,lote,marca,vencimiento,stock]
)

res.send("ok")

})
app.get("/test",(req,res)=>{
res.send("FUNCIONA")
})
app.get("/cumpleanos",(req,res)=>{
res.sendFile(path.join(__dirname,"views","cumpleanos.html"))
})
app.get("/productos",(req,res)=>{
console.log("ENTRO A PRODUCTOS")
res.sendFile(path.join(__dirname,"views","productos.html"))
})

app.get("/ver-productos",(req,res)=>{
res.sendFile(path.join(__dirname,"views","ver-productos.html"))
})

app.get("/cargar-producto",(req,res)=>{
res.sendFile(path.join(__dirname,"views","cargar-producto.html"))
})

app.get("/analisis",(req,res)=>{
res.sendFile(path.join(__dirname,"views","analisis.html"))
})
app.get("/prueba",(req,res)=>{
console.log("ENTRO A PRUEBA")
res.send("RUTA FUNCIONA")
})
app.get("/test123",(req,res)=>{
res.send("FUNCIONA TEST")
})

app.get("/api/productos",(req,res)=>{

db.all("SELECT * FROM productos",(err,rows)=>{

if(err){
res.status(500).send(err)
return
}

res.json(rows)

})

})
app.get("/ver-productos",(req,res)=>{
console.log("ENTRO A VER PRODUCTOS")
res.send("FUNCIONA VER PRODUCTOS")
})
app.listen(3000, ()=>{
console.log("Servidor corriendo en http://localhost:3000")
})