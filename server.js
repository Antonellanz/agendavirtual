const express = require("express")
const path = require("path")
const multer = require("multer")
const fs = require("fs")

const app = express()

app.use(express.static("public"))

/* permitir ver PDFs */
app.use("/uploads", express.static("uploads"))

/* dashboard */

app.get("/", (req,res)=>{
res.sendFile(path.join(__dirname,"views","dashboard.html"))
})

/* pagina para subir analisis */

app.get("/analisis",(req,res)=>{
res.sendFile(path.join(__dirname,"views","analisis.html"))
})


/* configuracion subida PDF */

const storage = multer.diskStorage({
destination:(req,file,cb)=>{

const mes = req.body.mes

const ruta = "uploads/" + mes

if(!fs.existsSync(ruta)){
fs.mkdirSync(ruta,{recursive:true})
}

cb(null,ruta)

},

filename:(req,file,cb)=>{

cb(null,Date.now()+"_"+file.originalname)

}

})

const upload = multer({storage})


/* subir PDF */

app.post("/subir-analisis", upload.single("pdf"), (req,res)=>{

res.send("PDF guardado correctamente")

})
app.use("/uploads",express.static("uploads"))


/* servidor */

app.listen(3000,()=>{
console.log("Servidor en http://localhost:3000")
})
