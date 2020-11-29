const express = require("express");
const cors = require("cors");
require('dotenv').config();
const routes = require ('./routes');

const port = process.env.PORT || 4001;
const app = express();


// Middleware
app.set('view engine', 'ejs');

const corsOptions = {
    origin: "http://localhost:3000" //This Whitelist this site
};

app.use(express.json()); // 
app.use(cors(corsOptions));
app.use("/questions", routes.questions);
app.use("/replies", routes.replies);
app.use("/categories", routes.categories);
app.use("/auth", routes.auth);
app.get("/",(req,res)=>{
    res.send("home")
});


app.listen(port,()=>{console.log(`Server now running on port ${port}`)})