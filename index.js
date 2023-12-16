import express from "express";
import morgan from "morgan";
import cors from "cors";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//incializa
app.get("/", (req, res) => {
  try {
    res.sendFile(`${__dirname}/index.html`);
  } catch (error) {
    res.json({ message: "No disponible" });
  }
});
//insertar
app.post("/canciones", (req, res) => {
  const newCancion = req.body;
  console.log(newCancion);
  const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf-8"));
  canciones.push(newCancion);
  console.log(canciones);
  fs.writeFileSync(
    "repertorio.json",
    JSON.stringify(canciones)
  );

});
//leer
app.get("/canciones", (req, res) => {
  const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf-8"));
  res.json(canciones);
});

//actualizar




//Borrar




app.listen(PORT, () => {
  console.log("Server on 🦾");
});
