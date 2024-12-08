const express=require("express")
const cors=require("cors")
const socketIo=require("socket.io")
const http=require("http")

const app=express()

app.use(cors())
app.use(express.json())

const server=http.createServer(app)
const answer=new Map()

const io=socketIo(server,{
    cors:{
        origin: true
    }
})

io.on("connection",(socket)=>{
    console.log("a new socket connection", socket.id)

    socket.on("ques", (roomNo)=>{
        socket.join(roomNo)
        io.to(roomNo).emit("welcome", {"message":`${socket.id} , joined the room`, "answer":answer.get(roomNo)})
    })

    socket.on("sol", (text, roomNo)=>{
        io.to(roomNo).emit("soln", {"message":text})
        answer.set(roomNo, text)
    })
})

app.get("/",(req,res)=>{
    res.json({"message": "alive"})
})

server.listen(5005, ()=>{
    console.log("server is listening on port 5005")
})