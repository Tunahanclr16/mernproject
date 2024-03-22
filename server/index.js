const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors"); // cors modülünü import edin
const {register} = require("./routes/register.js");
const { login } = require("./routes/login.js");
const profileRouter = require("./routes/profile.js");

dotenv.config();
const app = express();

app.use(cors()); // CORS middleware'ini uygulamaya ekle
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

const PORT = 5000;


app.get("/",  async (req, res) => {
res.send('/')    
});
app.post('/register',register);
app.post('/login',login);
app.get('/',profileRouter);
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
