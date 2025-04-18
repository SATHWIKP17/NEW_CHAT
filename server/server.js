const express=require('express');
const app=express();
const path=require('path');
const http=require('http');
const {Server}=require('socket.io');
const cors=require('cors');
const server=http.createServer(app);
const io=new Server(server,{cors:{
    origin:['*'],
    methods:['POST','GET']
}});
app.use(cors({
    origin:['*'],
    methods:['POST','GET']
}))
app.use(express.json());
app.use(express.static(path.join(__dirname,"../client/build")));
app.use(express.urlencoded({extended:true}));
io.on("connection", (socket) => {
    console.log("🟢 A user connected");

    socket.on("romsg", (ro) => {
        let room=ro.rom;
        socket.join(room);
    socket.on("msg", (data) => {
        socket.to(room).emit("msgg",data);
    });
    });

    socket.on("disconnect", () => {
        console.log("🔴 A user disconnected");
    });
});
app.post("/",(req,res)=>{
      res.status(200).send("OK");
});
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../client/build","index.html"));
});
const PORT=process.env.PORT|10000
server.listen(PORT,"0.0.0.0",()=>{
    console.log("Success");
});
