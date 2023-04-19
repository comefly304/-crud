const express=require('express')
require('dotenv').config()
const app=express();
const Connection=require('./config/db.connect');
const UserRouter = require('./routes/user.route');


app.use(express.json())
app.use("/user",UserRouter)





const PORT=8080
app.listen(PORT,()=>{
    Connection()
    console.log(`server is listening in port ${PORT}`)
})