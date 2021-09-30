const express = require("express")

const app = express();
app.use(express.json({extended: false}));
app.use(express.static('public'))

app.get("/", (req, res)=>{
    return res.send("Node Assignment")
})

app.use('/api/v1/user', require('./routes/api/v1/user'));
app.use('/api/v1/auth', require('./routes/api/v1/auth'));

const PORT = process.env.port || 4000;
app.listen(PORT,  ()=> console.log(`Server started at port ${PORT}`))