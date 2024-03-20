const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors"); // cors modülünü import edin
const dataBase = require("./config/database.js");
const authRouter = require("./routes/auth.js");

dotenv.config();
const app = express();

app.use(cors()); // CORS middleware'ini uygulamaya ekle
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

const PORT = 5000;

dataBase();

app.use("/", authRouter);
app.get('/register',(req,res)=>{
    res.status(200).json(({message:"rota belirlendi"}))
})
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
