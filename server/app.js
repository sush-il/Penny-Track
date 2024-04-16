import express from 'express'

const app = express();
const port = process.env.PORT || "5000"
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("Hello from the Express Server")
})


app.listen(port, () => {
    `Server Running at port: ${port}`
})