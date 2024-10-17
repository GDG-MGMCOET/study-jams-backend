require("dotenv").config();

const express = require("express");
const app = express();

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost'

app.get('/',(req,res)=>{
return res.send({
    message : "Welcome to study-jams backend"
})
})
app.listen(port, () => {
    console.log(`Server is listening at http://${host}:${port}`);
    
});
